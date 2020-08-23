const emailValidator = (value) => {
    var pass = value.match(
        /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/i
    );
    if (pass) {
      return true;
    }

    return 'Please enter a valid email';
  }

  const numValidator = (value) => {
    var pass = value.match(
        /^[\d]{1,5}$/i
    );
    if (pass) {
      return true;
    }

    return `Please enter a number between 1 and 99999`;
  }

  const stringValidator = (value) => {
    var pass = value.match(
        /^[\w\s]{2,20}$/i
    );
    if (pass) {
      return true;
    }

    return `Please enter a valid input`;
  }

module.exports = { emailValidator, numValidator, stringValidator }