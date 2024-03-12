module.exports = (app) => {
  const assignments = require("../controllers/assignment.controller.js");
  const router = require("express").Router();

  // Create a new assignment
  router.post("/", assignments.create);

  // Retrieve all assignments
  router.get("/", assignments.findAll);

  // Retrieve all Building Assignments
  router.get("/building/:buildingId", assignments.findAllForBuilding);

  // Retrieve a single assignment by id
  router.get("/:id", assignments.findOne);

  // Update a assignment by id
  router.put("/:id", assignments.update);

  // Delete a assignment by id
  router.delete("/:id", assignments.delete);

  // Delete all assignments
  router.delete("/", assignments.deleteAll);

  // Attach the router to the base path
  app.use("/asset-t4/assignment", router);
};
