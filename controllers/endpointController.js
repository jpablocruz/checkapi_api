'use strict';

const endpointData = require('../data/endpoints');
const express = require('express'),jwt = require('jsonwebtoken');
const config = require('../config');
const app = express();
app.set('llave', config.llave);

const addEndpoint = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await endpointData.createEndpoint(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getEndpointsByGroupId = async (req, res, next) => {
    try
    {
        const groupID = req.params.id;
        const endpoints = await endpointData.getEndpointsByGroup(groupID);
        res.send(endpoints);
    }
    catch (error){
        res.status(400).send(error.message);
    }
};

module.exports = {
    addEndpoint,
    getEndpointsByGroupId
}