const mysql = require("promise-mysql");
const chalk = require('chalk');
class QueryData {

    constructor() {
        this.getConnection = async () => {
            return await mysql.createConnection({
                host: "localhost",
                // Your port; if not 3306
                port: 3306,
                // Your username
                user: "root",
                // Your password
                password: "root",
                database: "employee_DB"
            });
        }
    }

    async fetchData(tableName, fieldName, fieldValue) {
        const connection = await this.getConnection();
        const queryResponse = await connection.query(
            `SELECT * FROM ${tableName} WHERE ${fieldName} = '${fieldValue}'`);
        connection.end();
        return queryResponse;
    }

    async updateData(tableName, Id, fieldName, fieldValue) {
        const connection = await this.getConnection();
        const queryResponse = await connection.query(
            `UPDATE ?? SET ?? = ? WHERE ID = ?`, [tableName, fieldName, fieldValue, Id]);
        connection.end();
    }

    async deleteData(tableName, fieldName, fieldValue) {
        const connection = await this.getConnection();
        const queryResponse = await connection.query(
            'DELETE FROM ?? WHERE ?? = ?', [tableName, fieldName, fieldValue]);
        connection.end();
        return queryResponse;
    }
}

module.exports = QueryData;
