const mysql = require("mysql2/promise");

let connection;

async function initializeConnection() {
  connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "hurricane55",
    database: "employee_db",
  });
}

async function viewAllDepartments() {
  const query = "SELECT * FROM department";
  const [rows] = await connection.execute(query);
  console.table(rows);
}

async function viewAllRoles() {
  const query = `SELECT role.id, role.title, role.salary, department.name as department
                 FROM role LEFT JOIN department ON role.department_id = department.id`;
  const [rows] = await connection.execute(query);
  console.table(rows);
}

async function viewAllEmployees() {
  const query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, 
                 department.name as department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) as manager
                 FROM employee LEFT JOIN role ON employee.role_id = role.id
                 LEFT JOIN department ON role.department_id = department.id
                 LEFT JOIN employee manager ON manager.id = employee.manager_id`;
  const [rows] = await connection.execute(query);
  console.table(rows);
}

async function addDepartment(departmentName) {
  const query = "INSERT INTO department (name) VALUES (?)";
  await connection.execute(query, [departmentName]);
}

async function addRole(title, salary, departmentId) {
  const query =
    "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
  await connection.execute(query, [title, salary, departmentId]);
}

async function addEmployee(firstName, lastName, roleId, managerId) {
  const query =
    "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
  await connection.execute(query, [firstName, lastName, roleId, managerId]);
}

async function updateEmployeeRole(employeeId, roleId) {
  const query = "UPDATE employee SET role_id = ? WHERE id = ?";
  await connection.execute(query, [roleId, employeeId]);
}

module.exports = {
  initializeConnection,
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
};
