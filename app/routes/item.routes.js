/************************************
 * IMPORTANT
 * ONCE TESTING IS COMPLETED AND FRONTEND DEVELOPMENT IS A GO, ADD AUTHENTICATION TO THIS ROUTE
 */

module.exports = (app) => {
    const items = require("../controllers/item.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();

    //Create a new item
    router.post("/", items.create);

    //Retrieve all items
    router.post("/", items.findAll);

    //Retrieve a single item with id
    router.get("/:id", items.findOne);

    //Update an item with id
    router.put("/:id", items.update);

    //delete a single item with id
    router.delete("/:id", items.delete);
    
    //delete all items
    router.delete("/", items.deleteAll);
};