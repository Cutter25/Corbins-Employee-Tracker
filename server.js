const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');

const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Creating database connection
const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: 'SQL0325!',
        database: 'employee_db'
    },
    console.log('Successfully connected to employee database')
);

db.connect(function (err) {
    if (err) console.log(err);
    else {
        employerQuestions();
        console.log('Connected!');
    }
});

// Questions for user
function employerQuestions() {
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

// View all departments

function viewAllDepartments() {
    console.log('Here are your departments!');

    var query = `SELECT * from department;`

    db.query(query, function(err, res) {
        console.table(res);

        employerQuestions();
    });
};

// View all roles

function viewAllRoles() {
    console.log('Here are all possible job positions!');

    var query = `SELECT
        role.id, 
        role.title,
        role.salary,
        department FROM role 
        JOIN department on role.department_id = department.id;`

    db.query(query, function(err, res){
        if (err) throw err;
        console.table(res);

        employerQuestions();
    });
};

// View all employees

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

        employerQuestions();
    });
};

// Add a department to employee_db

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'addADepartment',
            message: 'What department do you want to add?'
        }
    ]).then (function(answer) {
        var query = `INSERT INTO department SET?`
        db.query(query, {
            addADepartment:answer.department
        },
        function (err, res){
            if (err) throw err;
            console.log("Department Added!");

            employerQuestions();
        });
    });
};

// Add role to employee_db

function addRole() {
    var query = `SELECT 
    department.department, 
    department.id
    FROM department`

    db.query(query, function(err, res){
        if (err) throw err;
        const departmentOptions = res.map(({ id, department }) => ({
            value: id, name: `${department}`
          }));
          console.table(res);

        roleQuestions(departmentOptions);
    });
};

function roleQuestions(departmentOptions) {
    inquirer.prompt([
        {
            type: 'list',
            name: 'departmentChoice',
            message: 'which department will this role be added to?',
            choices: departmentOptions
        },
        {
            type: 'input',
            name: 'roleTitle',
            message: 'What shall this role be called?'
        },
        {
            type: 'input',
            name: 'roleSalary',
            message: 'How much will this job make per year?'
        },
    ])
    .then(function(answer) {
        var query = `INSERT INTO role SET ?`
        
        db.query(query, {
            title: answer.roleRitle,
            salary: answer.roleSalary,
            department_id: answer.departmentChoice
        },
        function (err, res) {
            if (err) throw err;
    
            console.table(res);
            console.log("Role created and added successfully!");
    
            employerQuestions();
        });
    });
};

// Add employee to employee_db

function addEmployee() {
    var query = `SELECT id, title, salary FROM role`

    db.query(query, function(err, res)  {
        if (err) throw err

        const employeeOptions = res.map(({ id, title, salary })=>({
            value: id, name:`${id} ${title} $${salary}`
        }));

        employeeQuestions(employeeOptions);

    });
};

function employeeQuestions(employeeOptions) {
    inquirer.prompt([
        {
            type:"input",
            name:"firstName",
            message:"What is the employee's first name?"
        },
        {
            type:"input",
            name:"lastName",
            message:"What is the employee's last name?"
        },
        {
            type:"list",
            name:"role",
            message:"What is the employee's role in the company?",
            choices: employeeOptions
        },
        {
            type:"input",
            name:"manager",
            message:"Who is the emploee's manager?"
        },
    ])
    .then(function(answer){
        var query = `INSERT INTO employee SET ?`

        db.query(query, 
          {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: answer.role,
          manager_id: answer.manager,
          },
        function (err, res){
          if (err) throw err;
    
          console.log("Employee created and added successfully!");

          employerQuestions();
        });
    });
};


function updateAnEmployee() {

};

function finish() {
    connection.end();
};

employerQuestions();
