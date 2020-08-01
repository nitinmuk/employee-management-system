const { fetchData } = require("./queryEmployeeDB");
const fetchAllDepartments = async () => {
    const departments = await fetchData('department', '1', '1');
    return departments.map(department => department.NAME).sort();
}
const fetchAllRoleTitles = async () => {
    const roles = await fetchData('role', '1', '1');
    return roles.map(role => role.TITLE).sort();
}
const getManagerChoiceList = async () => {
    const sortedEmployees = await getEmployeeChoiceList();    
    sortedEmployees.push('None');
    return sortedEmployees;
}
const getEmployeeChoiceList = async () => {
    const employees = await fetchData('employee','1','1');
    const sortedEmployees =  employees.map(employee => `${employee.FIRST_NAME} ${employee.LAST_NAME}`).sort();
    return sortedEmployees;
}
const questions = [
    {
        type: 'list',
        name: 'action',
        message: `Please choose what you want to do:`,
        choices: ['Add Department', 'Add Role', 'Add Employee',
            'View Departments', 'View Roles', 'View Employees', 'Update Employee Role'],
    },
    {
        type: 'input',
        name: 'newDepartment',
        message: 'Enter the name of department:',
        when: answers => answers.action == 'Add Department',
        validate: (value) => {
            return value.trim() ? true : 'Please enter a valid department name'
        }
    },
    {
        type: 'input',
        name: 'newRoleTitle',
        message: 'Enter the title for role:',
        when: answers => answers.action == 'Add Role',
        validate: (value) => {
            return value.trim() ? true : 'Please enter a valid role title'
        }
    },
    {
        type: 'input',
        name: 'newRoleSalary',
        message: answers => `Enter the salary for ${answers.newRoleTitle} role:`,
        when: answers => answers.action == 'Add Role',
        validate: (value) => {
            return value.trim() ? true : 'Please enter a valid salary value'
        }
    },
    {
        type: 'list',
        name: 'newRoleDepartment',
        message: answers => `Please select a department for ${answers.newRoleTitle} role:`,
        choices: fetchAllDepartments,
        when: answers => answers.action == 'Add Role',
    },
    {
        type: 'input',
        name: 'employeeFirstName',
        message: 'Enter the first name of employee:',
        when: answers => answers.action == 'Add Employee',
        validate: (value) => {
            return value.trim() ? true : 'Please enter a valid first name'
        }
    },
    {
        type: 'input',
        name: 'employeeLastName',
        message: 'Enter the last name of employee:',
        when: answers => answers.action == 'Add Employee',
        validate: (value) => {
            return value.trim() ? true : 'Please enter a valid last name'
        }
    },
    {
        type: 'list',
        name: 'employeeRoleTitle',
        message: answers => `Please select a role title for ${answers.employeeFirstName}:`,
        choices: fetchAllRoleTitles,
        when: answers => answers.action == 'Add Employee',
    },
    {
        type: 'list',
        name: 'employeeManager',
        message: answers => `Please select ${answers.employeeFirstName}'s manager:`,
        choices: getManagerChoiceList,
        default: 'None',
        when: answers => answers.action == 'Add Employee',
    },
    {
        type: 'list',
        name: 'employeeToUpdate',
        message: answers => `Please select employee whose role you want to update:`,
        choices: getEmployeeChoiceList,
        when: answers => answers.action == 'Update Employee Role',
    },
    {
        type: 'list',
        name: 'newRole',
        message: answers => `Please select ${answers.employeeToUpdate}'s new role:`,
        choices: fetchAllRoleTitles,
        when: answers => answers.action == 'Update Employee Role',
    }

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