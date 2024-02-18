module.exports = (app) => {
    const renovations = require("../controllers/renovation.controller.js");
    const router = require("express").Router();
  
    // Create a new Renovation
    router.post("/", renovations.create);
  
    // Retrieve all Renovations
    router.get("/", renovations.findAll);
  
    // Retrieve a single Renovation by id
    router.get("/:id", renovations.findOne);
  
    // Update a Renovation by id
    router.put("/:id", renovations.update);
  
    // Delete a Renovation by id
    router.delete("/:id", renovations.delete);
  
    // Delete all Renovations
    router.delete("/", renovations.deleteAll);
  
    // Attach the router to the base path
    app.use("/asset-t4/renovation", router);
  };
  