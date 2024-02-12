module.exports = (app) => {
    const assignments = require("../controllers/assigment.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new Assignment
    router.post("/",  assignments.create);
  
    // Retrieve all Assignments
    router.get("/",  assignments.findAll);
  
    // Retrieve a single Assignment by id
    router.get("/:id",  assignments.findOne);
  
    // Update an Assignment by id
    router.put("/:id",  assignments.update);
  
    // Delete an Assignment by id
    router.delete("/:id",  assignments.delete);
  
    // Delete all Assignments
    router.delete("/",  assignments.deleteAll);
  
    app.use("/asset-t4/assignment", router); 
  };
  