module.exports = (app) => {
    const type = require("../controllers/type.controller.js"); 
    const typeField = require("../controllers/typeField.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();

    // Create a new type
    router.post("/", type.create);

    // Retrieve all types
    router.get("/", type.findAll);

    // Retrieve all types by category
    router.get("/category/:categoryId", type.findAllByCategoryId);

    // Retrieve all types by many categories
    router.get("/category/:categoryIds", type.findAllByManyCategoryIds);

    // Retrieve a single type with id
    router.get("/:id", type.findOne);

    // Update a type with id
    router.put("/:id", type.update);

    // Delete a single type with id
    router.delete("/:id", type.delete);

    // Delete all types
    router.delete("/", type.deleteAll);

    // Add routes to CRUD typefields
    // Create many typeFields for a type with id
    router.post("/:id/typefield/", typeField.bulkCreate);

    // Retrieve all typeFields for a type with id
    router.get("/:id/typefield/", typeField.findAllforType);

    // Retrieve all item typeFields for a type with id
    router.get("/:id/typefield/item", typeField.findAllItemforType);

    // Retrieve all model typeFields for a type with id
    router.get("/:id/typefield/model", typeField.findAllModelforType);

    // Delete one typeField from a type with ids
    router.delete("/:typeId/typefield/:typeFieldId", typeField.deleteForType);

    app.use("/asset-t4/type", router); 
};
