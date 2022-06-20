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
        return insertApi.recordset[0];
    } catch (error) {
        return error.message;
    }
}
const addApiCategoryAssociation = async (apiData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('apis');
        const insertApiCatAssociation = await pool.request()
                            .input('apiID', sql.Int, apiData.apiID)
                            .input('categoryID', sql.Int, apiData.categoryID)
                            .query(sqlQueries.createApiCatRel);                            
        return insertApiCatAssociation.recordset;
    } catch (error) {
        return error.message;
    }
}
const toggleApiVisibility = async (apiData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('apis');
        const update = await pool.request()
                        .input('apiID', sql.Int, apiData.apiID)
                        .input('isEnabled', sql.Bit, apiData.isEnabled)
                        .query(sqlQueries.toggleEnable);
        return update.recordset;
    } catch (error) {
        return error.message;
    }
}


const deleteApi = async (apiID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('apis');
        const deletedApi = await pool.request()
                            .input('apiID', sql.Int, apiID)
                            .query(sqlQueries.deleteApi);
        return deletedApi.recordset;
    } catch (error) {
        return error.message;
    }
}

const updateAPIinfo = async (apiID, data) => {
    try {
        let pool = await sql.connect(config.sql);
        console.log(data.didSucceed)
        const sqlQueries = await utils.loadSqlQueries('apis');
        const deletedApi = await pool.request()
                            .input('apiID', sql.Int, apiID)
                            .input('didSucceed', sql.Bit, data.didSucceed)
                            .query(sqlQueries.updateSLAinfo);
        return deletedApi.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    createApi,
    addApiCategoryAssociation,
    toggleApiVisibility,
    deleteApi,
    updateAPIinfo
}

