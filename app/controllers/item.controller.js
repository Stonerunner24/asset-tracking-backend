const db = require("../models");
const Item = db.item;
const Model = db.model;
const Type = db.type;
const Category = db.category;
const ModelField = db.modelField;
const TypeField = db.typeField;
const Field = db.field;
const Repair = db.repair;
const Vendor = db.vendor;
const Person = db.person;
const ItemInfo = db.itemInformation;
const Op = db.Sequelize.Op;

//Create and Save a new Item
exports.create = (req, res) => {
    if(!req.body.serialNum){
        res.status(400).send({
            message: "content cannot be empty", 
        });
        return;
    }

    const item = {
        serialNum: req.body.serialNum,
        receivedDate: new Date(req.body.receivedDate), 
        status: req.body.status,
        productionYear: req.body.productionYear || null, 
        warrantyEnd: req.body.warrantyEnd || null,
    };

    Item.create(item)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "some error occurred while creating the item.",
            });
        });
};

exports.findAll = (req, res) => {
    const id = req.query.id;
    var condition = id ? {id: {[Op.like]: `%${id}%`} } : null;

    Item.findAll({
      where: condition,
      include: [{
        model: Model, 
        include: [Type]
      }]
    })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "some error occurred while retrieving items"
            });
        });
};

// Find a single Item with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Item.findByPk(id, {
      include: [{
        model: Model,
        include: [{
          model: Type,
          include: [{
            model: TypeField,
            include: [Field]
          }],
          include: [Category],
          // include: [{
          //   model: ModelField,
          //   include: [Field],
          // }]
        }],
        // include: [{
        //   model: ModelField,
        //   include: [Field],
        // }],
        // include: [{
        //   model: Repair,
        //   include: [Vendor],
        //   include: [Person]
        // }],
        // include: [{
        //   model: ItemInfo
        // }]
      }]
    })
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Item with id=${id}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving Item with id=" + id,
        });
      });
};

// Update an Item by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Item.update(req.body, {
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Item was updated successfully.",
          });
        } else {
          res.send({
            message: `Cannot update Item with id=${id}. Maybe Item was not found or req.body is empty!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating Item with id=" + id,
        });
      });
};

// Delete an Item with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Item.destroy({
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Item was deleted successfully!",
          });
        } else {
          res.send({
            message: `Cannot delete Item with id=${id}. Maybe Item was not found!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete Item with id=" + id,
        });
      });
  };
  
  // Delete all Items from the database.
  exports.deleteAll = (req, res) => {
    Item.destroy({
      where: {},
      truncate: false,
    })
      .then((nums) => {
        res.send({ message: `${nums} Items were deleted successfully!` });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all items.",
        });
      });
  };