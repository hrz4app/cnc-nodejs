const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    created: { type: Date, default: Date.now },
    xpos: { type: Number },
    ypos: { type: Number },
    zpos: { type: Number }
});

module.exports = mongoose.model('Stepperposition', schema);