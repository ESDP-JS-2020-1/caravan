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

const createRandomCoordinates = () => {
    return Math.floor(Math.random() * 20) + 50
}

const connections = {};

router.ws('/', (ws) => {
    const id = nanoid();

    ws.on('message', async msg => {
        msg = JSON.parse(msg) || msg;


        setInterval(() => {
            const data = {
                "lat": createRandomCoordinates(),
                "lng": createRandomCoordinates()
            };
            Object.keys(connections).forEach(conn => {
                connections[conn].send(JSON.stringify({type: 'ADD_COORDINATES', data}));
            });
        }, 2000)

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