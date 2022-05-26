'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');
const res = require('express/lib/response');


const createApi = async (apiData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('apis');
        const insertApi = await pool.request()
                            .input('name', sql.VarChar(30), apiData.name)
                            .input('baseUrl', sql.VarChar(2048), apiData.baseUrl)
                            .input('description', sql.VarChar(280), apiData.description)
                            .input('status', sql.Bit, apiData.status)
                            .input('isEnabled', sql.Bit, apiData.isEnabled)
                            .query(sqlQueries.createApi);                            
        return insertApi.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    createApi
}

