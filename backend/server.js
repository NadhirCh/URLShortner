const express = require('express');
const bodyParser = require('body-parser');
const shortid = require('shortid');
const mongoose = require('mongoose');
const redis = require('./redisClient');
const Url = require('./models/Url');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());


const connectToDB = async () => {
    const mongoUri = 'mongodb://mongodb:27017/urlshortener'; 
    try {
        await mongoose.connect(mongoUri, {
        });
        console.log('Connected to local MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

connectToDB();

// Shorten URL
app.post('/shorten', async (req, res) => {
    const { originalUrl } = req.body;
    const shortUrl = shortid.generate();
    try {
        const url = new Url({ originalUrl, shortUrl });
        await url.save();
        res.json({ shortUrl });
       
    } catch (error) {
        res.status(500).json({ error: 'Error shortening URL' });
        console.log("Error genertating short URL",error)
    }
});

app.get('/analytics/:shortUrl', async (req, res) => {
    const { shortUrl } = req.params;

    try {
        const url = await Url.findOne({ shortUrl });

        if (!url) {
            return res.status(404).json({ error: 'URL not found' });
        }

        const analytics = {
            shortUrl: url.shortUrl,
            originalUrl: url.originalUrl,
            hitCount: url.hitCount,
            createdAt: url.createdAt
        };
        console.log(analytics);

        res.json(analytics);
    } catch (error) {
        console.error("Error fetching analytics: ", error);
        res.status(500).json({ error: 'Error fetching analytics' });
    }
});

app.get('/:shortUrl', async (req, res) => {
    const { shortUrl } = req.params;
    console.log(shortUrl);
    try {
        const cachedUrl = await redis.get(shortUrl);
        if (cachedUrl) {
            res.redirect(cachedUrl);
            const url = await Url.findOne({ shortUrl })
            url.hitCount += 1;
            await url.save();
            return;
        }
        const url = await Url.findOne({ shortUrl });
        console.log("found the url" , url);
        if (url) {
            url.hitCount += 1;
            await url.save();
            res.redirect(url.originalUrl);
        } else {
            res.status(404).json({ error: 'URL not found' });
        }
    } catch (error) {
        console.log("error resolving the URL");
        console.log(error);
        res.status(500).json({ error: 'Error resolving URL' });
    }
});



const updateTopUrlsInRedis = async () => {
    try {
        const topUrls = await Url.find().sort({ hitCount: -1 }).limit(100);
        console.log('Top 100 URLs:', topUrls);

        // Use multi to execute multiple commands
        const pipeline = redis.multi(); // Start a Redis transaction

        topUrls.forEach((url) => {
            pipeline.set(url.shortUrl, url.originalUrl); // Queue the SET command
        });

        await pipeline.exec(); // Execute the transaction

        console.log('Redis updated with the top 100 clicked URLs');

        // Delete any old keys not in the top 100
        const keys = await redis.keys('*');
        console.log(keys);
        const topUrlKeys = topUrls.map((url) => url.shortUrl);

        for (const key of keys) {
            if (!topUrlKeys.includes(key)) {
                await redis.del(key);
                console.log(`Deleted key: ${key} from Redis`);
            }
        }
    } catch (error) {
        console.error("Error updating Redis with top URLs:", error);
    }
};


setInterval(updateTopUrlsInRedis, 30000); 


app.listen(3000, () => console.log('Server running on port 3000'));
