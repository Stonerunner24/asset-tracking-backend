module.exports = (app) => {
    const quickLinks = require("../controllers/quicklink.controller.js");
    const router = require("express").Router();
  
    // Create a new QuickLink
    router.post("/", quickLinks.create);
  
    // Retrieve all QuickLinks
    router.get("/", quickLinks.findAll);
  
    // Retrieve a single QuickLink by id
    router.get("/:id", quickLinks.findOne);

    // Retrieve all Quicklinks for a userId
    router.get("/user/:userId", quickLinks.findAllByUserId);
    // router.get("/", quickLinks.findAllByUserId);
  
    // Update a QuickLink by id
    router.put("/:id", quickLinks.update);
  
    // Delete a QuickLink by id
    router.delete("/:id", quickLinks.delete);
  
    // Delete all QuickLinks
    router.delete("/", quickLinks.deleteAll);
  
    // Attach the router to the base path
    app.use("/asset-t4/quicklink", router);
  };
  