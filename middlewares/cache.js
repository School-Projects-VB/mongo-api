const {createClient} = require('redis');
const PREFIX = 'articles';
const keys = [];

const TIMEOUT = 60 * 30;

const cache = async (request, response, next) => {
    const client = createClient();
    client.on('error', (err) => console.log(err));
    await client.connect();

    // article:/article
    const key = `${PREFIX}:${request.url}`;

    // Retrieve Redis database elements
    if (keys.includes(key)) {
        // Get article (string) to redis
        const json = await client.get(key);
        // Transform string to JSON
        const value = JSON.parse(json);
        await response.json(value);
    } else {
        // Save json() method
        const originalJson = response.json.bind(response);
        response.json = async (data) => {
            const jsonData = JSON.stringify(data);
            await client.set(key, jsonData);
            await client.expire(key, TIMEOUT);
            keys.push(key);
            console.log("Cached: ", key);
            originalJson(data);
        }
        next()
    }
}

const flush = async (request, response, next) => {
    const client = createClient();
    client.on('error', (err) => console.log(err));
    await client.connect();
    // Delete key
    for (const key of keys) {
        await client.del(key);
    }
    keys.length = 0;
    next();
}

module.exports = {
    cache,
    flush
}