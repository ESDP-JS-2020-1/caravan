const express = require('express');
const expressWs = require('express-ws');
const {nanoid} = require('nanoid');

const router = express.Router();

expressWs(router);

const sendToAllUsers = connections => {
    Object.keys(connections).forEach(conn => {

        const data = Object.keys(connections).reduce((a, c) => {
            if (connections[c].data.role === 'courier')
                a.push(connections[c].data)
            return a;
        }, [])
        connections[conn].send(JSON.stringify({type: 'USERS_ONLINE', data}));
    });
}

const connections = {};
const couriers = {}

router.ws('/', (ws) => {
    const id = nanoid();

    ws.on('message', async msg => {
        msg = JSON.parse(msg) || msg;

        if (msg.type === 'COURIER_LOCATION') {
            // console.log('before',connections[id].data);
            couriers[id] = ws;
            couriers[id].data = {location: msg.location, user: msg.courier};
            // console.log('after',connections[id].data, couriers[id].data);
            Object.keys(connections).forEach(conn => {
                const data = Object.keys(couriers).map(courier => couriers[courier].data)
                console.log(data);
                connections[conn].send(JSON.stringify({type: 'ADD_COORDINATES', data}));
            });
        }

        if (msg.type === 'CONNECT_USER') {
            connections[id] = ws;
            connections[id].data = msg.user;
            // console.log(couriers[id]);

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