module.exports = (app) => {
    const rooms = require("../controllers/room.controller.js"); // Adjust the path if needed
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();

    // Create a new room
    router.post("/", rooms.create);

    // Retrieve all rooms
    router.get("/", rooms.findAll);

    // Retrieve a single room with id
    router.get("/:id", rooms.findOne);

    // Update a room with id
    router.put("/:id", rooms.update);

    // Delete a single room with id
    router.delete("/:id", rooms.delete);

    // Delete all rooms
    router.delete("/", rooms.deleteAll);

    app.use("/asset-t4/room", router); // Adjust the path prefix accordingly
};
