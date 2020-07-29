const mysql = require("promise-mysql");

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
}

const addRole = async (role) => {
    const connection = await getConnection();
    const queryResponse = await connection.query(
        "INSERT INTO role (TITLE, SALARY, DEPARTMENT_ID) VALUES ?", [role]);
    connection.end();
}

const addEmployee = async (employee) => {
    const connection = await getConnection();
    const queryResponse = await connection.query(
        "INSERT INTO employee (FIRST_NAME, LAST_NAME, ROLE_ID, MANAGER_ID) VALUES ?", [employee]);
    connection.end();
}

const fetchDepartment = async (fieldName, fieldValue) => {
    const connection = await getConnection();
    const queryResponse = await connection.query(
        `SELECT * FROM department WHERE ${fieldName} = '${fieldValue}'`);
    connection.end();
    return queryResponse;
}

module.exports = {
    addDepartment,
    addRole,
    addEmployee,
    fetchDepartment
}
