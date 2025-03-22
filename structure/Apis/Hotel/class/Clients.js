const request = require('../../../../functions/apiRequest.js');

class Clients {
    constructor(bot, hotel) {
        this.base = `${hotel.base}/clients`;
        this.bot = bot;
        this.hotel = hotel;
        this.cache = [];
    }

    async _getPage(page=1) {
            return await request(`${this.base}?page=${page}&search=%20`, 'GET', {
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

    async get(id) {
        return await request(`${this.base}/${id}`, 'GET', {
            'Authorization': `Token ${process.env.HOTEL_APIKEY}`,
        });
    }

    async create(data) {
        /**
         * @param {Object} data
         * @param {String} data.name
         * @param {String} data.phone_number
         * @param {String} data.room_number
         * 
         */
        if (!data.name) throw new Error('name is required');
        if (!data.phone_number) throw new Error('phone_number is required');
        if (!data.room_number) throw new Error('room_number is required');
        if (!data.special_requests) data.special_requests = "Rien";

        return await request(`${this.base}`, 'POST', {
            'Authorization': `Token ${process.env.HOTEL_APIKEY}`,
        }, JSON.stringify(data));
    }

    async update(id, data) {
        return await request(`${this.base}/${id}`, 'PUT', {
            'Authorization': `Token ${process.env.HOTEL_APIKEY}`,
        }, JSON.stringify(data));
    }

    async delete(id) {
        return await request(`${this.base}/${id}`, 'DELETE', {
            'Authorization': `Token ${process.env.HOTEL_APIKEY}`,
        });
    }
}

module.exports = Clients;