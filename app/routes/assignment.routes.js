module.exports = (app) => {
    const assignments = require("../controllers/assignment.controller.js"); // Update the controller import
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new Assignment
    router.post("/assignments", [authenticate], assignments.create);
  
    // Retrieve all Assignments
    router.get("/assignments", [authenticate], assignments.findAll);
  
    // Retrieve a single Assignment by id
    router.get("/assignments/:id", [authenticate], assignments.findOne);
  
    // Update an Assignment by id
    router.put("/assignments/:id", [authenticate], assignments.update);
  
    // Delete an Assignment by id
    router.delete("/assignments/:id", [authenticate], assignments.delete);
  
    // Delete all Assignments
    router.delete("/assignments", [authenticate], assignments.deleteAll);
  
    app.use("/api", router); // You can adjust the base URL here if needed
  };
  