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

module.exports = {
    getGroups
}