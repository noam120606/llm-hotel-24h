const axios = require('axios');

module.exports = async (url, method, headers={}, body={}) => {

    if (method == "POST" && !url.endsWith("/")) url += "/";
    if (method == "PATCH" && !url.endsWith("/")) url += "/";
    if (method == "PUT" && !url.endsWith("/")) url += "/";

    console.log(`------------------`);
    console.log(`[API REQUEST]: ${method} ${url}`);
    console.log(`[API HEADERS]: ${JSON.stringify(headers)}`);
    console.log(`[API BODY]: ${JSON.stringify(body)}`);
    console.log(`------------------`);
    

    switch (method) {
        case 'GET':
            return (await axios.get(url, { headers }).catch(e => console.error(e))).data;
        case 'POST':
            return (await axios.post(url, body, { headers }).catch(e => console.error(e))).data;
        case 'PATCH':
            return (await axios.patch(url, body, { headers }).catch(e => console.error(e))).data;
        case 'PUT':
            return (await axios.put(url, body, { headers }).catch(e => console.error(e))).data;
        case 'DELETE':
            return (await axios.delete(url, { headers }).catch(e => console.error(e))).data;
        default:
            throw new Error('Method not allowed');
    }
}