const Meals = require('./class/Meals.js');
const Restaurant = require('./class/Restaurant.js');
const Spas = require('./class/Spas.js');
const Clients = require('./class/Clients.js');
const Reservations = require('./class/Reservations.js');
const Infos = require('./class/Infos.js');

class HotelApi {
    constructor(bot) {
        this.base = 'http://194.15.36.132:20003/api';
        this.bot = bot;

        this.meals = new Meals(bot, this);
        this.restaurants = new Restaurant(bot, this);
        this.spas = new Spas(bot, this);
        this.clients = new Clients(bot, this);
        this.reservations = new Reservations(bot, this);
        this.infos = new Infos(bot, this);
    }
}

module.exports = HotelApi;