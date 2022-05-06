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
module.exports = {
    getGroupById,
    getEndpointById
}