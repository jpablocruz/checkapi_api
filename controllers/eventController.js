'use strict';

const eventData = require('../data/events');
const express = require('express'),jwt = require('jsonwebtoken');
const config = require('../config');
const app = express();
app.set('llave', config.llave);

const getAllApis = async (req, res, next) => {
    try {
        const userID = req.params.id;
        const apilist = await eventData.getApis(userID);
        res.send(apilist);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        const userList = await eventData.getUsers();
        res.send(userList);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateUserRole = async (req, res, next) => {
    try {
        const userID =  req.params.id;
        const data = req.body;
        const updated = await eventData.updateUser(userID, data);
        res.send(updated);
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
                res.json(
                    {
                        mensaje: 'Autenticación correctisima',
                        email: users[0].email,
                        role: users[0].role,
                        token: token,
                        userID: users[0].userID
                    }
            );
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

const updateEvent = async (req, res, next) => {
    try {
        const eventId =  req.params.id;
        const data = req.body;
        const updated = await eventData.updateEvent(eventId, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const updateApi = async (req, res, next) => {
    try {
        const apiID =  req.params.id;
        const data = req.body;
        const updated = await eventData.updateApi(apiID, data);
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

const deleteEndpoint = async (req, res, next) => {
    try {
        const endpointID = req.params.id;
        const deletedApi = await eventData.deleteEndpoint(endpointID);
        res.send(deletedApi);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllCategories = async (req, res, next) => {
    try {
        const categorylist = await eventData.getCategories();
        res.send(categorylist);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getApi = async (req, res, next) => {
    try {
        const apiID = req.params.id;
        const event = await eventData.getApiById(apiID);
        res.send(event);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const addFavorite = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await eventData.createFavorite(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteFavorite = async (req, res, next) => {
    try {
        const data = req.body;
        const deletedFav = await eventData.deleteFavorite(data);
        res.send(deletedFav);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllEvents,
    getEvent,
    addEvent,
    updateEvent,
    deleteEvent,
    getAllApis,
    updateApi,
    deleteEndpoint,
    logUser,
    getAllCategories,
    getApi,
    getAllUsers,
    updateUserRole,
    addFavorite,
    deleteFavorite,
}