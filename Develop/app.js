const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,

const employees = [];

const managerQuestions = [
  // what is your manager's name?
  {
    type: "input",
    name: "name",
    message: "What is your manager's name?",
  },

  // what is your manager's id?
  {
    type: "input",
    name: "id",
    message: "What is your manager's id?",
  },
  // what is your manager's email?
  {
    type: "input",
    name: "email",
    message: "What is your manager's email?",
  },

  // what is your manager's office number?
  {
    type: "input",
    name: "officeNumber",
    message: "What is your manager's office number?",
  },
];

const engineerQuestions = [
    // what is your manager's name?
    {
      type: "input",
      name: "name",
      message: "Engineer Name:",
    },
  
    // what is your manager's id?
    {
      type: "input",
      name: "id",
      message: "Engineer id:",
    },
    // what is your manager's email?
    {
      type: "input",
      name: "email",
      message: "Engineer email:",
    },
  
    // what is your manager's office number?
    {
      type: "input",
      name: "github",
      message: "Engineer Github username:",
    },
];

const internQuestions = [
    {
        type: "input",
        name: "name",
        message: "Intern Name:",
      },
      {
        type: "input",
        name: "id",
        message: "Intern id:",
      },
      {
        type: "input",
        name: "email",
        message: "Intern email:",
      },
      {
          type: "input",
          name: "school",
          message: "Intern school:"
      }
];

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
  return new Promise((resolve, reject) => {
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
        //   complete and render
          const html = render(employees);
        createHTML(outputPath, html)
          resolve("done");
        }
      })
      .catch(error => {
        if(error.isTtyError) {
          reject("Prompt couldn't be rendered in the current environment")
        } else {
          reject("Something went wrong adding employees\n" + error )
        }
      });
  });
}

function createHTML(fileName, data) {
    fs.writeFile(fileName, data, "utf8", function (err) {
        if (err) {
            throw err;
        }
        console.log("Success!");
    });
  };

async function main() {
  await askManager();
  await addEmployees();
  const html = render(employees);
  createHTML("team.html", html)
 
}

main();



// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
