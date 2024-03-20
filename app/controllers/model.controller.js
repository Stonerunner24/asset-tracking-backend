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

exports.findAllByCategoryId = (req, res) => {
  const categoryId = req.params.categoryId;

  // Find all models where associated type's categoryId matches
  Model.findAll({
    include: {
      model: db.type,
      where: {
        categoryId: categoryId
      }
    }
  })
    .then((data) => {
      if (data.length > 0) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find models with categoryId=${categoryId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving models with CategoryId=" + categoryId,
      });
    });
};

exports.findAllForCategoryIds = (req, res) => {
  const categoryIds = req.params.categoryIds.split(',').map(Number);

  // Find all models where associated type's categoryId matches any
  Model.findAll({
    include: {
      model: db.type,
      where: {
        categoryId: { [Op.in]: categoryIds }
      }
    }
  })
    .then((data) => {
      if (data.length > 0) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find models with categoryId=${categoryId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving models with CategoryId=" + categoryId,
      });
    });
};

// Find a single Model with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Model.findByPk(id, {
    include: [{
      model: db.type,
      include: [db.category]
    }]
  })
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

exports.findAllFields = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await ModelFields.findAll({ where: { modelId: id }, include: db.field });
    if (data) {
      res.send(data);
    }
    else {
      res.status(404).send({
        message: `Cannot find ModelFields with modelId=${id}.`,
      });
    }

  }
  catch (err) {
    res.status(500).send({
      message: `cannot find modelFields with modelId=${id}`,
    })
  }
};

// Update a Model by the id in the request
exports.update = async (req, res) => {
  console.log('in update function');
  const id = req.params.id;
  const data = req.body;
  console.log(id);
  try {
    const response = await Model.update(data.model, { where: { id: id } });
    if (data.typeChange) {
      console.log('deleting old modelfields');
      // await Promise.all(data.modelFields.map(mf => ModelFields.delete(mf.id)))
      await ModelFields.destroy({ where: { modelId: id } });
      let modelFields = [];
      for (let mf of data.modelFields) {
        modelFields.push({
          'value': mf.value,
          'modelId': id,
          'fieldId': mf.fieldId
        });
      }
      await Promise.all(modelFields.map(mf => ModelFields.create(mf)));
    }
    else {
      console.log('in update existing modelfields');
      await Promise.all(data.modelFields.map(mf => ModelFields.update(mf, { where: { id: mf.id } })));
    }
    if (response) {
      res.send({ message: "Model was updated successfully" });
    }
    else {
      res.send({
        message: `Cannot update Model with id=${id}. Maybe Model was not found or req.body is empty!`,
      });
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Error updating Model with id=" + id,
    });
  }
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
