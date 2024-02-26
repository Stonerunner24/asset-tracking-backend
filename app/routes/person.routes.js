// Import required modules and controllers
const persons = require("../controllers/person.controller.js");
const router = require("express").Router();

module.exports = (app) => {
    // Define routes for handling CRUD operations on persons
    // Create a new Person
    router.post("/", persons.create);
  
    // Retrieve all Persons
    router.get("/", persons.findAll);
  
    // Retrieve a single Person by id
    router.get("/:id", persons.findOne);
  
    // Update a Person by id
    router.put("/:id", persons.update);
  
    // Delete a Person by id
    router.delete("/:id", persons.delete);
  
    // Delete all Persons
    router.delete("/", persons.deleteAll);
  
    // Attach the router to the base path
    app.use("/asset-t4/person", router);
};
