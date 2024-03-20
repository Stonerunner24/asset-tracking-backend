module.exports = (app) => {
  const users = require("../controllers/user.controller.js");
  var router = require("express").Router();

  // Create a new User
  router.post("/", users.create);

  // Retrieve all Users
  router.get("/", users.findAll);

  // Retrieve a single User by id
  router.get("/:id", users.findOne);

  // Retrieve a single User's categories by id
  router.get("/:id/categories", users.findAllCategoriesForUser);

  // Retrieve a single user's categories as an array of ids
  router.get("/:id/categoryIds", users.findAllCategoryIdsForUser);

  // Update a User by id
  router.put("/:id", users.update);

  // Delete a User by id
  router.delete("/:id", users.delete);

  // Delete all Users
  router.delete("/", users.deleteAll);

  // Attach the router to the base path
  app.use("/asset-t4/user", router);
};
