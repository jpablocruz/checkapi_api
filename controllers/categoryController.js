'use strict';

const categoryData = require('../data/categories');
const express = require('express'),jwt = require('jsonwebtoken');
const config = require('../config');
const app = express();
app.set('llave', config.llave);

const getAllCategories = async (req, res, next) => {
    try {
        const categorylist = await categoryData.getCategories();
        res.send(categorylist);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllCategories
}