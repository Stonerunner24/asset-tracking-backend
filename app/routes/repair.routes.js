module.exports = (app) => {
    const repairs = require("../controllers/repair.controller.js"); 
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();

    // Create a new repair
    router.post("/", repairs.create);

    // Retrieve all repairs
    router.get("/", repairs.findAll);

    // Retrieve a single repair with id
    router.get("/:id", repairs.findOne);

    // Update a repair with id
    router.put("/:id", repairs.update);

    // Delete a single repair with id
    router.delete("/:id", repairs.delete);

    // Delete all repairs
    router.delete("/", repairs.deleteAll);

    app.use("/asset-t4/repair", router); 
};
