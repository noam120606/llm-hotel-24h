require('dotenv').config();

const Bot = require('./structure/Californyan/Bot.js');
const bot = new Bot();
bot.start();

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});