const express = require('express');

const api = express.Router();

api.post('/update-stepper', (req, res) => {
    const Stepperposition = require('../models/Stepperposition');

    if (req.body.key === 'H1r2ig4nT3ng#69') {
        Stepperposition.create(
            {
                created: new Date,
                xpos: req.body.xpos,
                ypos: req.body.ypos,
                zpos: req.body.zpos
            },
            (err, data) => {
                if (err) {
                    res.send({ 'success': false });
                    return err
                }
                Stepperposition.find({}, (err, axises) => {
                    req.io.sockets.emit('updateStepper', axises);
                });
                res.send({ 'success': true });
            }
        );
    }
    else {
        res.send({ 'success': false });
    }
});

api.post('/reset-stepper', (req, res) => {
    const Stepperposition = require('../models/Stepperposition');
    
    if (req.body.key === 'H1r2ig4nT3ng#69') {
        Stepperposition.deleteMany({}, (err) => {
            if (err) {
                res.send({ 'success': false });
                return err
            }
            Stepperposition.find({}, (err, axises) => {
                req.io.sockets.emit('updateStepper', axises);
            });
            res.send({ 'success': true });
        });
    }
    else {
        res.send({ 'success': false });
    }
});

module.exports = api;