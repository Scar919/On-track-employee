const mysql = require('mysql2');
const inquirer = require('inquirer');
//const consoleT = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Timp2t!!',
    database: 'company_db',
});

connection.connect((err => {
    if (err) throw err;
    console.log('Welcome to tracker');
    startMenu();
}));


const startMenu = () => {
    inquirer.
        prompt({
        message: 'Welcome, how can I help you?',
        name:'menu',
        type: 'list',
        choices: [
            'View departments',
            'View all roles',
            'View all employees',
            'Add department',
            'Add role',
            'Add employee',
            'Update employee role',
            'Exit',
        ],
    })
    .then((response => {
        switch (response.menu){
        case 'View departments':
            viewDepartment();
            break;

        case 'View all roles':
            viewRole();
            break;

        case 'View all employees':
            viewEmployees();
            break;

        case 'Add department':
            addDepartment();
            break;

        case 'Add role':
            addRole();
            break;

        case 'Add employee':
            addEmployee();
            break;

        case 'Update employee role':
            updateEmpRole();
            break;

        case 'Exit':
            connection.end();
            break;

            default:
            connection.end();
            break;
        }
    }));
};

const viewDepartment = () => {
    connection.query('SELECT * FROM department', function (err, res) {
        if (err) throw err;
        console.table(res);
        startMenu();
    });
};

const viewRole = () => {
    connection.query('SELECT * FROM role', function (err, res) {
        if (err) throw err;
        console.table(res);
        startMenu();
    });
};

const viewEmployees = () => {
    connection.query('SELECT employee.id, first_name, last_name, title, salary, dept_name, manager_id FROM ((department JOIN role ON department.id = role.department_id) JOIN employee ON role.id = employee.role_id);', 
    function (err, res) {
        if (err) throw err;
        console.table(res);
        startMenu();
    }
    );
};

const addDepartment = () => {
    inquirer.prompt([{
        name: 'department',
        type: 'input',
        message: 'Which department?',
    },
])
.then(answer => {
    connection.query(
        'INSERT INTO department (dept_name) VALUES (?)',
        [answer.department],
        function (err, res) {
            if (err) throw err;
            console.log('Added successfully');
            startMenu();
        }
    );
});
};

const addRole = () => {
    inquirer.prompt([
        {
            name: 'roleTitle',
            type: 'input',
            message: "What is the name of this role?",
        },
        {
            name: 'salary',
            type: 'input',
            message: 'What is the salary for this role?',
        },
        {
            name: 'deptId',
            type: 'input',
            message: 'What is the department ID?',
        },
    ])
    .then(answer => {
        connection.query(
            'INSERT INTO job (title, salary, department_id) VALUES (?,?,?)',
            [answer.roleTitle, answer.salary, answer.deptId],
            function (err, res) {
                if (err) throw err;
                console.log('Role added');
                startMenu();
            }
        );
    });
};

const addEmployee = () => {
    inquirer.prompt([
        {
            name: 'firstName',
            type: 'input',
            message: 'Please enter first name.',
        },
        {
            name: 'lastName',
            type: 'input',
            message: 'Please enter last name.',
        },
        {
            name: 'roleId',
            type: 'list',
            message:'Please enter role ID.',
        },
        {
            name: 'managerId',
            type: 'list',
            message: "please enter manger name",
        },
    ])
    .then(answer => {
        connection.query(
            'INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?)',
            [answer.firstName, answer.lastName, answer.roleId, answer.managerId],
            function (err, res) {
                if (err) throw err;
                console.log('Employee added');
                startMenu();
            }
        );
    });
};

const updateEmpRole = () => {
    inquirer
    .prompt([
        {
            name: 'id',
            type: 'input',
            message: 'Enter employee id',
        },
        {
            name: 'roleId',
            type: 'input',
            message: 'Enter new job id',
        },
    ])
    .then(answer => {
        connection.query(
            'UPDATE employee SET role_id=? WHERE id=?',
            [answer.roleId, answer.id],
            function (err, res) {
                if (err) throw err;
                console.log('Employee Updated');
                startMenu();
            }
        );
    });
};