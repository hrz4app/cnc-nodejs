const express = require('express');

const api = express.Router();

api.post('/update-spindle', (req, res) => {
    const Spindlespeed = require('../models/Spindlespeed');

    if (req.body.key === 'H1r2ig4nT3ng#69') {
        Spindlespeed.create(
            {
                created: new Date,
                setpoint: req.body.setpoint,
                rpm: req.body.rpm
            },
            (err, data) => {
                if (err) {
                    res.send({ 'success': false });
                    return err
                }
                Spindlespeed.findOne({}, {}, { sort: { 'created': -1 } }, (err, speed) => {
                    req.io.sockets.emit('updateSpindle', speed);
                });
                res.send({ 'success': true });
            }
        );
    }
    else {
        res.send({ 'success': false });
    }
});

module.exports = api;