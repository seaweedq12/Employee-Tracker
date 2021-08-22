INSERT INTO department (name)
VALUES ('Sales'),
       ('Engineering'),
       ('Finance'),
       ('Legal');

INSERT INTO role (title, salary ,department_id)
VALUES ('Salesperson', 80000, 1),
       ('Lead Engineer', 150000, 2),
       ('Software Engineer', 120000, 2),
       ('Account Manager', 160000, 3),
       ('Accountant', 125000, 3),
       ('Legal Team Lead', 250000, 4),
       ('Lawyer', 190000, 4);

INSERT INTO employee (first_name, last_name ,role_id, manager_id)
VALUES ('James', 'Lee', 1, NULL),
       ('Bob', 'Holmes', 2, NULL),
       ('David', 'Reed', 3, 2),
       ('Sam', 'Hunt', 4, NULL),
       ('Mary', 'Nelson', 5, 4),
       ('Greg', 'Duncan', 6, NULL),
       ('Jane', 'Hanson', 7, 6);




/*
SELECT * FROM department;

SELECT role.id, title AS 'job title', 
       department.name AS departments, 
       salary AS salaries  
FROM role
JOIN department ON role.department_id = department.id;

SELECT employee.id,
       first_name AS 'first name', 
       last_name AS 'last name', 
       role.title AS 'job title' , 
       department.name AS departments, 
       salary AS salaries,
       (SELECT CONCAT(E1.first_name," ",E1.last_name) FROM employee E1 WHERE E1.id = employee.manager_id ) AS Manager
FROM employee
JOIN role ON employee.role_id = role.id
JOIN department ON role.department_id = department.id;
*/


       