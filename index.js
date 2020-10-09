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
      name: "repo",
      message: "What is the name of your repo?"
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
      name: "installation",
      message: "Please describe how to install your project:"
    },
    {
      type: "input",
      name: "usage",
      message: "Describe how to use this site: "
    },
    {
      type: "input",
      name: "name",
      message: "What is your name? "
    },
    {
      type: "input",
      name: "linkedin",
      message: "What is the link to your linkedin profile? "
    },
    {
      type: "input",
      name: "username",
      message: "What is your git hub username? "
    },
    {
      type: "input",
      name: "credits",
      message: "Is there anyone you would like to thank? "
    },
    {
      type: "list",
      name: "license",
      choices: ['GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'Boost Software License 1.0', 'The Unlicense'],
      message: "What licence would you prefer?"
    }])
  // .then(function({ username }) {
  //   const queryUrl = `https://api.github.com/users/${answers.username}/${answers.repo}`;

  //   axios.get(queryUrl).then(function(res) {
  //     const repoNames = res.data.map(function(repo) {
  //       return repo.name;
  //     });
      
  //     const repoNames = [];
  //     for (var i = 0; i < res.data.length; i++) {
  //       repoNames.push(res.data[i].name);
  //     }

  //     const repoNamesStr = repoNames.join("\n");

  //     fs.writeFile("repos.txt", repoNamesStr, function(err) {
  //       if (err) {
  //         throw err;
  //       }

  //       console.log(`Saved ${repoNames.length} repos`);
  //     });
  //   });
  
  
  
  // });
}

function generateReadMe(answers) {
  return ` 
# ${answers.Title}
### ${answers.description}
## Table of Contents
  * [Technologies Used](#Technologies_Used)
  * [Deployed Site](#Deployed)
  * [Installation](#installation)
  * [Usage](#Usage)
  * [Author](#Author)
  * [Credits](#Credits)
  * [License](#License)
  
## Technologies_Used
  ${answers.techs}
## Deployed Site
[${answers.Title}](#${answers.deployedSite})

## Installation
${answers.installation}
## Usage
${answers.usage}

## Author
${answers.name}: 

* [linkedin] (${answers.linkedin}) 

* [github] (https://github.com/${answers.username}/)
## Credits
${answers.credits}
## Licence

${answers.licence}
`;
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
