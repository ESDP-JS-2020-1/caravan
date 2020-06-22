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

router.ws('/', (ws) => {
    const id = nanoid();

    ws.on('message', async msg => {
        msg = JSON.parse(msg) || msg;

        if (msg.type === 'COURIER_LOCATION') {
            Object.keys(connections).forEach(conn => {
                const data = msg;
                connections[conn].send(JSON.stringify({type: 'ADD_COORDINATES', data}));
            });
        }

        if (msg.type === 'CONNECT_USER') {
            connections[id] = ws;
            connections[id].data = msg.user;

            sendToAllUsers(connections)
        }
    });

    ws.on('close', () => {
        delete connections[id];
        sendToAllUsers(connections)
    })
});

module.exports = router;