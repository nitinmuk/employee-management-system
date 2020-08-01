const clear = require('clear');
const chalk = require('chalk');
const figlet = require('figlet');
const cTable = require('console.table');
const inquirer = require('inquirer');
const { questions, continueQuestion } = require('./lib/questions');
const { addDepartment, addEmployee,
    addRole, fetchData, fetchEmployeeByName,
    fetchRoleDetails, fetchEmployeeDetails,
    updateData
} = require('./lib/queryEmployeeDB');


const initializeDisplay = () => {
    clear();
    console.log(
        chalk.yellow(
            figlet.textSync('EMP MGMT SYSTEM', { horizontalLayout: 'full' })
        )
    );
}

const getRoleId = async roleTitle => {
    const role = await fetchData("role", "TITLE", roleTitle);
    return role[0].ID;
}

const getEmployeeId = async employeeName => {
    let employeeId = null;
    if ('None' != employeeName) {
        employeeName = employeeName.split(" ");
        const employee = await fetchEmployeeByName(employeeName[0], employeeName[1]);
        employeeId = employee[0].ID;
    }
    return employeeId;
}

const updateEmployeeRole = async answers => {
    const roleId = await getRoleId(answers.newRole);
    const employeeId = await getEmployeeId(answers.employeeToUpdate);
    await updateData("employee", employeeId, "ROLE_ID", roleId);
    console.log(
        chalk.yellow(`${answers.employeeToUpdate}'s role updated successfully`)
    );
}

const aksQuestions = async () => {
    const answers = await inquirer.prompt(questions);
    switch (answers.action) {
        case 'Add Department':
            await addDepartment([[answers.newDepartment]]);
            break;
        case 'Add Role':
            const department = await fetchData("department", "NAME", answers.newRoleDepartment);
            await addRole([[answers.newRoleTitle, answers.newRoleSalary, department[0].ID]]);
            break;
        case 'Add Employee':
            const roleId = await getRoleId(answers.employeeRoleTitle);
            const managerId = await getEmployeeId(answers.employeeManager);
            await addEmployee([[answers.employeeFirstName, answers.employeeLastName, roleId, managerId]]);
            break;
        case 'View Departments':
            const departments = await fetchData("department", "1", "1");
            console.table("Departments Summary", departments);
            break;
        case 'View Roles':
            const roles = await fetchRoleDetails();
            console.table("Roles Summary", roles);
            break;
        case 'View Employees':
            let employees = await fetchEmployeeDetails();
            employees = employees.map(employee => {
                employee.MANAGER = `${employee.MANAGER_FIRST_NAME} ${employee.MANAGER_LAST_NAME}`;
                delete employee.MANAGER_FIRST_NAME;
                delete employee.MANAGER_LAST_NAME;
                return employee;
            });
            console.table("Employees Summary", employees);
            break;
        case 'Update Employee Role':
            await updateEmployeeRole(answers);
            break;
    }
    inquirer.prompt(continueQuestion).then(async answers => {
        if (answers.continue) {
            await aksQuestions();
        }

    });
}
initializeDisplay();
aksQuestions();


