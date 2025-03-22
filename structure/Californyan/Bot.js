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

       /*
            console.log(await this.api.hotel.clients.create({
                "name": "John Doe",
                "phone_number": "+1 (555) 123-4567",
                "room_number": "205",
                "special_requests": "None"
            }));
            
            */
        console.log(await this.api.hotel.reservations.create({
                "client": 1,
                "restaurant": 1,
                "date": "2024-12-25",
                "meal": 1,
                "number_of_guests": 4,
                "special_requests": "Table près de la fenêtre"
        }));
        console.log(await this.api.hotel.reservations.getList());
    }
}

module.exports = Bot;