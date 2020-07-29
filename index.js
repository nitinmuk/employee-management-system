const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const { questions, continueQuestion } = require('./lib/questions');
const { addDepartment, addEmployee, addRole, fetchData, fetchDepartment } = require('./lib/queryEmployeeDB');
const inquirer = require('inquirer');

const initializeDisplay = () => {
    clear();
    console.log(
        chalk.yellow(
            figlet.textSync('EMP MGMT SYSTEM', { horizontalLayout: 'full' })
        )
    );
}

const aksQuestions = () => {
    inquirer.prompt(questions).then(async answers => {
        switch (answers.action) {
            case 'Add Department':
                addDepartment([[answers.newDepartment]]);
                console.log(
                    chalk.yellow(`${answers.newDepartment} department added successfully`)
                );
                break;
            case 'Add Role':
                const department = await fetchDepartment("NAME", answers.newRoleDepartment);
                addRole([[answers.newRoleTitle, answers.newRoleSalary, department[0].ID]]);
                break;
        }

    });

}
initializeDisplay();
aksQuestions();

/*inquirer.prompt(continueQuestion).then(answers => {
    if (answers.continue) {
        aksQuestions();
    }

});*/
