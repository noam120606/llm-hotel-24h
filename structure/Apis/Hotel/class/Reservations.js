const request = require('../../../../functions/apiRequest.js');

class Reservations {
    constructor(bot, hotel) {
        this.base = `${hotel.base}/reservations`;
        this.bot = bot;
        this.hotel = hotel;
        this.cache = [];
    }

    async _getPage(client, page=1) {
            return await request(`${this.base}?page=${page}`, 'GET', {
                'Authorization': `Token ${process.env.HOTEL_APIKEY}`,
            });
        }
    
    async getList(client=undefined) {
        this.cache = await this._getPage(client, 1);
        let page = 2;
        while (this.cache.next) {
            const res = await this._getPage(client, page);
            if (res.next) page++;
            else this.cache.next = false;
            this.cache.results = this.cache.results.concat(res.results);
        }
        return this.cache.results;
    }

    async get(id) {
        return await request(`${this.base}/${id}`, 'GET', {
            'Authorization': `Token ${process.env.HOTEL_APIKEY}`,
        });
    }

    async create(data) {
        /**
         * @param {Object} data
         * @param {Number} data.client
         * @param {Number} data.restaurant
         * @param {String} data.date
         * @param {Number} data.meal
         * @param {Number} data.number_of_guests
         * @param {String} data.special_requests
         */
        if (!data.client) throw new Error('client is required');
        if (!data.restaurant) throw new Error('restaurant is required');
        if (!data.date) throw new Error('date is required');
        if (!data.meal) throw new Error('meal is required');
        if (!data.number_of_guests) throw new Error('number_of_guests is required');
        if (!data.special_requests) data.special_requests = "Rien";

        return await request(`${this.base}`, 'POST', {
            'Authorization': `Token ${process.env.HOTEL_APIKEY}`,
        }, JSON.stringify(data));
    }

    async update(id, data) {
        return await request(`${this.base}/${id}`, 'PATCH', {
            'Authorization': `Token ${process.env.HOTEL_APIKEY}`,
        }, JSON.stringify(data));
    }

    async delete(id) {
        return await request(`${this.base}/${id}`, 'DELETE', {
            'Authorization': `Token ${process.env.HOTEL_APIKEY}`,
        });
    }
}

module.exports = Reservations;
