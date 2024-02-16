module.exports = (app) => {
    const permissions = require("../controllers/permission.controller.js");
    const router = require("express").Router();
  
    // Create a new Permission
    router.post("/", permissions.create);
  
    // Retrieve all Permissions
    router.get("/", permissions.findAll);
  
    // Retrieve a single Permission by id
    router.get("/:id", permissions.findOne);
  
    // Update a Permission by id - Not implemented
    router.put("/:id", permissions.update);
  
    // Delete a Permission by id
    router.delete("/:id", permissions.delete);
  
    // Delete all Permissions
    router.delete("/", permissions.deleteAll);
  
    // Attach the router to the base path
    app.use("/asset-t4/permission", router);
  };
  