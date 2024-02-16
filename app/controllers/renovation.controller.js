const db = require("../models");
const Renovation = db.renovation;
const Op = db.Sequelize.Op;

// Create and Save a new Renovation
exports.create = (req, res) => {
  // Validate request
  if (!req.body.date || !req.body.description || !req.body.buildingId) {
    res.status(400).send({
      message: "Date, Description, and buildingId cannot be empty!",
    });
    return;
  }

  // Create a Renovation
  const renovation = {
    date: req.body.date,
    cost: req.body.cost,
    description: req.body.description,
    buildingId: req.body.buildingId
  };

  // Save Renovation in the database
  Renovation.create(renovation)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Renovation.",
      });
    });
};

// Retrieve all Renovations from the database.
exports.findAll = (req, res) => {
  Renovation.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving renovations.",
      });
    });
};

// Find a single Renovation with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Renovation.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Renovation with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Renovation with id=" + id,
      });
    });
};

// Update a Renovation by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Renovation.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Renovation was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Renovation with id=${id}. Maybe Renovation was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Renovation with id=" + id,
      });
    });
};

// Delete a Renovation with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Renovation.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Renovation was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Renovation with id=${id}. Maybe Renovation was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Renovation with id=" + id,
      });
    });
};

// Delete all Renovations from the database.
exports.deleteAll = (req, res) => {
  Renovation.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Renovations were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all renovations.",
      });
    });
};
