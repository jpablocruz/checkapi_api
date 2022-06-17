'use strict';

const endpointData = require('../data/endpoints');
const groupsData = require('../data/groups');
const express = require('express'),jwt = require('jsonwebtoken');
const config = require('../config');
const app = express();
app.set('llave', config.llave);

const getEndpointGroups = async (req, res, next) => {
    try {
        const apiID = req.params.id;
        const endpointGroups = await endpointData.getGroupById(apiID);
        res.send(endpointGroups);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getEndpoint = async (req, res, next) => {
    try {
        const endpointID = req.params.id;
        const endpointGroups = await endpointData.getEndpointById(endpointID);
        res.send(endpointGroups);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getEndpointParameters = async (req, res, next) => {
    try {
        const endpointID = req.params.id;
        const endpointParams = await endpointData.getParametersbyEndpointID(endpointID);
        res.send(endpointParams);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

//groups endpoints 
const getGroupsbyId = async (req, res, next) => {
    try
    {
        const apiID = req.params.id;
        const apiGroups = await groupsData.getGroups(apiID);
        res.send(apiGroups);
    }
    catch (error){
        res.status(400).send(error.message);
    }
}

const addGroup = async (req, res, next) => {
    try {
        const data = req.body
        const insert = await groupsData.createGroup(data)
        res.send(insert);
    }
    catch(error){
        res.status(400).send(error.message)
    }
}

const deleteGroup = async (req, res, next) => {
    try {
        const groupID = req.params.id;
        const deletedGroup = await groupsData.deleteGroup(groupID);
        res.send(deletedGroup);
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    getEndpointGroups,
    getEndpoint,
    getEndpointParameters,
    getGroupsbyId,
    addGroup,
    deleteGroup
}