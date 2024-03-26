const db = require("../models");
const itemField = db.itemField;
const Op = db.Sequelize.Op;

// Create and Save a new itemField
exports.create = (req, res) => {
    if (!req.body.fieldId || !req.body.value) {
        res.status(400).send({
            message: "itemId, fieldId, and value cannot be empty",
        });
        return;
    }

    const itemField = {
        fieldId: req.body.fieldId,
        value: req.body.value
    };

    itemField.create(itemField)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the itemField.",
            });
        });
};

// Bulk create and save new itemFields
exports.bulkCreate = (req, res) => {

    // Retrieve the itemId from the URL parameters
    const itemId = req.params.id;
    console.log(req.body);

    // Map the fieldId and value arrays to an array of objects
    const itemFields = req.body.map((itemField) => {
        return {
            ...itemField,
            itemId: itemId, 
        };
    });

    // Use bulkCreate to insert all the itemFields at once
    itemField.bulkCreate(itemFields)
        .then(createditemFields => {
            res.status(201).send(createditemFields);
        })
        .catch(error => {
            res.status(500).send({
                message: "Error creating itemFields",
                error: error
            });
        });
};

exports.findAllforitem = (req, res) => {
    const itemId = req.params.id;
    console.log("\n FIND ALL QUERY: " + itemId);

    itemField.findAll({ where: {itemId: itemId}, include: [db.field] })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving items",
            });
        });
};


// Delete a itemField with the specified id in the request
exports.deleteForitem = (req, res) => {
    const itemId = req.params.itemId;
    const itemFieldId = req.params.itemFieldId;

    itemField.destroy({
        where: { itemId: itemId, id: itemFieldId },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "itemField was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete itemField with id=${id}. Maybe itemField was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete itemField with id=" + id,
            });
        });
};

