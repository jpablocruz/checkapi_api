'use strict';

const endpointGroupData = require('../data/endpoints');
const express = require('express'),jwt = require('jsonwebtoken');
const config = require('../config');
const app = express();
app.set('llave', config.llave);

const getEndpointGroups = async (req, res, next) => {
    try {
        const apiID = req.params.id;
        const endpointGroups = await endpointGroupData.getGroupById(apiID);
        res.send(endpointGroups);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
module.exports = {
    getEndpointGroups
}