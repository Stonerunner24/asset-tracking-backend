const db = require("../models");
const Model = db.model;
const ModelFields = db.modelField;
const Op = db.Sequelize.Op;

// Create and Save a new Model
exports.create = (req, res) => {
  // Validate request
  if (!req.body.model || !req.body.typeId) {
    res.status(400).send({
      message: "Model and typeId cannot be empty!",
    });
    return;
  }

  // Create a Model
  const model = {
    model: req.body.model,
    typeId: req.body.typeId,
    brandId: req.body.brandId
  };

  // Save Model in the database
  Model.create(model)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Model.",
      });
    });
};

// Retrieve all Models from the database.
exports.findAll = (req, res) => {
  Model.findAll({
    include: [{
      model: db.type,
      include: [db.category]
    }]
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving models.",
      });
    });
};

exports.findAllByTypeId = (req, res) => {
  const typeId = req.params.typeId;

  Model.findAll({ where: { typeId: typeId } })
      .then((data) => {
          if (data.length > 0) {
              res.send(data);
          } else {
              res.status(404).send({
                  message: `Cannot find items with typeId=${typeId}.`,
              });
          }
      })
      .catch((err) => {
          res.status(500).send({
              message: "Error retrieving items with typeId=" + typeId,
          });
      });
};

// Find a single Model with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Model.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Model with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Model with id=" + id,
      });
    });
};

exports.findAllFields = async(req, res) => {
  const id = req.params.id;
  try{
    const data = await ModelFields.findAll({where: {modelId : id}, include: db.field});
    if(data){
      res.send(data);
    }
    else{
      res.status(404).send({
        message: `Cannot find ModelFields with modelId=${id}.`,
      });
    }

  }
  catch(err){
    res.status(500).send({
      message: `cannot find modelFields with modelId=${id}`,
    })
  }
};

// Update a Model by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Model.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Model was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Model with id=${id}. Maybe Model was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Model with id=" + id,
      });
    });
};

// Delete a Model with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Model.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Model was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Model with id=${id}. Maybe Model was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Model with id=" + id,
      });
    });
};

// Delete all Models from the database.
exports.deleteAll = (req, res) => {
  Model.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Models were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all models.",
      });
    });
};
