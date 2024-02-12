module.exports = (app) => {
    const fields = require("../controllers/field.controller.js"); // Adjust the path if needed
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();

    // Create a new field
    router.post("/", fields.create);

    // Retrieve all fields
    router.get("/", fields.findAll);

    // Retrieve a single field with id
    router.get("/:id", fields.findOne);

    // Update a field with id
    router.put("/:id", fields.update);

    // Delete a single field with id
    router.delete("/:id", fields.delete);

    // Delete all fields
    router.delete("/", fields.deleteAll);

    app.use("/asset-t4/field", router); // Adjust the path prefix accordingly
};
