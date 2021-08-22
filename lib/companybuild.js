const inquirer = require('inquirer');
const query = require('./query');
const cTable = require('console.table');

const choices = [
  'View all departments',
  'View all roles',
  'View all employees',
  'Add a department',
  'Add a role',
  'Add an employee',
  'Update an employee role',
  'Finish application',
];

const departQ = [
  "Enter name of the department: ",
];

const roleQ = [
  "Enter title of the role: ",
  "Enter salary of the role: ",
  "Enter department of the role: ",
];

const employQ = [
  "Enter first name: ",
  "Enter last name: ",
  "Enter role: ",
  "Enter current employee's manager: ",
];

const updateQ = [
  "Who's role would you like to update",
  "To what role whould you like to change"
];

class companyBuild {
  init(){
    inquirer
      .prompt([
        {
          type: "list",
          name: "choice",
          message: "What would you like to do?",
          choices: choices,
        },
      ])
      .then(val => {
        if(val.choice === choices[0]){
          query.viewDepartment();
          setTimeout(Again,100);
        }
        if(val.choice === choices[1]){
          query.viewRole();
          setTimeout(Again,100);
        }
        if(val.choice === choices[2]){
          query.viewEmployee();
          setTimeout(Again,100);
        }
        if(val.choice === choices[3]){
          this.addDe();
        }
        if(val.choice === choices[4]){
          this.addRo();
        }
        if(val.choice === choices[5]){
          this.addEm();
        }
        if(val.choice === choices[6]){
          query.getEmployeeNames()
            .then(function(results){
              chooseEm(results);
            })
            .catch(function(err){
              console.log("Promise rejection error: "+ err);
            });
        } 
        if(val.choice === choices[7]){
          this.finish();
        }
      })
  }
  addDe(){
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: departQ[0],
        },
      ])
      .then(data => {
        query.addDepartment(data);
        console.log("Department successfully added to database")
        this.init();
      });
  }

  addRo(){
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: roleQ[0],
        },
        {
          type: "input",
          name: "salary",
          message: roleQ[1],
        },
        {
          type: "input",
          name: "department",
          message: roleQ[2],
        },
      ])
      .then(data => {
        query.addRole(data);
        console.log('Role successfully added to database')
        this.init();
      });
  }

  addEm(){
    inquirer
      .prompt([
        {
          type: "input",
          name: "firstName",
          message: employQ[0],
        },
        {
          type: "input",
          name: "lastName",
          message: employQ[1],
        },
        {
          type: "input",
          name: "role",
          message: employQ[2],
        },
        {
          type: "input",
          name: "manager",
          message: employQ[3],
        },
      ])
      .then(data => {
        query.addEmployee(data);
        console.log("Employee successfully added to database")
        this.init();
      });
  }

  finish(){
    process.exit(0);
  };
}

function chooseEm(allEm){
  let list = [];
  for(i=0; i< allEm.length ; i++){
    list.push(allEm[i].first_name + " " + allEm[i].last_name);
  }
  inquirer
    .prompt([
      {
        type: "list",
        name: "Emlist",
        message: updateQ[0],
        choices: list,
      },
    ])
    .then(data => {
      upRole(data.Emlist);
    });
}

function upRole (name){
  inquirer
    .prompt([
      {
        type: "input",
        name: "role",
        message: updateQ[1],
      },
    ])
    .then(data => {
      query.upEmployee(name, data);
      console.log("Role successfully updated")
      Again();
    });
}

function Again(){
  const newInit =  new companyBuild();
  newInit.init();
}


module.exports = companyBuild;