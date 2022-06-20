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
                            .input('groupID', sql.Int, endpointData.groupID)
                            .input('methodType', sql.VarChar(6), endpointData.methodType)
                            .input('path', sql.VarChar(64), endpointData.path)
                            .input('endpointDescription', sql.VarChar(280), endpointData.endpointDescription)
                            .query(sqlQueries.createEndpoint);                            
        return insertEndpoint.recordset[0];
    } catch (error) {
        return error.message;
    }
}


const createParameter = async (paramData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('endpoints');
        const insertParemeter = await pool.request()
                            .input('dataType', sql.VarChar(32), paramData.dataType)
                            .input('paramName', sql.VarChar(32), paramData.paramName)
                            .input('isRequired', sql.Bit, paramData.isRequired)
                            .input('paramDescription', sql.VarChar(32), paramData.paramDescription)
                            .query(sqlQueries.createParameter);                            
        return insertParemeter.recordset[0];
    } catch (error) {
        return error.message;
    }
}

const createEndpointParamRel = async (paramData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('endpoints');
        const insertParemeter = await pool.request()
                            .input('paramID', sql.Int, paramData.paramID)
                            .input('endpointID', sql.Int, paramData.endpointID)
                            .query(sqlQueries.createParameterEndpointRel);                            
        return insertParemeter.recordset;
    } catch (error) {
        return error.message;
    }
}



const getEndpointsByGroup = async (groupID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('endpoints');
        const endpointList = await pool.request()
                                        .input('groupID', sql.Int, groupID)
                                        .query(sqlQueries.endpointsByGroup);
        return endpointList.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

const getRespCodesByEndpointID = async (endpointID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('endpoints');
        const respCodes = await pool.request()
                                        .input('endpointID', sql.Int, endpointID)
                                        .query(sqlQueries.respCodesbyEndpointID);
        return respCodes.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

const createEndpointRespCodeRel = async (endpointData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('endpoints');
        const insertEndpoint = await pool.request()
                            .input('endpointID', sql.Int, endpointData.endpointID)
                            .input('respCodeID', sql.Int, endpointData.respCodeID)
                            .query(sqlQueries.createEndpointRespCodes);                            
        return insertEndpoint.recordset;
    } catch (error) {
        return error.message;
    }
}

const getAvailableRespCodes = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('endpoints');
        const eventsList = await pool.request().query(sqlQueries.getRespCodes);
        return eventsList.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

const editEndpoint = async (endpointID, data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('endpoints');
        const update = await pool.request()
                        .input('endpointID', sql.Int, endpointID)
                        .input('endpointDescription', sql.VarChar(280), data.endpointDescription)
                        .input('methodType', sql.VarChar(6), data.methodType)
                        .input('path', sql.VarChar(64), data.path)
                        .query(sqlQueries.updateEndpoint);
        return update.recordset;
    } catch (error) {
        return error.message;
    }
}

const editLastResp = async (endpointID, data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('endpoints');
        const update = await pool.request()
                        .input('endpointID', sql.Int, endpointID)
                        .input('lastRespCode', sql.Int, data.lastRespCode)
                        .input('lastRespDate', sql.VarChar(25), data.lastRespDate)
                        .query(sqlQueries.updateLastResp);
        return update.recordset
    } catch (error) {
        return error.message;
    }
}

const deleteParams = async (paramID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('endpoints');
        const deleteParam = await pool.request()
                            .input('paramID', sql.Int, paramID)
                            .query(sqlQueries.deleteParams);
        return deleteParam.recordset;
    } catch (error) {
        return error.message;
    }
}

const deleteResponseCodesRel = async (endpointID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('endpoints');
        const deletedResps = await pool.request()
                            .input('endpointID', sql.Int, endpointID)
                            .query(sqlQueries.deleteRespCodeRel);
        return deletedResps.recordset;
    } catch (error) {
        return error.message;
    }
}

const deleteEndpoint = async (endpointID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('endpoints');
        const deleteEndpoint = await pool.request()
                            .input('endpointID', sql.Int, endpointID)
                            .query(sqlQueries.deleteEndpoint);
        return deleteEndpoint.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getGroupById,
    getEndpointById,
    getParametersbyEndpointID,
    createEndpoint,
    getEndpointsByGroup,
    createParameter,
    createEndpointParamRel,
    getRespCodesByEndpointID,
    createEndpointRespCodeRel,
    getAvailableRespCodes,
    editEndpoint,
    deleteParams,
    deleteResponseCodesRel,
    deleteEndpoint,
    editLastResp
}