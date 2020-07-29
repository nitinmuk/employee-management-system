const { fetchDepartment } = require("./queryEmployeeDB");
const fetchAllDepartments = async () => {
    const departments = await fetchDepartment('1', '1');
    departments.sort((dep1, dep2) => parseInt(dep1.ID) - parseInt(dep2.ID));
    let departmentNames = [];
    departmentNames = departments.map(department => department.NAME);
    return departmentNames;
}
const questions = [
    {
        type: 'list',
        name: 'action',
        message: `Please choose what you want to do:`,
        choices: ['Add Department', 'Add Role', 'Add Employee',
            'View departments', 'View Roles', 'View Employees', 'Update Employee Role'],
    },
    {
        type: 'input',
        name: 'newDepartment',
        message: 'Enter the name of department:',
        when: answers => answers.action == 'Add Department',
        validate: (value) => {
            return value ? true : 'Please enter a valid department name'
        }
    },
    {
        type: 'input',
        name: 'newRoleTitle',
        message: 'Enter the title for role:',
        when: answers => answers.action == 'Add Role',
    },
    {
        type: 'input',
        name: 'newRoleSalary',
        message: answers => `Enter the salary for ${answers.newRoleTitle} role:`,
        when: answers => answers.action == 'Add Role',
    },
    {
        type: 'list',
        name: 'newRoleDepartment',
        message: answers => `Please select a department for ${answers.newRoleTitle} role:`,
        choices: fetchAllDepartments,
        when: answers => answers.action == 'Add Role',
    },

];

const continueQuestion = [
    {
        type: 'confirm',
        name: 'continue',
        message: 'Do you want to perform more operations?',
    }
]

module.exports = {
    questions,
    continueQuestion
}