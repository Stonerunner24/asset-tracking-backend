module.exports = (app) => {
    const models = require("../controllers/model.controller.js");
    const router = require("express").Router();
  
    // Create a new Model
    router.post("/", models.create);
  
    // Retrieve all Models
    router.get("/", models.findAll);
  
    // Retrieve a single Model by id
    router.get("/:id", models.findOne);
  
    // Update a Model by id
    router.put("/:id", models.update);
  
    // Delete a Model by id
    router.delete("/:id", models.delete);
  
    // Delete all Models
    router.delete("/", models.deleteAll);
  
    // Attach the router to the base path
    app.use("/models", router);
  };
  