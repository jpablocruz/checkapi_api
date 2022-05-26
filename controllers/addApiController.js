'use strict';

const apiData = require('../data/apis');
const express = require('express'),jwt = require('jsonwebtoken');
const config = require('../config');
const app = express();
app.set('llave', config.llave);


const addApi = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await apiData.createApi(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addApi,
}