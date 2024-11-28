const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    shortUrl: { type: String, required: true, unique: true },
    location:[String],
    hitCount: { type: Number, default: 0 },
});

module.exports = mongoose.model('Location', locationSchema);
