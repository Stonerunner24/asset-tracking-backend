const db = require("../models");
const QuickLink = db.quickLink;
const Op = db.Sequelize.Op;

// Create and Save a new QuickLink
exports.create = (req, res) => {
  // Validate request
  if (!(req.body.name && req.body.path)) {
    res.status(400).send({
      message: "Name and path cannot be empty!",
    });
    return;
  }

  // Create a QuickLink
  const quickLink = {
    name: req.body.name,
    path: req.body.path
  };

  // Save QuickLink in the database
  QuickLink.create(quickLink)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the QuickLink.",
      });
    });
};

// Retrieve all QuickLinks from the database.
exports.findAll = (req, res) => {
  QuickLink.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving QuickLinks.",
      });
    });
};

// Find a single QuickLink with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  QuickLink.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find QuickLink with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving QuickLink with id=" + id,
      });
    });
};

// Update a QuickLink by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  QuickLink.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "QuickLink was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update QuickLink with id=${id}. Maybe QuickLink was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating QuickLink with id=" + id,
      });
    });
};

// Delete a QuickLink with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  QuickLink.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "QuickLink was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete QuickLink with id=${id}. Maybe QuickLink was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete QuickLink with id=" + id,
      });
    });
};

// Delete all QuickLinks from the database.
exports.deleteAll = (req, res) => {
  QuickLink.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} QuickLinks were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all QuickLinks.",
      });
    });
};
