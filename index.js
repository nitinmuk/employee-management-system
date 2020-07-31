const clear = require('clear');
const chalk = require('chalk');
const figlet = require('figlet');
const cTable = require('console.table');
const inquirer = require('inquirer');
const { questions, continueQuestion } = require('./lib/questions');
const { addDepartment, addEmployee, addRole, fetchData, fetchEmployeeByName } = require('./lib/queryEmployeeDB');


const initializeDisplay = () => {
    clear();
    console.log(
        chalk.yellow(
            figlet.textSync('EMP MGMT SYSTEM', { horizontalLayout: 'full' })
        )
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
            const role = await fetchData("role", "TITLE", answers.employeeRoleTitle);
            const roleId = role[0].ID;
            let managerId = null;
            if ('None' != answers.employeeManager) {
                const managerName = answers.employeeManager.split(" ");
                const manager = await fetchEmployeeByName(managerName[0], managerName[1]);
                managerId = manager[0].ID;
            }
            await addEmployee([[answers.employeeFirstName, answers.employeeLastName, roleId, managerId]]);
            break;
        case 'View Departments':
            const departments = await fetchData("department", "1", "1");            
            console.table("Department Summary", departments);            
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


