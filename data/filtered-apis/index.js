'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getAPIsByCategoryID = async(categoryID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('filtered-apis');
        const event = await pool.request()
                            .input('categoryID', sql.Int, categoryID)
                            .query(sqlQueries.apisByCategoryID);
        return event.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getAPIsByCategoryID
}