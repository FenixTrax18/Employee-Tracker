const MySQL = require ("mysql");
const Department = require("./lib/departmentClass");
const Role = require("./lib/roleClass");
const Employee = require("./lib/employeeClass");

// create the connection information for the sql database
var connection = MySQL.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "MySQL_P@ssw0rd",
    database: "employees_db"
});
  
function connect() {
  // connect to the mysql server and sql database
  connection.connect(function(err) {
    if (err) throw err;
  });
}

//Role Functions
function addRole(roleToAdd){
    return new Promise(function(resolve, reject) {
        connection.query("INSERT INTO roles (title, salary, department_id) VALUES ('" + roleToAdd.getTitle() + "', " + roleToAdd.getSalary() + ", " + roleToAdd.getDeptId() + ");", function(err, res) {
            if (err) throw err;
            resolve(viewRoles());
        });
    });
}

function viewRoles(){
    return new Promise(function(resolve, reject) {
        connection.query("SELECT r.id, r.title, r.salary, r.department_id, d.name as dept_name FROM roles r JOIN departments d on r.department_id = d.id", function(err, res) {
            if (err) throw err;
            let rolesArr = [];
            //loop thru each roles row, build each role object with role constructor & push each constructed obj into rolesArr
            for (let i = 0; i < res.length; i++) {
                let newRole = new Role(res[i].id, res[i].title, res[i].salary, res[i].department_id, res[i].dept_name);
                rolesArr.push(newRole);
            }
            resolve(rolesArr);
        });
    });
}

function updateRole(roleToUpdate){
    return new Promise(function(resolve, reject) {
        connection.query("UPDATE SET title = '" + roleToUpdate.getTitle() + "', salary = " + roleToUpdate.getSalary() + ", department_id = " + roleToUpdate.getDeptId() + " FROM roles WHERE id = " + roleToUpdate.getId(), function(err, res) {
            if (err) throw err;
            resolve(viewRoles());
        });
    });
}

function removeRole(roleIdToRemove){
    return new Promise(function(resolve, reject) {
        connection.query("DELETE FROM roles WHERE id = " + roleIdToRemove, function(err, res) {
            if (err) throw err;
            resolve(viewRoles());
        });
    });
}

//Department Functions
function addDept(deptToAdd){
    return new Promise(function(resolve, reject) {
        connection.query("INSERT INTO departments (name) VALUES ('" + deptToAdd.getName() + "');", function(err, res) {
            if (err) throw err;
            resolve(viewDepts());
        });
    });
}

function viewDepts(){
    return new Promise(function(resolve, reject) {
        connection.query("SELECT * FROM departments", function(err, res) {
            if (err) throw err;
            let deptsArr = [];
            //loop thru each departments row, build each department object with department constructor & push each constructed obj into deptsArr
            for (let i = 0; i < res.length; i++) {
                let newDept = new Department(res[i].id, res[i].name);
                deptsArr.push(newDept);
            }
            resolve(deptsArr);
        });
    });
}

function updateDept(deptToUpdate){
    return new Promise(function(resolve, reject) {
        connection.query("UPDATE SET name = '" + deptToUpdate.getName() + "' FROM departments WHERE id = " + deptToUpdate.getId(), function(err, res) {
            if (err) throw err;
            resolve(viewDepts());
        });
    });
}

function removeDept(deptIdToRemove){
    return new Promise(function(resolve, reject) {
        connection.query("DELETE FROM departments WHERE id = " + deptIdToRemove, function(err, res) {
            if (err) throw err;
            resolve(viewDepts());
        });
    });
}

//Employee Functions
function addEmp(empToAdd){
    return new Promise(function(resolve, reject) {
        if(empToAdd.getManagerId() > 0){
            connection.query("INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('" + empToAdd.getFirstName() + "', '" + empToAdd.getLastName() + "', " + empToAdd.getRoleId() + ", " + empToAdd.getManagerId() + ");", function(err, res) {
                if (err) throw err;
                resolve(viewEmps());
            });
        }
        else{
            connection.query("INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('" + empToAdd.getFirstName() + "', '" + empToAdd.getLastName() + "', " + empToAdd.getRoleId() + ", " + "NULL" + ");", function(err, res) {
                if (err) throw err;
                resolve(viewEmps());
            });
        }
    });
}

function viewEmps(){
    return new Promise(function(resolve, reject) {
        connection.query("SELECT e.id, e.first_name, e.last_name, e.role_id, e.manager_id, r.title, r.salary, d.name as dept_name, m.first_name as manager_first_name, m.last_name as manager_last_name FROM employees e JOIN roles r on e.role_id = r.id JOIN departments d on r.department_id = d.id Left JOIN employees m on e.manager_id = m.id", function(err, res) {
        if (err) throw err;
        let empsArr = [];
        //loop thru each employees row, build each employee object with employee constructor & push each constructed obj into empsArr
        for (let i = 0; i < res.length; i++) {
            let newEmp = new Employee(res[i].id, res[i].first_name, res[i].last_name, res[i].role_id, res[i].title, res[i].salary, res[i].dept_name, res[i].manager_id, res[i].manager_first_name, res[i].manager_last_name);
            empsArr.push(newEmp);
        }
        resolve(empsArr);
      });
    });
}

function viewEmpsByDept(deptId){
    return new Promise(function(resolve, reject) {
        connection.query("SELECT e.first_name, e.last_name, r.title, d.name as department_name, m.first_name as manager_first_name, m.last_name as manager_last_name FROM employees e JOIN roles r on e.role_id = r.id JOIN departments d on r.department_id = d.id JOIN employees m on e.manager_id = m.id WHERE d.id = " + deptId, function(err, res) {
        if (err) throw err;
        resolve(res);
      });
    });
}

function viewEmpsByMngr(mngrId){
    return new Promise(function(resolve, reject) {
        connection.query("SELECT e.first_name, e.last_name, r.title, d.name as department_name, m.first_name as manager_first_name, m.last_name as manager_last_name FROM employees e JOIN roles r on e.role_id = r.id JOIN departments d on r.department_id = d.id JOIN employees m on e.manager_id = m.id WHERE m.id = " + mngrId, function(err, res) {
        if (err) throw err;
        resolve(res);
      });
    });
}

function updateEmp(empToUpdate){
    return new Promise(function(resolve, reject) {
        if(empToUpdate.getManagerId() > 0){
            connection.query("UPDATE employees SET role_id = " + empToUpdate.getRoleId() + ", manager_id = " + empToUpdate.getManagerId() + " WHERE id = " + empToUpdate.getId(), function(err, res) {
                if (err) throw err;
                resolve(viewEmps());
            });
        }
        else{
            connection.query("UPDATE employees SET role_id = " + empToUpdate.getRoleId() + ", manager_id = " + "NULL" + " WHERE id = " + empToUpdate.getId(), function(err, res) {
                if (err) throw err;
                resolve(viewEmps());
            });
        }
    });
}

function removeEmp(empIdToRemove){
    return new Promise(function(resolve, reject) {
        connection.query("DELETE FROM employees WHERE id = " + empIdToRemove, function(err, res) {
            if (err) throw err;
            resolve(viewEmps());
        });
    });
}

function viewMngrs(){
    return new Promise(function(resolve, reject) {
        connection.query("SELECT e.id, e.first_name, e.last_name, e.role_id, e.manager_id, r.title, r.salary, d.name as dept_name, m.first_name as manager_first_name, m.last_name as manager_last_name FROM employees e JOIN roles r on e.role_id = r.id JOIN departments d on r.department_id = d.id Left JOIN employees m on e.manager_id = m.id WHERE e.manager_id is NULL", function(err, res) {
            if (err) throw err;
            let empsArr = [];
            //loop thru each employees row with manager_id is NULL, build each employee object with employee constructor & push each constructed obj into empsArr
            for (let i = 0; i < res.length; i++) {
                let newEmp = new Employee(res[i].id, res[i].first_name, res[i].last_name, res[i].role_id, res[i].title, res[i].salary, res[i].dept_name, res[i].manager_id, res[i].manager_first_name, res[i].manager_last_name);

                empsArr.push(newEmp);
            }
            resolve(empsArr);
        });
    });
}

//TODO: Helper Functions
function empDetails(empId){
    return new Promise(function(resolve, reject) {
        connection.query("SELECT e.first_name, e.last_name, r.title, r.salary, d.name as department_name, m.first_name as manager_first_name, m.last_name as manager_last_name FROM employees e JOIN roles r on e.role_id = r.id JOIN departments d on r.department_id = d.id JOIN employees m on e.manager_id = m.id WHERE e.id = " + empId, function(err, res) {
            if (err) throw err;
            resolve(res);
      });
    });
}

function getDeptBudget(dept){
    return new Promise(function(resolve, reject) {
        connection.query("SELECT d.name as department_name, SUM(r.salary) as total_dept_salary FROM departments d JOIN roles r on r.department_id = d.id JOIN employees e on e.role_id = r.id WHERE d.id = " + dept + " GROUP BY d.name", function(err, res) {
            if (err) throw err;
            resolve(res);
      });
    });
}

//close connection
function disconnect(){
    connection.end();
}

module.exports = {connect, addRole, viewRoles, updateRole, removeRole, addDept, viewDepts, updateDept, removeDept, addEmp, viewEmps, viewEmpsByDept, viewEmpsByMngr, updateEmp, removeEmp, viewMngrs, empDetails, getDeptBudget, disconnect};

