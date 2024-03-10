module.exports = (app) => {
    const models = require("../controllers/model.controller.js");
    const modelFields = require("../controllers/modelField.controller.js");
    const router = require("express").Router();
  
    // Create a new Model
    router.post("/", models.create);
  
    // Retrieve all Models
    router.get("/", models.findAll);
  
    // Retrieve a single Model by id
    router.get("/:id", models.findOne);

    //retrieve all models by type id
    router.get("/type/:typeId", models.findAllByTypeId);

    // Bulk create modelFields
    router.post("/:id/field", modelFields.bulkCreate);

    //retrieve all modelfields
    router.get("/:id/field", models.findAllFields);
  
    // Update a Model by id
    router.put("/:id", models.update);
  
    // Delete a Model by id
    router.delete("/:id", models.delete);
  
    // Delete all Models
    router.delete("/", models.deleteAll);
  
    // Attach the router to the base path
    app.use("/asset-t4/model", router);
  };
  