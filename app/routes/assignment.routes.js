module.exports = (app) => {
    const assignments = require("../controllers/assignment.controller.js"); // Update the controller import
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new Assignment
    router.post("/", [authenticate], assignments.create);
  
    // Retrieve all Assignments
    router.get("/", [authenticate], assignments.findAll);
  
    // Retrieve a single Assignment by id
    router.get("/:id", [authenticate], assignments.findOne);
  
    // Update an Assignment by id
    router.put("/:id", [authenticate], assignments.update);
  
    // Delete an Assignment by id
    router.delete("/:id", [authenticate], assignments.delete);
  
    // Delete all Assignments
    router.delete("/", [authenticate], assignments.deleteAll);
  
    app.use("/asset-t4/assignments", router); // You can adjust the base URL here if needed
  };
  