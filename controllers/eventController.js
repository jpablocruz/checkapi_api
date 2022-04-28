'use strict';

const eventData = require('../data/events');
const express = require('express'),jwt = require('jsonwebtoken');
const config = require('../config');
const app = express();
app.set('llave', config.llave);

const getAllApis = async (req, res, next) => {
    try {
        const apilist = await eventData.getApis();
        res.send(apilist);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const logUser = async (req, res, next) => {
    const data = req.body;
    try{
        const users = await eventData.login(data)
        if(users.length > 0){
            const payload = {
                check:  true };
                const token = jwt.sign(payload, app.get('llave'), {
                //expiresIn: 1400 sin el expiresIn el token es infinito
                });
                res.json({
                mensaje: 'Autenticación correcta',
                token: token
            });
        }else{
            res.json({
                 mensaje: "Usuario o contraseña incorrectos"
            })
        }
    }catch(error){
        res.status(400).send(error.message);
    }
}

const getAllEvents = async (req, res, next) => {
    try {
        const eventlist = await eventData.getEvents();
        res.send(eventlist);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getEvent = async (req, res, next) => {
    try {
        const eventId = req.params.id;
        const event = await eventData.getById(eventId);
        res.send(event);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addEvent = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await eventData.creatEvent(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updatEvent = async (req, res, next) => {
    try {
        const eventId =  req.params.id;
        const data = req.body;
        const updated = await eventData.updateEvent(eventId, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteEvent = async (req, res, next) => {
    try {
        const eventId = req.params.id;
        const deletedEvent = await eventData.deleteEvent(eventId);
        res.send(deletedEvent);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllEvents,
    getEvent,
    addEvent,
    updatEvent,
    deleteEvent,
    getAllApis,
    logUser
}