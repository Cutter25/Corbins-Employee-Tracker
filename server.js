const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Creating database connection
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '0325',
        database: 'employee_db'
    },
    console.log('Successfully connected to employee database')
);

db.connect(function (err) {
    if (err) throw err;
    else {
        employeeQuestions();
        console.log('Connected!');
    }
});

// Questions for user
function employeeQuestions() {
    inquirer.prompt([
            {
                type:'list',
                name:'action',
                message: 'What can we help you with today boss?',
                choices:[
                    'View All Departments',
                    'View All Roles',
                    'View All Employees',
                    'Add A Department',
                    'Add A Role',
                    'Add An Employee',
                    'Update Employee Role',
                    'Finish'
                 ]
            },
    ]) .then ((userChoice) => {
        switch (userChoice.action) {
            case 'View All Departments':
                // <-------- EDIT THESE CALLBACKS WHEN THEY"RE DONE!!!!! --------->
                viewAllDepartments();
                break;
            case 'View All Roles': 
                viewAllRoles();
                break;
            case 'View All Employees': 
                viewAllEmployees();
                break;
            case 'Add A Department': 
                addDepartment();
                break;
            case 'Add A Role': 
                addRole();
                break;
            case 'Add An Employee': 
                addEmployee();
                break;
            case 'Update Employee Role': 
                updateAnEmployee();
                break;
            case 'Finish': 
                finish();
                break;
            default:
                finish();
        };
    });
};

function viewAllDepartments() {
    console.log('Here are your departments!');

    var query = `SELECT * from department;`

    db.query(query, function(err, res) {
        console.table(res);

        employeeQuestions();
    });
};

function viewAllRoles() {
    console.log('Here are all possible job positions!');

    var query = `SELECT
        role.id, 
        role.title,
        role.salary,
        department FROM role 
        JOIN department on role.department_id = department.id;`

    db.query(query, function(err, res){
        console.table(res);

        employeeQuestions();
    });
};

function viewAllEmployees() {
    console.log('Here are all of your employees!');

    var query = `SELECT 
        e.id, 
        e.first_name, 
        e.last_name, 
        r.title, 
        d.department AS department, 
        r.salary, 
        CONCAT(m.first_name, ' ', 
        m.last_name) AS manager
        FROM employee e
        LEFT JOIN role r
        ON e.role_id = r.id
        LEFT JOIN department d
        ON d.id = r.department_id
        LEFT JOIN employee m
        ON m.id = e.manager_id`

    db.query(query, function(err, res){
        if (err) throw err;
        console.table(res);

        employeeQuestions();
    });
};


employeeQuestions();
