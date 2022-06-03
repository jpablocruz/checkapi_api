'use strict';

const apiData = require('../data/apis');
const express = require('express'),jwt = require('jsonwebtoken');
const config = require('../config');
const app = express();
app.set('llave', config.llave);

const deleteApi = async (req, res, next) => {
    try {
        const apiID = req.params.id;
        const deletedApi = await apiData.deleteApi(apiID);
        res.send(deletedApi);
    } catch (error) {
        res.status(400).send(error.message);
    }
}




module.exports = {
    deleteApi
}