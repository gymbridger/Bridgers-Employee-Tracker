const inquirer = require("inquirer");
const {
  initializeConnection,
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
} = require("./db");

async function start() {
  const mainMenuQuestion = {
    type: "list",
    name: "action",
    message: "What would you like to do?",
    choices: [
      "View All Employees",
      "Add Employee",
      "Update Employee Role",
      "View All Roles",
      "Add Role",
      "View All Departments",
      "Add Department",
      "Quit",
    ],
  };

  const { action } = await inquirer.prompt(mainMenuQuestion);

  switch (action) {
    case "View All Employees":
      await viewAllEmployees();
      break;

    case "Add Employee":
      const employeeQuestions = [
        {
          type: "input",
          name: "firstName",
          message: "What is the employee's first name?",
        },
        {
          type: "input",
          name: "lastName",
          message: "What is the employee's last name?",
        },
        {
          type: "input",
          name: "roleId",
          message: "What is the employee's role ID?",
        },
        {
          type: "input",
          name: "managerId",
          message: "What is the employee's manager ID?",
        },
      ];
      const employeeDetails = await inquirer.prompt(employeeQuestions);

      await addEmployee(
        employeeDetails.firstName,
        employeeDetails.lastName,
        employeeDetails.roleId,
        employeeDetails.managerId
      );
      console.log("Added employee to the database");
      break;

    case "Update Employee Role":
      const updateQuestions = [
        {
          type: "input",
          name: "employeeId",
          message: "Which employee's role do you want to update (provide ID)?",
        },
        {
          type: "input",
          name: "newRoleId",
          message: "What is the new role ID for the employee?",
        },
      ];
      const updateDetails = await inquirer.prompt(updateQuestions);

      await updateEmployeeRole(
        updateDetails.employeeId,
        updateDetails.newRoleId
      );
      console.log("Updated employee's role");
      break;

    case "View All Roles":
      await viewAllRoles();
      break;

    case "Add Role":
      const roleQuestions = [
        {
          type: "input",
          name: "roleName",
          message: "What is the name of the role?",
        },
        {
          type: "input",
          name: "roleSalary",
          message: "What is the salary of the role?",
        },
        {
          type: "input",
          name: "departmentId",
          message: "Which department does the role belong to (provide ID)?",
        },
      ];
      const roleDetails = await inquirer.prompt(roleQuestions);

      await addRole(
        roleDetails.roleName,
        roleDetails.roleSalary,
        roleDetails.departmentId
      );
      console.log("Added role to the database");
      break;

    case "View All Departments":
      await viewAllDepartments();
      break;

    case "Add Department":
      const departmentQuestion = {
        type: "input",
        name: "departmentName",
        message: "What is the name of the department?",
      };
      const { departmentName } = await inquirer.prompt(departmentQuestion);

      await addDepartment(departmentName);
      console.log("Added department to the database");
      break;

    case "Quit":
      process.exit();
  }

  start();
}

async function init() {
  await initializeConnection();
  start();
}

init();
