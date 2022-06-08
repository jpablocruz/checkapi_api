'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getGroups = async (apiID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('groups');
        const groupList = await pool.request()
                                        .input('apiID', sql.Int, apiID)
                                        .query(sqlQueries.apiGroups);
        return groupList.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

const createGroup = async (groupData) => {
    try
    {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('groups');
        const response = await pool.request()
                                    .input('name', sql.VarChar(64), groupData.name)
                                    .input('apiID', sql.Int, groupData.apiID)
                                    .query(sqlQueries.createGroups);
        return response.recordset;
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
    getGroups,
    createGroup
}