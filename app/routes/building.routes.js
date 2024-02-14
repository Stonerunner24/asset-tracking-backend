module.exports = (app) => {
    const buildings = require("../controllers/building.controller.js"); 
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();

    // Create a new building
    router.post("/", buildings.create);

    // Retrieve all buildings
    router.get("/", buildings.findAll);

    // Retrieve a single building with id
    router.get("/:id", buildings.findOne);

    // Update a building with id
    router.put("/:id", buildings.update);

    // Delete a single building with id
    router.delete("/:id", buildings.delete);

    // Delete all buildings
    router.delete("/", buildings.deleteAll);

    app.use("/asset-t4/building", router); 
};
