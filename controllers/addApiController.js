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
const addApiCatRel = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await apiData.addApiCategoryAssociation(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const updateAPIinfoSLA = async (req, res, next) => {
    try {
        const apiID =  req.params.id;
        const data = req.body;  //didSucceed
        console.log(data)
        const insert = await apiData.updateAPIinfo(apiID, data);
        res.send({message: 'did work'});
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    addApi,
    addApiCatRel,
    updateAPIinfoSLA
}