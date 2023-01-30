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
                engineerQuestions()
                break;
            case 'View All Roles': 
                internQuestions()
                break;
            case 'View All Employees': 
                internQuestions()
                break;
            case 'Add A Department': 
                internQuestions()
                break;
            case 'Add A Role': 
                internQuestions()
                break;
            case 'Add An Employee': 
                internQuestions()
                break;
            case 'Update Employee Role': 
                internQuestions()
                break;
            case 'Finish': 
                internQuestions()
                break;
            default:
                buildTeam()
        }
    })
};

employeeQuestions();
