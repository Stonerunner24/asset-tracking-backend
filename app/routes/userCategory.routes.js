module.exports = (app) => {
    const userCategories = require("../controllers/userCategory.controller.js");
    var router = require("express").Router();
  
    // Create a new userCategory
    router.post("/", userCategories.create);
  
    // Retrieve all userCategories
    router.get("/", userCategories.findAll);

    // Retrieve all userCategories for a given userId
    router.get("/:userId", userCategories.findAllForUser);
  
    // Retrieve a single userCategory by id
    router.get("/:id", userCategories.findOne);
  
    // Update a userCategory by id
    router.put("/:id", userCategories.update);
  
    // Delete a userCategory by id
    router.delete("/:id", userCategories.delete);
  
    // Delete all userCategories
    router.delete("/", userCategories.deleteAll);
  
    // Attach the router to the base path
    app.use("/asset-t4/userCategory", router);
  };
  