const db = require("../models");
const itemInformationModel = require("../models/itemInformation.model");
const Item = db.item;
const Model = db.model;
const Type = db.type;
const Category = db.category;
const ModelField = db.modelField;
const TypeField = db.typeField;
const ItemField = db.itemField;
const Repair = db.repair;
const ItemInfo = db.itemInformation;
const Assignment = db.assignment;
const Op = db.Sequelize.Op;

//Create and Save a new Item
exports.create = async(req, res) => {
    if(!req.body.serialNum){
        res.status(400).send({
            message: "content cannot be empty", 
        });
        return;
    }
    console.log('Creating new Item')
    const item = {
        serialNum: req.body.serialNum,
        receivedDate: new Date(), 
        status: 'Unassigned',
        initialValue: req.body.initialValue,
        productionYear: req.body.prodYear || null, 
        warrantyEnd: req.body.warrantyEnd || null,
        modelId: req.body.modelId
    };

    console.log(item);
    try{
      const data = await Item.create(item);
      res.send(data);
    }
    catch(err){
      console.log(err.message);
      res.status(500).send({
        message: err.message || "some error occurred while creating the item.",
      });
    }
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

exports.findAllForModel = async(req, res) => {
  const modelId = req.params.modelId;
  try{
    const data = await Item.findAll({
      where: [{modelId: modelId}],
      include: [{
        model: Model,
        include: [Type]
      }]
    })
    if(data){
      res.send(data);
    }
  }
  catch(err){
    console.error(err);
    res.status(500).send({
      message: "Error retrieving Items of modelId=" + modelId,
    });
  }
}

// Find a single Item with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Item.findByPk(id, {
      include: [{
        model: Model,
        include: [{
          model: Type,
          include: [Category],
        }],
      }]
    });

    if (data) {
      console.log(data.id);

      const modelFields = await ModelField.findAll({
        where: { modelId: data.model.id },
        include: [db.field],
      });
      console.log("Found model fields. Entering type fields");
      const typeFields = await TypeField.findAll({
        where: { typeId: data.model.typeId },
        include: [db.field],
      });

      const itemFields = await ItemField.findAll({
        where: { itemId: data.id },
        include: [db.field],
      });

      const repair = await Repair.findAll({
        where: { itemId: data.id },
        include: [db.vendor, db.person],
      });

      const assignment = await Assignment.findAll({
        where: { itemId: data.id },
        include: [
          {model: db.person}, 
          {model: db.building}, 
          {
            model: db.room,
            include: [db.building]
          }
        ]
      });

      const itemInfo = await ItemInfo.findAll({
        where: { itemId: data.id },
      });

      // Convert Sequelize instances to plain objects
      const dataObject = data.toJSON();
      const itemArray = {
        id: dataObject.id,
        productionYear: dataObject.productionYear,
        receivedDate: dataObject.receivedDate,
        status: dataObject.status,
        warrantyEnd: dataObject.warrantyEnd,
        serialNum: dataObject.serialNum,
        initialValue: dataObject.initialValue,
        disposalValue: dataObject.disposalValue,
        repairSchedule: dataObject.repairSchedule,
        
      };
      const modelArray = {
        model: dataObject.model.model,
        weight: dataObject.model.weightInPounds,
      };
      const typeArray = {
        typeName: dataObject.model.type.typeName,
      };
      const categoryArray = {
        catName: dataObject.model.type.category.catName,
      };
      const modelFieldsArray = modelFields.map((field) => field.toJSON());
      const typeFieldsArray = typeFields.map((field) => field.toJSON());
      const itemFieldsArray = itemFields.map((field) => field.toJSON());
      const repairArray = repair.map((r) => r.toJSON());
      const assignmentArray = assignment.map((a) => a.toJSON());
      const itemInfoArray = itemInfo.map((info) => info.toJSON());

      // Merge all relevant data into a single object
      const mergedData = {
        item: itemArray,
        model: modelArray,
        type: typeArray,
        category: categoryArray,
        modelFields: modelFieldsArray,
        typeFields: typeFieldsArray,
        itemFields: itemFieldsArray,
        repair: repairArray,
        assignment: assignmentArray,
        itemInfo: itemInfoArray,
      };

      console.log(mergedData);
      res.send(mergedData);
    } else {
      res.status(404).send({
        message: `Cannot find Item with id=${id}.`,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Error retrieving Item with id=" + id,
    });
  }
};

// Update an Item by the id in the request
exports.update = async(req, res) => {
    const id = req.params.id;
    const data = req.body;
    try{
      const response = await Item.update(data.item, {where: {id: id}});
      await Promise.all(data.itemFields.map(field => ItemFields.update(field, {where: {id: field.id}})));
      if(response){
        res.send({message: "Item was updated successfully"});
      }
      else{
        res.send({
          message: `Cannot update Item with id=${id}. Maybe Item was not found or req.body is empty!`,
        });
      }
    }
    catch(err){
      res.status(500).send({
        message: "Error updating Item with id=" + id,
      });
    }
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