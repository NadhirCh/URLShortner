const { createClient } = require('redis'); 

const redisClient = createClient({
    socket: {
        host: 'redis', 
        port: 6379,    
    },
});

redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
    console.error('Redis Client Error:', err);
});

(async () => {
    try {
        await redisClient.connect(); // Use async/await to connect
        console.log('Redis client connected successfully');
    } catch (error) {
        console.error('Failed to connect to Redis:', error);
    }
})();

module.exports = redisClient;
