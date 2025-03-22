const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

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
    }

    loadRoutes() {
        this.app.get('/', (req, res) => {
            res.render('index', { bot: this.bot });
        });
    }

    loadSockets() {
        this.io.on('connection', (socket) => {
            this.bot.log(`Socket connected: ${socket.id}`, 'debug');

            socket.on('msg_user', (data) => {
                console.log(data.content);
                socket.emit('msg_ia', {
                    content: data.content.toUpperCase(),
                });
            });

        });
    }
}

module.exports = Webmanager;