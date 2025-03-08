const express = require("express");
const app = express();
app.use(express.json());

let employees = [];
let companies = [];

async function validateEmployee(employee) {
  if (!employee.name || typeof employee.name !== "string") {
    return "name is required and should be string";
  }
  if (!employee.companyId || typeof employee.companyId !== "number") {
    return "companyId is required and should be Integere";
  }
  return null;
}

app.post("/api/employees", async (req, res) => {
  let error = await validateEmployee(req.body);

  if (error) return res.status(400).json(error);

  let employee = { id: employees.length + 1, ...req.body };
  employees.push(employee);
  res.status(201).json(employee);
});

async function validateCompany(companie) {
  if (!companie.name || typeof companie.name !== "string") {
    return "name is required and should be string";
  }
  return null;
}

app.post("/api/companies", async (req, res) => {
  let error = await validateCompany(req.body);

  if (error) return res.status(400).json(error);

  let companie = { id: companies.length + 1, ...req.body };

  companies.push(companie);
  res.status(201).json(companie);
});

// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });

module.exports = { app, validateEmployee, validateCompany };
