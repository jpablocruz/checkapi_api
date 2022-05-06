'use strict';

const eventData = require('../data/filtered-apis');
const express = require('express'),jwt = require('jsonwebtoken');
const config = require('../config');
const app = express();
app.set('llave', config.llave);

const getAPIsByCategories = async (req, res, next) => {
    try {
        const categoryID = req.params.id;
        const filteredAPIs = await eventData.getAPIsByCategoryID(categoryID);
        res.send(filteredAPIs);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
module.exports = {
    getAPIsByCategories
}