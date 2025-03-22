const request = require('../../../../functions/apiRequest.js');

class Restaurant {
    constructor(bot, hotel) {
        this.base = `${hotel.base}/restaurants`;
        this.bot = bot;
        this.hotel = hotel;
        this.cache = [];
    }

    async _getPage(page=1) {
        return await request(`${this.base}?page=${page}`, 'GET', {
            'Authorization': `Token ${process.env.HOTEL_APIKEY}`,
        });
    }

    async getList() {
        this.cache = await this._getPage(1);
        let page = 2;
        while (this.cache.next) {
            const res = await this._getPage(page);
            if (res.next) page++;
            else this.cache.next = false;
            this.cache.results = this.cache.results.concat(res.results);
        }
        return this.cache.results;
    }

}

module.exports = Restaurant;