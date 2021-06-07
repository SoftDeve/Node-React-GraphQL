const express = require("express");
const router = new express.Router();

let employees = [];

router.get("/employees", (req, res) => {
  res.json(employees);
});

router.get("/employees/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let currentEmployee = employees.filter((x) => x.id == id)[0];
  if (currentEmployee) {
    res.json(currentEmployee);
  } else {
    res.send(404);
  }
});

router.post("/employees", (req, res) => {
  let employee = req.body; //email if email is not present the push
  const isEmployeeExist = employees.filter(
    (emp) => emp.name.toLowerCase() === employee.name.toLowerCase()
  ).length;
  if (isEmployeeExist) {
    return res.status(500).json({ error: "Employee already exist" });
  }
  employees.push(employee);
  res.json(employee);
});

router.put("/employees", (req, res) => {
  let employee = req.body;
  let currentEmployee = employees.filter((x) => x.id == employee.id)[0];
  if (currentEmployee) {
    (currentEmployee.name = employee.name),
      (currentEmployee.location = employee.location),
      (currentEmployee.designation = employee.designation);
    res.json(currentEmployee);
  } else {
    res.sendStatus(404);
  }
});
router.delete("/employees/:id", (req, res) => {
  let employeeId = req.params.id;
  // let currentEmployee = employees.map((x) => console.log(x.id));
  let currentEmployee = employees.filter((x) => x.id === employeeId)[0];
  if (currentEmployee) {
    employees = employees.filter((x) => x.id !== employeeId);
    // console.log(employees);
    res.json(employees);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
