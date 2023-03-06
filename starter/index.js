const Manager = require("./Manager");
const Engineer = require("./Engineer");
const Intern = require("./Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./page-template");


function createEngineer(team) {
    inquirer.prompt([
        
        {
            type: 'input',
            name: 'name',
            message: "What is the engineer's name?",
        },
        {
            type: 'input',
            name: 'id',
            message: "What is the engineer's id?",
        },
        {
            type: 'input',
            name: 'email',
            message: "What is the engineer's email?",
        },
        {
            type: 'input',
            name: 'github',
            message: "What is the engineer's GitHub username?",
        }
    ]).then((engineerDetails) => {
       
        const engineer = new Engineer(engineerDetails.name, engineerDetails.id, engineerDetails.email, engineerDetails.github)
        team.push(engineer);
        createTeam(team); 
    });
}

function createIntern(team) {
    inquirer.prompt([
        // Intern 
        {
            type: 'input',
            name: 'name',
            message: "What is the Intern's name?",
        },
        {
            type: 'input',
            name: 'id',
            message: "What is the Intern's id?",
        },
        {
            type: 'input',
            name: 'email',
            message: "What is the Intern's email?",
        },
        {
            type: 'input',
            name: 'school',
            message: "What is the Intern's school?",
        }
    ]).then((internDetails) => {
        const intern = new Intern(internDetails.name, internDetails.id, internDetails.email, internDetails.school)
         team.push(intern);
        createTeam(team); 
    });
}

function createTeam(team) {
    inquirer.prompt([
        {
            type: 'list',
            name: 'memberChoice',
            message: 'Which type of team member you want to add?',
            choices: [
                'Engineer',
                'Intern',
                "I don't want to add any more team members",
            ],
        }
    ]).then((choice) => {
        if (choice.memberChoice === 'Engineer') {
            createEngineer(team);
        } else if (choice.memberChoice === 'Intern') {
            createIntern(team);
        } else {
            
            const html = render(team); 
            
            fs.writeFile(outputPath, html, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }
    });
}

function createManager(team) {
    inquirer.prompt([
        
        {
            type: 'input',
            name: 'name',
            message: "What is the team manager's name?",
        },
        {
            type: 'input',
            name: 'id',
            message: "What is the manager's id?",
        },
        {
            type: 'input',
            name: 'email',
            message: "What is the manager's email?",
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: "What is the manager's office phone number?",
        }
    ]).then((managerDetails) => {
      
        const manager = new Manager(managerDetails.name, managerDetails.id, managerDetails.email, managerDetails.officeNumber)
        team.push(manager);
        createTeam(team); 
    });
}

function start() {
    const team = []; 
    createManager(team);
}

start();