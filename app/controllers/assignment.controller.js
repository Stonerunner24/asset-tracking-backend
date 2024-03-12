const db = require("../models");
const Assignment = db.assignment;

exports.create = (req, res) => {
  if (!req.body.startDate || !req.body.status || !req.body.itemId || (!req.body.personId && !req.body.buildingId && !req.body.roomId)) {
    res.status(400).send({
      message: "Start date, status, itemId, and receiver ID cannot be empty!",
    });
    return;
  }

  const assignment = {
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    expectedEndDate: req.body.expectedEndDate,
    status: req.body.status,
    type: req.body.type, 
    itemId: req.body.itemId,
    roomId: req.body.roomId,
    buildingId: req.body.buildingId,
    personId: req.body.personId
  };

  Assignment.create(assignment)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Assignment.",
      });
    });
};

exports.findAll = (req, res) => {
  Assignment.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving assignments.",
      });
    });
};

// Find all items in the database with a specific buildingId
exports.findAllForBuilding = (req, res) => {
  const buildingId = req.params.buildingId;

  Assignment.findAll({ where: { buildingId: buildingId } })
      .then((data) => {
          if (data.length > 0) {
              res.send(data);
          } else {
              res.status(404).send({
                  message: `Cannot find items with buildingId=${buildingId}.`,
              });
          }
      })
      .catch((err) => {
          res.status(500).send({
              message: "Error retrieving items with buildingId=" + buildingId,
          });
      });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Assignment.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Assignment with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Assignment with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  Assignment.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Assignment was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Assignment with id=${id}. Maybe Assignment was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Assignment with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Assignment.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Assignment was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Assignment with id=${id}. Maybe Assignment was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Assignment with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Assignment.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Assignments were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all assignments.",
      });
    });
};
