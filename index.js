const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
//const generateHTML = require('./src/generateHTML');

const teamArray = [];

const addManager = () => {
  inquirer
    .prompt([
      {
        type: "text",
        name: "name",
        message: "What is the team manager name?",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("You need to enter the manager name!");
            return false;
          }
        },
      },
      {
        type: "text",
        name: "id",
        message: "What is the team manager ID?",
        validate: (idInput) => {
          if (!isNaN(idInput)) {
            return true;
          } else {
            console.log("You need to enter the manager ID!");
            return false;
          }
        },
      },
      {
        type: "text",
        name: "email",
        message: "What is the team manager email?",
        validate: (emailInput) => {
          if (
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput)
          ) {
            return true;
          } else {
            console.log("You need to enter the manager email!");
            return false;
          }
        },
      },
      {
        type: "text",
        name: "officeNumber",
        message: "What is the team manager's office number?",
        validate: (officeNumberInput) => {
          if (!isNaN(officeNumberInput)) {
            return true;
          } else {
            console.log("You need to enter the manager's office number!");
            return false;
          }
        },
      },
    ])
    .then((managerInput) => {
      const { name, id, email, officeNumber } = managerInput;
      const manager = new Manager(name, id, email, officeNumber);
      teamArray.push(manager);
      choseRole();
    });
};
addManager();


const addEngineer = () => {
  inquirer.prompt ([
    {
      type: "text",
      name: "name",
      message: "What is the engineer name?",
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log("You need to enter the engineer name!");
          return false;
        }
      },
    },
    {
      type: "text",
      name: "id",
      message: "What is the engineer ID?",
      validate: (idInput) => {
        if (!isNaN(idInput)) {
          return true;
        } else {
          console.log("You need to enter engineer ID!");
          return false;
        }
      },
    },
    {
      type: "text",
      name: "email",
      message: "What is the engineer email?",
      validate: (emailInput) => {
        if (
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput)
        ) {
          return true;
        } else {
          console.log("You need to enter the engineer email!");
          return false;
        }
      },
    },
    {
      type: "text",
      name: "github",
      message: "What is the engineer github username?",
      validate: (githubInput) => {
        if (githubInput) {
          return true;
        } else {
          console.log("You need to enter the engineer's github username!");
          return false;
        }
      },
    },
  ])
  .then((engineerInput) => {
    const { name, id, email, github } = engineerInput;
    const engineer = new Engineer(name, id, email, github);
    teamArray.push(engineer);
    addAnotherMember();
  });
};

const addIntern = () => {
  inquirer.prompt ([
    {
      type: "text",
      name: "name",
      message: "What is the intern name?",
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log("You need to enter the intern name!");
          return false;
        }
      },
    },
    {
      type: "text",
      name: "id",
      message: "What is the intern ID?",
      validate: (idInput) => {
        if (!isNaN(idInput)) {
          return true;
        } else {
          console.log("You need to enter intern ID!");
          return false;
        }
      },
    },
    {
      type: "text",
      name: "email",
      message: "What is the intern email?",
      validate: (emailInput) => {
        if (
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput)
        ) {
          return true;
        } else {
          console.log("You need to enter the intern email!");
          return false;
        }
      },
    },
    {
      type: "text",
      name: "school",
      message: "What is the intern school name?",
      validate: (schoolInput) => {
        if (schoolInput) {
          return true;
        } else {
          console.log("You need to enter the intern's school name!");
          return false;
        }
      },
    },
  ])
  .then((internInput) => {
    const { name, id, email, school } = internInput;
    const intern = new Intern(name, id, email, school);
    teamArray.push(intern);
    addAnotherMember();
  });
};

const choseRole = () => {
  return inquirer
    .prompt({
      type: "list",
      name: "member",
      message: "Who would you like to add?",
      choices: ["Engineer", "Intern"],
    })
    .then(({ member }) => {
      if (member === "Engineer") {
        addEngineer();
      } else if (member === "Intern") {
        addIntern();
      }
    });
};

const addAnotherMember = () => {
  inquirer.prompt (
    {
      type: 'confirm',
      name: 'confirmationData',
      message: 'Would you like to enter another team member?',
      default: false
    }
  ).then ((response) => {
    if (response.confirmationData) {
      choseRole();
    } else {
      generateTeam();
    }
  })
}

const generateTeam = () => {
  writeFile(teamArray);
};

// function to generate HTML page file using file system 
const writeFile = data => {
    fs.writeFile('./dist/index.html', data, err => {
        // if there is an error 
        if (err) {
            console.log(err);
            return;
        // when the profile has been created 
        } else {
            console.log("Your team profile has been successfully created! Please check out the index.html")
        }
    })
};

