const mysql = require("promise-mysql");
const chalk = require('chalk');

const getConnection = async () => {
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

const addDepartment = async (department) => {
    const connection = await getConnection();
    const queryResponse = await connection.query(
        "INSERT INTO department (NAME) VALUES ?", [department]);
    connection.end();
    console.log(
        chalk.yellow(`department added successfully`)
    );
}

const addRole = async (role) => {
    const connection = await getConnection();
    const queryResponse = await connection.query(
        "INSERT INTO role (TITLE, SALARY, DEPARTMENT_ID) VALUES ?", [role]);
    connection.end();
    console.log(
        chalk.yellow(`role added successfully`)
    );
}

const addEmployee = async (employee) => {
    const connection = await getConnection();
    const queryResponse = await connection.query(
        "INSERT INTO employee (FIRST_NAME, LAST_NAME, ROLE_ID, MANAGER_ID) VALUES ?", [employee]);
    connection.end();
    console.log(
        chalk.yellow(`employee added successfully`)
    );
}

const fetchData = async (tableName, fieldName, fieldValue) => {
    const connection = await getConnection();
    const queryResponse = await connection.query(
        `SELECT * FROM ${tableName} WHERE ${fieldName} = '${fieldValue}'`);
    connection.end();
    return queryResponse;
}

const fetchEmployeeByName = async (fName, lName) => {
    const connection = await getConnection();
    const queryResponse = await connection.query(
        'SELECT * FROM employee WHERE FIRST_NAME = ? AND LAST_NAME = ?',[fName, lName]);
    connection.end();
    return queryResponse;
}

module.exports = {
    addDepartment,
    addRole,
    addEmployee,
    fetchData,
    fetchEmployeeByName
}
