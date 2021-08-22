const mysql = require('mysql2');
const cTable = require('console.table');

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);



const viewDepartment = () => {
  const sql = 'SELECT * from department'
  db.query(sql, (err, result) => {
    if (err) {
      return console.log(err)
    }
    console.table(result);
  });
}
  


const viewRole = () => {
  const sql = 'SELECT role.id, title AS "job title", department.name AS departments, salary AS salaries FROM role JOIN department ON role.department_id = department.id';
  db.query(sql, (err, result) => {
    if (err) {
      return console.log(err)
    }
    console.table(result);
  });
  return true;
}

const viewEmployee = () => {
  const sql = 'SELECT employee.id, first_name AS "first name", last_name AS "last name", role.title AS "job title", department.name AS departments, salary AS salaries, (SELECT CONCAT(E1.first_name," ",E1.last_name) FROM employee E1 WHERE E1.id = employee.manager_id ) AS manager FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id'
  db.query(sql, (err, result) => {
    if (err) {
      return console.log(err)
    }
    console.log('\n');
    console.table(result);
  });

}

const addDepartment = (data) => {
  const sql = 'INSERT INTO department (name) VALUES (?)';      
  const param = data.name;
  db.query(sql, param, (err, result) => {
    if (err) {
      return console.log(err)
    }
  });
}

const addRole = (data) => {
  const sql = `INSERT INTO role (title, salary ,department_id) VALUES ('${data.title}', ${data.salary}, (SELECT id FROM department WHERE name = '${data.department}'))`
  db.query(sql, (err, result) => {
    if (err) {
      return console.log(err)
    }
  });
}

const addEmployee = (data) => {
  const sql = `INSERT INTO employee (first_name, last_name ,role_id, manager_id) VALUES ('${data.firstName}','${data.lastName}',(SELECT id FROM role WHERE title = '${data.role}'), (SELECT id FROM employee E1 WHERE E1.first_name = '${data.manager}'))`
  db.query(sql, (err, result) => {
    if (err) {
      return console.log(err)
    }
  });
}

const getEmployeeNames =  () => {
  return new Promise(function(resolve, reject){
    db.query(
        "SELECT first_name, last_name FROM employee", 
        function(err, rows){                                                
            if(rows === undefined){
                reject(new Error("Error rows is undefined"));
            }else{
                resolve(rows);
            }
        }
    )}   
  )
}

const upEmployee = (name,data) => {
  const splitname = name.split(" ")
  const firstName = splitname[0]
  const sql = `UPDATE employee SET role_id = (SELECT id FROM role WHERE title = '${data.role}') where first_name = '${firstName}'`
  db.query(sql, (err, result) => {
    if (err) {
      return console.log(err)
    }
  });

}

module.exports = {
  viewDepartment,
  viewRole,
  viewEmployee,
  addDepartment,
  addRole,
  addEmployee,
  getEmployeeNames,
  upEmployee,
};
