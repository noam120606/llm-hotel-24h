const request = require('../../../../functions/apiRequest.js');

class Spas {
    constructor(bot, hotel) {
        this.base = `${hotel.base}/spas`;
        this.bot = bot;
        this.hotel = hotel;
        this.cache = [];
    }

    async getList() {
        return await request(`${this.base}`, 'GET', {
            'Authorization': `Token ${process.env.HOTEL_APIKEY}`,
        });
    }

}

module.exports = Spas;