const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const { managerQuestions, engineerQuestions, internQuestions } = require('./questions.js')


const employees = [];


function askManager() {
  return new Promise((resolve, reject) => {
    inquirer
      .prompt(managerQuestions)
      .then(function (answers) {
        const manager = new Manager(
          answers.name,
          answers.id,
          answers.email,
          answers.officeNumber
        );
        resolve(employees.push(manager));
      })
      .catch(error => {
        if(error.isTtyError) {
          reject("Prompt couldn't be rendered in the current environment")
        } else {
          reject(error)
        }
      });
  });
}

function addEngineer() {
    inquirer
    .prompt(engineerQuestions)
    .then(function (answers) {
        const engineer = new Engineer(
            answers.name,
            answers.id,
            answers.email,
            answers.github
        );
        employees.push(engineer)
        addEmployees();
    })
    .catch(error => {
        console.log(error)
      });
}

function addIntern() {
    inquirer
    .prompt(internQuestions)
    .then(function (answers) {
        const intern = new Intern(
            answers.name,
            answers.id,
            answers.email,
            answers.school
        );
        employees.push(intern)
        addEmployees();
    })
    .catch(error => {
        console.log(error)
      });

}

function addEmployees() {
  inquirer
    .prompt({
      type: "list",
      name: "addMember",
      message: "Which type of team member would you like to add?",
      choices: ["Engineer", "Intern", "I am finished"]
    })
    .then(function (answers) {
      if (answers.addMember === "Engineer") {
        // run egineer prompt
        addEngineer();
      } else if (answers.addMember === "Intern") {
        // run intern prompt
        addIntern();
      } else {
        // complete and render
        const html = render(employees);
        createHTML(outputPath, html);
      }
    })
    .catch(error => {
      if(error.isTtyError) {
        console.log("Prompt couldn't be rendered in the current environment")
      } else {
        console.log("Something went wrong adding employees\n" + error )
      }
    });
}

function createHTML(fileName, data) {
    fs.writeFile(fileName, data, "utf8", function (err) {
        if (err) {
            throw err;
        }
        console.log("Success! You team site has been created.");
    });
  };

async function main() {
  await askManager();
  addEmployees();
}

main();



