const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const session = require("express-session");
const LLM = require('../Apis/Mistral/index.js');
const tts = require("./tts");

class Webmanager {
    constructor(bot) {
        this.bot = bot;
        this.app = express();
        this.server = createServer(this.app);
        this.io = new Server(this.server);
        this.port = process.env.WEB_PORT ?? 3000;
    }

    start() {
        this.server.listen(this.port, () => this.bot.log(`Webserver started on port ${this.port}`, 'ready'));
        this.loadMiddleware();
        this.loadRoutes();
        this.loadSockets();
    }
    loadMiddleware() {
        this.app.use(express.static('public'));
        this.app.set('view engine', 'ejs');
        this.app.set('views', 'views');
        const sessionMiddleware = session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false
        });
        this.app.use(sessionMiddleware);
        this.io.engine.use(sessionMiddleware);
    }

    loadRoutes() {
        this.app.get('/', (req, res) => {
            res.render('index', { bot: this.bot });
        });
    }

    loadSockets() { 
        
        this.io.on('connection', (socket) => {
            this.bot.log(`Socket connected: ${socket.id}`, 'debug');

            const ia = new LLM(this.bot, socket);
    
            socket.on('msg_user', async (data) => {
                const response = await ia.getResponse(data.content);
                socket.emit('msg_ia', {
                    content: response,
                });
            });
    
            socket.on('audio_request', data => tts(socket, data) );
        });
    }
    
}

module.exports = Webmanager;