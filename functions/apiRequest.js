const axios = require('axios');

module.exports = async (url, method, headers={}, body={}) => {
    switch (method) {
        case 'GET':
            return (await axios.get(url, { headers })).data;
        case 'POST':
            return (await axios.post(url, body, { headers })).data;
        case 'PUT':
            return (await axios.put(url, body, { headers })).data;
        case 'DELETE':
            return (await axios.delete(url, { headers })).data;
        default:
            throw new Error('Method not allowed');
    }
}