'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');
const res = require('express/lib/response');

const getEvents = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const eventsList = await pool.request().query(sqlQueries.eventslist);
        return eventsList.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

const getApis = async (userID) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const apisList = await pool.request()
            .input('userID', sql.Int, userID)
            .query(sqlQueries.apislist);
        return apisList.recordset;
    }catch(error){
        console.log(error.message);
    }
}

const login = async (data) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const users = await pool.request()
                .input('email', sql.VarChar(64), data.email)
                .query(sqlQueries.userList);
        return users.recordset;
    }catch(error){
        console.log(error.message);
    }
}

const getById = async(eventId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const event = await pool.request()
                            .input('eventId', sql.Int, eventId)
                            .query(sqlQueries.eventbyId);
        return event.recordset;
    } catch (error) {
        return error.message;
    }
}

const getApiById = async(apiID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const event = await pool.request()
                            .input('apiID', sql.Int, apiID)
                            .query(sqlQueries.apibyId);
        return event.recordset;
    } catch (error) {
        return error.message;
    }
}

const creatEvent = async (eventdata) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const insertEvent = await pool.request()
                            .input('eventTitle', sql.NVarChar(100), eventdata.eventTitle)
                            .input('eventDescription', sql.NVarChar(1500), eventdata.eventDescription)
                            .input('startDate', sql.Date, eventdata.startDate)
                            .input('endDate', sql.Date, eventdata.endDate)
                            .input('avenue', sql.NVarChar(200), eventdata.avenue)
                            .input('maxMembers', sql.Int, eventdata.maxMembers)
                            .query(sqlQueries.createEvent);                            
        return insertEvent.recordset;
    } catch (error) {
        return error.message;
    }
}

const updateEvent = async (eventId, data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const update = await pool.request()
                        .input('eventId', sql.Int, eventId)
                        .input('eventTitle', sql.NVarChar(100), data.eventTitle)
                        .input('eventDescription', sql.NVarChar(1500), data.eventDescription)
                        .input('startDate', sql.Date, data.startDate)
                        .input('endDate', sql.Date, data.endDate)
                        .input('avenue', sql.NVarChar(200), data.avenue)
                        .input('maxMembers', sql.Int, data.maxMembers)
                        .query(sqlQueries.updateEvent);
        return update.recordset;
    } catch (error) {
        return error.message;
    }
}
const updateApi = async (apiID, data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const update = await pool.request()
                        .input('apiID', sql.Int, apiID)
                        .input('apiCategoryID', sql.Int, data.apiCategoryID)
                        .input('name', sql.VarChar(30), data.name)
                        .input('baseUrl', sql.VarChar(2048), data.baseUrl)
                        .input('description', sql.VarChar(280), data.description)
                        .query(sqlQueries.updateApi);
        return update.recordset;
    } catch (error) {
        return error.message;
    }
}

const updateUser = async (userID, data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const update = await pool.request()
                        .input('userID', sql.Int, userID)
                        .input('role', sql.VarChar(32), data.role)
                        .input('email', sql.VarChar(64), data.email)
                        .query("UPDATE [dbo].[Users] SET role = @role WHERE userID in (SELECT userID from [dbo].[Users] WHERE email = @email)");
        return update.recordset;
    } catch (error) {
        return error.message;
        
    }
}

const deleteEndpoint = async (endpointID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const deleteEndpoint = await pool.request()
                            .input('endpointID', sql.Int, endpointID)
                            .query(sqlQueries.deleteEndpoint);
        return deleteEndpoint.recordset;
    } catch (error) {
        return error.message;
    }
}
const deleteEvent = async (eventId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const deleteEvent = await pool.request()
                            .input('eventId', sql.Int, eventId)
                            .query(sqlQueries.deleteEvent);
        return deleteEvent.recordset;
    } catch (error) {
        return error.message;
    }
}

const getCategories = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('categories');
        const categoriesList = await pool.request().query(sqlQueries.categoryList);
        return categoriesList.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

const getUsers = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const userList = await pool.request().query(sqlQueries.completeUserList);
        return userList.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

const createFavorite = async (eventdata) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const insertFavorite = await pool.request()
                            .input('apiID', sql.Int, eventdata.apiID)
                            .input('userID', sql.Int, eventdata.userID)
                            .query(sqlQueries.addFavorite);                            
        return insertFavorite.recordset;
    } catch (error) {
        return error.message;
    }
}

const deleteFavorite = async (eventdata) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const deleteFavorite = await pool.request()
                            .input('apiID', sql.Int, eventdata.apiID)
                            .input('userID', sql.Int, eventdata.userID)
                            .query(sqlQueries.deleteFav);
        return deleteFavorite.recordset;
    } catch (error) {
        return error.message;
    }
}



module.exports = {
    getEvents,
    getById,
    creatEvent,
    updateEvent,
    deleteEvent,
    getApis,
    updateApi,
    deleteEndpoint,
    login,
    getCategories,
    getApiById,
    getUsers,
    updateUser,
    createFavorite,
    deleteFavorite,
}