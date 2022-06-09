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
        console.log(groupData.name+ "  " + groupData.apiID)
        const insertGroup = await pool.request()
                                    .input('name', sql.VarChar(30), groupData.name)
                                    .input('apiID', sql.Int, groupData.apiID)
                                    .query(sqlQueries.createGroup);
        return {
                hasError: false,
                message: "group added susccesfully",
                response: insertGroup.recordset
        }
    }
    catch(error){
        console.log(error.message);
    }
}

module.exports = {
    getGroups,
    createGroup
}