const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

//Write your app here
const { managerQuestions, teamMemberQuestion, engineerQuestions, internQuestions} = require('./src/questions');
const renderHTML = require('./src/renderHTML');

const teamObj = [];

(() => inquirer.prompt(managerQuestions)
            .then((answers) => {
                const teamManager = new Manager(answers.manager_name, answers.manager_id, answers.manager_email, answers.manager_office);
                teamObj.push(teamManager);
                renderEmployee(answers);
            })
)();

const renderEmployee = (answers) => {
    inquirer
        .prompt(teamMemberQuestion)
            .then((answers) => {
                if (teamObj) {
                    switch(answers.member_type) {
                        case 'Engineer':
                            renderEngineer(answers);
                            break;
                        case 'Intern':
                            renderIntern(answers);
                            break;
                        case 'My Team is complete for now':
                            renderHTML(teamObj);
                    }
                }    
        })
};
const renderEngineer = (answers) => {
    inquirer
        .prompt(engineerQuestions)
            .then((answers) => {
                const newEngineer = new Engineer(answers.engineer_name, answers.engineer_id, answers.engineer_email, answers.engineer_github);
                teamObj.push(newEngineer);
                renderEmployee(answers);
            });
};

const renderIntern = (answers) => {
    inquirer
        .prompt(internQuestions)
            .then((answers) => {
                const newIntern = new Intern(answers.intern_name, answers.intern_id, answers.intern_email, answers.intern_school);
                teamObj.push(newIntern);
                renderEmployee(answers);
            });
};