'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

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

module.exports = {
    getCategories
}
