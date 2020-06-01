
const inquirer = require ("inquirer");
const cTable = require('console.table');
const Department = require("./lib/departmentClass");
const Role = require("./lib/roleClass");
const Employee = require("./lib/employeeClass");
const dbFunctions = require("./dbFunctions.js");
const showBanner = require('node-banner');

dbFunctions.connect();

//show ascii banner - bonus
(async () => {
  await showBanner('Employee Tracker');
  start();
})();

async function start() {
  try{
    // Initialize Variables
    let rolesList = [];
    let rolesListTitles = [];
    let rolesListNames = [];
    let mngrsList = [];
    let mngrsListNames = [];
    let empsList = [];
    let empsListNames = [];
    let deptsList = [];
    let deptsListNames = [];
    let updateEmployeePrompt;
    let updatedEmp;
    let empView = [];
    let noManager;
    let noManagerItem;
    let roleView = [];

    const questions = await inquirer.prompt({
        type: "list",
        name: "userAction",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Employees By Department",
            "View All Employees By Manager",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Manager",
            "View All Roles",
            "Add Role",
            "Remove Role",
            "View All Departments",
            "Add Department",
            "Remove Department",
            "View Department Budget",
            "I don't want to do anything else."
        ]
      });

    switch (questions.userAction) {
      case "View All Employees":
        
        empView = await dbFunctions.viewEmps();
        
        console.table(empView.map(employeeView));
        
        break;

      case "View All Employees By Department":
        deptsList = await dbFunctions.viewDepts();
        deptsListNames = deptsList.map(departmentChoiceList);

        const chooseDeptPrompt = await inquirer.prompt(
        {
          type: "list",
          name: "chooseDepts",
          message: "What is the department you would like to see the employees for?",
          choices: deptsListNames
        });
        
        console.table(await dbFunctions.viewEmpsByDept(chooseDeptPrompt.chooseDepts));
        
        break;

      case "View All Employees By Manager":
        mngrsList = await dbFunctions.viewMngrs();
        mngrsListNames = mngrsList.map(employeeChoiceList);

        const viewEmpsByMngrPrompt = await inquirer.prompt(
        {
          type: "list",
          name: "viewEmpsByMngr",
          message: "Which manager would you like to view the employees for?",
          choices: mngrsListNames
        });

        console.table(await dbFunctions.viewEmpsByMngr(viewEmpsByMngrPrompt.viewEmpsByMngr.getId()));

        break;

      case "Add Employee":

        rolesList = await dbFunctions.viewRoles();
        rolesListTitles = rolesList.map(roleChoiceList);

        mngrsList = await dbFunctions.viewMngrs();
        mngrsListNames = mngrsList.map(employeeChoiceList);

        noManager = new Employee(0, '', '', 0, '', 0, '', 0, '', '');
        noManagerItem = { name: "No Manager", value: noManager};
        mngrsListNames.push(noManagerItem);

        const addEmployeePrompt = await inquirer.prompt([
          {
            type: "input",
            name: "newEmpFirstName",
            message: "What is the employee's first name?",
            validate: stringValidator
          },
          {
            type: "input",
            name: "newEmpLastName",
            message: "What is the employee's last name?",
            validate: stringValidator
          },
          {
            type: "list",
            name: "newEmpRole",
            message: "What is the employee's role?",
            choices: rolesListTitles
          },
          {
            type: "list",
            name: "newEmpMngr",
            message: "Who is the employee's manager?",
            choices: mngrsListNames
          }
        ]);

        const empToAdd = new Employee(0, addEmployeePrompt.newEmpFirstName, addEmployeePrompt.newEmpLastName, addEmployeePrompt.newEmpRole, '', 0, '', addEmployeePrompt.newEmpMngr.getId(), '', '');
        
        empView = await dbFunctions.addEmp(empToAdd);
        
        console.table(empView.map(employeeView));
        
        break;

      case "Remove Employee":
        empsList = await dbFunctions.viewEmps();
        empsListNames = empsList.map(employeeChoiceList);

        const removeEmployeePrompt = await inquirer.prompt(
        {
          type: "list",
          name: "removeEmps",
          message: "Who is the employee to remove?",
          choices: empsListNames
        });

        empView = await dbFunctions.removeEmp(removeEmployeePrompt.removeEmps.getId());
        
        console.table(empView.map(employeeView));

        break;

      case "Update Employee Role":
        empsList = await dbFunctions.viewEmps();
        empsListNames = empsList.map(employeeChoiceList);
        
        rolesList = await dbFunctions.viewRoles();
        rolesListNames = rolesList.map(roleChoiceList);

        updateEmployeePrompt = await inquirer.prompt(
        {
          type: "list",
          name: "updateEmp",
          message: "Who is the employee to update?",
          choices: empsListNames
        });

        console.table(await dbFunctions.empDetails(updateEmployeePrompt.updateEmp.getId()));

        const updateRolePrompt = await inquirer.prompt(
        {
          type: "list",
          name: "updateEmpRole",
          message: "Which role would you like to update the employee to?",
          choices: rolesListNames
        });
        
        updatedEmp = new Employee(updateEmployeePrompt.updateEmp.getId(), updateEmployeePrompt.updateEmp.getFirstName(), updateEmployeePrompt.updateEmp.getLastName(), updateRolePrompt.updateEmpRole, '', 0, '', updateEmployeePrompt.updateEmp.getManagerId(), '', '');

        await dbFunctions.updateEmp(updatedEmp);

        console.table(await dbFunctions.empDetails(updateEmployeePrompt.updateEmp.getId()));

        break;

      case "Update Employee Manager":
        empsList = await dbFunctions.viewEmps();
        empsListNames = empsList.map(employeeChoiceList);
        mngrsList = await dbFunctions.viewMngrs();
        mngrsListNames = mngrsList.map(employeeChoiceList);

        noManager = new Employee(0, '', '', 0, '', 0, '', 0, '', '');
        noManagerItem = { name: "No Manager", value: noManager};
        mngrsListNames.push(noManagerItem);

        updateEmployeePrompt = await inquirer.prompt(
        {
          type: "list",
          name: "updateEmp",
          message: "Who is the employee to update?",
          choices: empsListNames
        });

        console.table(await dbFunctions.empDetails(updateEmployeePrompt.updateEmp.getId()));

        const updateMngrPrompt = await inquirer.prompt(
        {
          type: "list",
          name: "updateMngr",
          message: "Which manager would you like to update the employee to?",
          choices: mngrsListNames
        });

        updatedEmp = new Employee(updateEmployeePrompt.updateEmp.getId(), updateEmployeePrompt.updateEmp.getFirstName(), updateEmployeePrompt.updateEmp.getLastName(), updateEmployeePrompt.updateEmp.getRoleId(), '', 0, '', updateMngrPrompt.updateMngr.getId(), '', '');

        await dbFunctions.updateEmp(updatedEmp);

        console.table(await dbFunctions.empDetails(updateEmployeePrompt.updateEmp.getId()));

        break;

      case "View All Roles":
        
        roleView = await dbFunctions.viewRoles();
        
        console.table(roleView.map(rolesView));
        
        break;

      case "Add Role":
        deptsList = await dbFunctions.viewDepts();
        deptsListNames = deptsList.map(departmentChoiceList);

        const addRolePrompt = await inquirer.prompt([
          {
            type: "input",
            name: "newRoleTitle",
            message: "What is the title of the role?",
            validate: stringValidator
          },
          {
            type: "input",
            name: "newRoleSalary",
            message: "What is the salary of the role?",
            validate: numberValidator
          },
          {
            type: "list",
            name: "newRoleDept",
            message: "To which department does the role belong?",
            choices: deptsListNames
          }
        ]);
        
        const roleToAdd = new Role(0, addRolePrompt.newRoleTitle, addRolePrompt.newRoleSalary, addRolePrompt.newRoleDept, '');
        
        roleView = await dbFunctions.addRole(roleToAdd);
        
        console.table(roleView.map(rolesView));

        break;

      case "Remove Role":
        rolesList = await dbFunctions.viewRoles();
        rolesListTitles = rolesList.map(roleChoiceList);

        const removeRolesPrompt = await inquirer.prompt(
        {
          type: "list",
          name: "removeRoles",
          message: "What is the role to remove?",
          choices: rolesListTitles
        });

        roleView = await dbFunctions.removeRole(removeRolesPrompt.removeRoles);
        
        console.table(roleView.map(rolesView));

        break;

      case "View All Departments":
        
        console.table(await dbFunctions.viewDepts());
        
        break;

      case "Add Department":
        const addDeptPrompt = await inquirer.prompt({
          type: "input",
          name: "newDeptName",
          message: "What is the name of the department?",
          validate: stringValidator
        });
        
        const deptToAdd = new Department(0, addDeptPrompt.newDeptName);
        
        console.table(await dbFunctions.addDept(deptToAdd));

        break;

      case "Remove Department":
        deptsList = await dbFunctions.viewDepts();
        deptsListNames = deptsList.map(departmentChoiceList);

        const removeDepartmentPrompt = await inquirer.prompt(
        {
          type: "list",
          name: "removeDepts",
          message: "What is the department to remove?",
          choices: deptsListNames
        });
        console.table(await dbFunctions.removeDept(removeDepartmentPrompt.removeDepts));

        break;

      case "View Department Budget":
        deptsList = await dbFunctions.viewDepts();
        deptsListNames = deptsList.map(departmentChoiceList);

        const viewDeptBudgetPrompt = await inquirer.prompt(
        {
          type: "list",
          name: "DeptBudget",
          message: "What is the department to view budget?",
          choices: deptsListNames
        });

        console.table(await dbFunctions.getDeptBudget(viewDeptBudgetPrompt.DeptBudget));

        break;

      default:
        dbFunctions.disconnect();
        return;

    }
    
    start();

   }catch (err) {
    console.log(err);
  }
}

  function stringValidator(stringInput){
    if(/^\W+$/.test(stringInput) || !isNaN(stringInput)){
        return "Your input must be a string.";
    }
    else{
        return true;
    }
}

  function numberValidator(numberInput){
    if(isNaN(numberInput) == true){
        return "Your input must be a number.";
    }
    else{
        return true;
    }
  }

  function roleChoiceList(item) {
    let choice = {name: item.getTitle(), value: item.getId()};
    return choice;
  }

  function employeeChoiceList(item) {
    let choice = {name: item.getFullName(), value: item};
    return choice;
  }

  function departmentChoiceList(item) {
    return {name: item.getName(), value: item.getId()};
  }

  function employeeView(item) {
    return {first_name: item.getFirstName(), last_name: item.getLastName(), title: item.getTitle(), salary: item.getSalary(), department: item.getDeptName(), manager_first_name: item.getMngrFirstName(), manager_last_name: item.getMngrLastName()};
  }

  function rolesView(item) {
    return {title: item.getTitle(), salary: item.getSalary(), department: item.getDeptName()};
  }