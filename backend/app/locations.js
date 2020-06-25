const express = require('express');
const expressWs = require('express-ws');
const {nanoid} = require('nanoid');

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

const connections = {};
const couriers = {}

router.ws('/', (ws) => {
    const id = nanoid();

    ws.on('message', async (msg) => {
        msg = JSON.parse(msg) || msg;

        if (msg.type === 'COURIER_LOCATION') {


            couriers[id] = ws;
            couriers[id].data = {location: msg.location, user: msg.courier};

            const data = msg;
            connections[id].send(JSON.stringify({type: 'ADD_COORDINATES', data}));

            Object.keys(connections).forEach(conn => {
                if (connections[conn].data.user.role !== 'courier') {
                    const data = Object.keys(couriers).map(courier => couriers[courier].data)
                    connections[conn].send(JSON.stringify({type: 'ADD_COORDINATES', data}));
                }
            });

        }

        if (msg.type === 'CONNECT_USER') {
            connections[id] = ws;
            connections[id].data = {}
            connections[id].data.user = msg.user;

            sendToAllUsers(connections)
        }
    });

    ws.on('close', () => {
        delete connections[id];
        if (!!couriers[id]) delete couriers[id]
        sendToAllUsers(connections)
    })
});

module.exports = router;