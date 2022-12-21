require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const socketIo = require('socket.io');

// export one function that gets called once as the server is being initialized

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('DB is OK'))
    .catch(() => console.log('DB failed'));

module.exports = function (app, server) {

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Methods', '*');
        next();
    });

    app.use(express.json());

    const io = require('socket.io')(server, {
        cors: {
            origin: "http://127.0.0.1:5500",
            methods: ["GET", "POST"]
        }
    })

    require('./socket/chat')(io);

    app.use(function (req, res, next) {
        req.io = io;
        next();
    });

    app.get('/test', (req, res, next) => {
        res.status(200).json({
            hello: 'world'
        })
    })

    app.post('/chatRoom', (req, res, next) => {
        const chatRoom = new schatRoom({
            ...req.body
        });
        chatRoom.save().then(() => {
            res.status(201).json({
                message: 'Message send'
            })
        }).catch((error) => {
            res.status(400).json({
                error
            })
        })
    });
}