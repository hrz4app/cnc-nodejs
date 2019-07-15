const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    created: { type: Date, default: Date.now },
    setpoint: { type: Number },
    rpm: { type: Number }
});

module.exports = mongoose.model('Spindlespeed', schema);