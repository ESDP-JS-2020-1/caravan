const express = require('express');
const expressWs = require('express-ws');
const {nanoid} = require('nanoid');

const permissions = require('../permissions')

const router = express.Router();

expressWs(router);

const sendToAllUsers = connections => {
    Object.keys(connections).forEach(conn => {

        const data = Object.keys(connections).reduce((a, c) => {
            if (connections[c].data.user.role === 'courier')
                a.push(connections[c].data.user)
            return a;
        }, [])
        connections[conn].send(JSON.stringify({type: 'USERS_ONLINE', data}));
    });
}

const sendToCurrentUser = (data, id, type) => {
    connections[id].send(JSON.stringify({type: type, data}));
}

const connections = {};
const couriers = {}

router.ws('/', (ws) => {
    const id = nanoid();

    ws.on('message', async (msg) => {
        msg = JSON.parse(msg) || msg;

        if (msg.type === 'COURIER_LOCATION') {

            couriers[id] = ws;
            couriers[id].data = {location: msg.location, user: msg.courier};

            sendToCurrentUser(msg, id, 'ADD_COORDINATES')

            Object.keys(connections).forEach(conn => {
                if (Object.keys(msg.courier.currentRequest).length > 0 && msg.courier.currentRequest.user._id.toString() === connections[conn].data.user._id.toString() && connections[conn].data.user.role === 'market') {
                    sendToCurrentUser([{location: msg.location, user: msg.courier}], conn, 'ADD_COORDINATES')
                } else if (connections[conn].data.user.role !== 'courier') {
                    const data = Object.keys(couriers).map(courier => couriers[courier].data)
                    connections[conn].send(JSON.stringify({type: 'ADD_COORDINATES', data}));
                }

            });
        }

        if (msg.type === 'CONNECT_USER') {
            connections[id] = ws;
            connections[id].data = {}
            connections[id].data.user = msg.user;

            const user = connections[id].data.user;

            if (!user.permissions.includes(permissions.VIEW_COURIER_LOCATION)) {
                delete connections[id];
            } else {
                sendToAllUsers(connections)
            }
        }
    });

    ws.on('close', () => {
        delete connections[id];
        if (!!couriers[id]) delete couriers[id]

        sendToAllUsers(connections)
        if(connections[0]) {
            Object.keys(connections).forEach(conn => {
                connections[conn].send(JSON.stringify({type: 'ADD_COORDINATES', couriers}));
            });
        }

    })
});

module.exports = router;