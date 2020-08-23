const { emailValidator, numValidator, stringValidator } =  require('./regex')

const managerQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is your manager's name?",
    validate: stringValidator
  },
  {
    type: "input",
    name: "id",
    message: "What is your manager's id number?",
    validate: numValidator

  },
  {
    type: "input",
    name: "email",
    message: "What is your manager's email?",
    validate: emailValidator
  },
  {
    type: "input",
    name: "officeNumber",
    message: "What is your manager's office number?",
    validate: numValidator
  },
];

const engineerQuestions = [
  {
    type: "input",
    name: "name",
    message: "Engineer Name:",
    validate: stringValidator
  },
  {
    type: "input",
    name: "id",
    message: "Engineer id number:",
    validate: numValidator
  },
  {
    type: "input",
    name: "email",
    message: "Engineer email:",
    validate: emailValidator
  },
  {
    type: "input",
    name: "github",
    message: "Engineer Github username:",
    validate: function (value) {
        var pass = value.match(
            /^[\w_-]+$/i
        );
        if (pass) {
          return true;
        }
        return 'Please enter a valid username';
      },
  },
];

const internQuestions = [
  {
    type: "input",
    name: "name",
    message: "Intern Name:",
    validate: stringValidator
  },
  {
    type: "input",
    name: "id",
    message: "Intern id number:",
    validate: numValidator
  },
  {
    type: "input",
    name: "email",
    message: "Intern email:",
    validate: emailValidator
  },
  {
    type: "input",
    name: "school",
    message: "Intern school:",
    validate: stringValidator
  },
];

module.exports = { managerQuestions, engineerQuestions, internQuestions };
