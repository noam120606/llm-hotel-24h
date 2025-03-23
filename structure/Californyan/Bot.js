const Webmanager = require('../Webserver/Webmanager.js');
const logger = require('../Utils/Logger.js');
const weather = require('../Apis/Weather/index.js');
const actus = require('../Apis/Actus/index.js');

const HotelApi = require('../Apis/Hotel/index.js');

class Bot {
    constructor() {
        this.web = new Webmanager(this);
        this.log = logger;
        this.api = {
            hotel: new HotelApi(this),
            weather: weather,
            actus: actus,
        }
    }
    async start() {
        this.web.start();
    }
}

module.exports = Bot;