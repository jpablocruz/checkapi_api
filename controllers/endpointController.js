'use strict';

const endpointData = require('../data/endpoints');
const paramData = require('../data/endpoints');
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

const addParameter = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await paramData.createParameter(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addEndpointParamRel = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await paramData.createEndpointParamRel(data);
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

const getRespCodesByEndpointID = async (req, res, next) => {
    try
    {
        const endpointID = req.params.id;
        const endpoints = await endpointData.getRespCodesByEndpointID(endpointID);
        res.send(endpoints);
    }
    catch (error){
        res.status(400).send(error.message);
    }
};

const addEndpointRespCodes = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await paramData.createEndpointRespCodeRel(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllRespCodes = async (req, res, next) => {
    try
    {
        const respCodes = await endpointData.getAvailableRespCodes();
        res.send(respCodes);
    }
    catch (error){
        res.status(400).send(error.message);
    }
};
const updateEndpointData = async (req, res, next) => {
    try {
        const endpointID =  req.params.id;
        const data = req.body;
        const updated = await endpointData.editEndpoint(endpointID, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteParameter = async (req, res, next) => {
    try {
        const paramID = req.params.id;
        const deletedParam = await endpointData.deleteParams(paramID);
        res.send(deletedParam);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const deleteResponseCodes = async (req, res, next) => {
    try {
        const endpointID = req.params.id;
        const deletedResps = await endpointData.deleteResponseCodesRel(endpointID);
        res.send(deletedResps);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteEndpoint = async (req, res, next) => {
    try {
        const endpointID = req.params.id;
        const deletedEndpoint = await endpointData.deleteEndpoint(endpointID);
        res.send(deletedEndpoint);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateEndpointLastResp = async (req, res, next) => {
    try {
        const endpointID =  req.params.id;
        const data = req.body;
        const updated = await endpointData.editLastResp(endpointID, data);
        res.send({
            hasError: false,
            message: "last response updated succesfully",
            object: updated
        })
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    addEndpoint,
    getEndpointsByGroupId,
    addParameter,
    addEndpointParamRel,
    getRespCodesByEndpointID,
    addEndpointRespCodes,
    getAllRespCodes,
    updateEndpointData,
    deleteParameter,
    deleteResponseCodes,
    deleteEndpoint,
    updateEndpointLastResp
}