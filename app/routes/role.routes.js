module.exports = (app) => {
    const roles = require("../controllers/role.controller.js");
    const router = require("express").Router();
  
    // Create a new Role
    router.post("/", roles.create);
  
    // Retrieve all Roles
    router.get("/", roles.findAll);
  
    // Retrieve a single Role by id
    router.get("/:id", roles.findOne);
  
    // Update a Role by id
    router.put("/:id", roles.update);
  
    // Delete a Role by id
    router.delete("/:id", roles.delete);
  
    // Delete all Roles
    router.delete("/", roles.deleteAll);
  
    // Attach the router to the base path
    app.use("/asset-t4/role", router);
  };
  