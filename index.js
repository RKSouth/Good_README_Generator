const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "Title",
      message: "What is your project Title?"
    },
    {
      type: "input",
      name: "description",
      message: "Please enter a brief description of your project: "
    },
    {
      type: "input",
      name: "techs",
      message: "What technologies did you use to make this project?"
    },
    {
      type: "input",
      name: "deployedSite",
      message: "What is the link for your deployed site?"
    },
    {
      type: "input",
      name: "features",
      message: "list the features of your project"
    },
    {
      type: "input",
      name: "linkedin",
      message: "Enter your LinkedIn URL."
    }
  ]);
}

function generateReadMe(answers) {
  return ` 
# ${answers.Title}
### ${answers.description}
## Table of Contents
  * [Technologies Used](Technologies_Used)
  * [Deployed Site](Deployed)
  * [Features](Features)
  * [Usage](Usage)
  * [Author](Author)
  * [Credits](Credits)
  * [License](License)
  
## Technologies_Used
    ${answers.techs}
## Deployed Site
[${answers.Title}](${answers.deployedSite})

## Features
    ${answers.features}
       ${answers.linkedin}`;
}

async function init() {
  try {
    const answers = await promptUser();

    const html = generateReadMe(answers);

    await writeFileAsync("README.md",html);

    console.log("Successfully wrote to README.md");
  } catch(err) {
    console.log(err);
  }
}

init();
