/************************************
 * IMPORTANT
 * ONCE TESTING IS COMPLETED AND FRONTEND DEVELOPMENT IS A GO, ADD AUTHENTICATION TO THIS ROUTE
 */

module.exports = (app) => {
    const items = require("../controllers/item.controller.js");
    const itemInformations = require("../controllers/itemInfo.controller.js");
    const itemFields = require("../controllers/itemField.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();

    //Create a new item
    router.post("/", items.create);

    //Retrieve all items
    router.get("/", items.findAll);

    //Retrieve all items with modelId
    router.get("/model/:modelId", items.findAllForModel);

    // Retrieve all items for many category ids
    router.get("/categories/:categoryIds", items.findAllForManyCategories);

    //Retrieve a single item with id
    router.get("/:id", items.findOne);

    //Update an item with id
    router.put("/:id", items.update);

    //delete a single item with id
    router.delete("/:id", items.delete);
    
    //delete all items
    router.delete("/", items.deleteAll);

    //ITEM INFORMATION ROUTES
    router.post("/info", itemInformations.create);

    // Retrieve all item informations
    router.get("/info", itemInformations.findAll);

    // Retrieve a single item information with id
    router.get("/info/:id", itemInformations.findOne);

    router.get("/:id/info/", itemInformations.findAllForItem);

    // Update an item information with id
    router.put("/info/:id", itemInformations.update);

    // Delete a single item information with id
    router.delete("/info/:id", itemInformations.delete);

    // Delete all item informations
    router.delete("/info", itemInformations.deleteAll);

    //ITEM FIELD ROUTES
     // Create a new item field
     router.post("/:id/fields/", itemFields.create);

    // Bulk create new item fields
    router.post("/:id/fields/bulkCreate", itemFields.bulkCreate);

    // Retrieve all item fields for a specific item
    router.get("/:id/fields", itemFields.findAllforitem);

    // Delete a specific item field for a specific item
    router.delete("/:itemId/fields/:itemFieldId", itemFields.deleteForitem);

    app.use("/asset-t4/item", router);
};