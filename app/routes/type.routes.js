module.exports = (app) => {
    const type = require("../controllers/type.controller.js"); 
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();

    // Create a new type
    router.post("/", type.create);

    // Retrieve all types
    router.get("/", type.findAll);

    // Retrieve a single type with id
    router.get("/:id", type.findOne);

    // Update a type with id
    router.put("/:id", type.update);

    // Delete a single type with id
    router.delete("/:id", type.delete);

    // Delete all types
    router.delete("/", type.deleteAll);

    app.use("/asset-t4/type", router); 
};
