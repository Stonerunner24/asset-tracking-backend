module.exports = (app) => {
    const categories = require("../controllers/category.controller.js"); 
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();

    // Create a new category
    router.post("/", categories.create);

    // Retrieve all categories
    router.get("/", categories.findAll);

    // Retrieve a single category with id
    router.get("/:id", categories.findOne);

    // Retrieve all categories for a given user
    router.get("/user/:userId", categories.findAllForUser);

    // Retrieve all category ids for a given user
    router.get("/user/:userId/ids", categories.findAllIdsForUser);

    // Update a category with id
    router.put("/:id", categories.update);

    // Delete a single category with id
    router.delete("/:id", categories.delete);

    // Delete all categories
    router.delete("/", categories.deleteAll);

    app.use("/asset-t4/category", router); 
};
