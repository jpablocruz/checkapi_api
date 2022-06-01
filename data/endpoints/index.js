'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getGroupById = async(apiID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('endpoints');
        const event = await pool.request()
                            .input('apiID', sql.Int, apiID)
                            .query(sqlQueries.endpointGroupsbyId);
        return event.recordset;
    } catch (error) {
        return error.message;
    }
}
const getEndpointById = async(endpointID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('endpoints');
        const event = await pool.request()
                            .input('endpointID', sql.Int, endpointID)
                            .query(sqlQueries.endpointbyId);
        return event.recordset;
    } catch (error) {
        return error.message;
    }
}
const getParametersbyEndpointID = async(endpointID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('endpoints');
        const event = await pool.request()
                            .input('endpointID', sql.Int, endpointID)
                            .query(sqlQueries.endpointParamsbyId);
        return event.recordset;
    } catch (error) {
        return error.message;
    }
}
const createEndpoint = async (endpointData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('endpoints');
        const insertEndpoint = await pool.request()
                            .input('respCodeID', sql.Int, endpointData.respCodeID)
                            .input('groupID', sql.Int, endpointData.groupID)
                            .input('methodType', sql.VarChar(6), endpointData.methodType)
                            .input('path', sql.VarChar(64), endpointData.path)
                            .input('endpointDescription', sql.VarChar(280), endpointData.endpointDescription)
                            .query(sqlQueries.createEndpoint);                            
        return insertEndpoint.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getGroupById,
    getEndpointById,
    getParametersbyEndpointID,
    createEndpoint
}