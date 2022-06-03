'use strict';

const apiData = require('../data/apis');
const express = require('express'),jwt = require('jsonwebtoken');
const config = require('../config');
const app = express();
app.set('llave', config.llave);

const updateApiVisibility = async (req, res, next) => {
    try {
        const data = req.body;
        const updated = await apiData.toggleApiVisibility(data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
} 


module.exports = {
    updateApiVisibility
}