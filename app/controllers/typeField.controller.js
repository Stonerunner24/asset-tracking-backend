const db = require("../models");
const TypeField = db.typeField;
const Op = db.Sequelize.Op;

// Create and Save a new TypeField
exports.create = (req, res) => {
    if (!req.body.fieldId || !req.body.isItem) {
        res.status(400).send({
            message: "TypeId, fieldId, and isItem cannot be empty",
        });
        return;
    }

    const typeField = {
        fieldId: req.body.fieldId,
        isItem: req.body.isItem
    };

    TypeField.create(typeField)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the typeField.",
            });
        });
};

// Bulk create and save new TypeFields
exports.bulkCreate = (req, res) => {
    
    if (req.body.fieldId.length !== req.body.isItem.length) {
        res.status(400).send({
            message: "Must have equivalent length arrays",
        });
        return;
    }

    // Retrieve the typeId from the URL parameters
    const typeId = req.params.id;

    // Map the fieldId and isItem arrays to an array of objects
    const typeFields = req.body.fieldId.map((fieldId, index) => {
        return {
            typeId: typeId, 
            fieldId: fieldId,
            isItem: req.body.isItem[index]
        };
    });

    // Use bulkCreate to insert all the TypeFields at once
    TypeField.bulkCreate(typeFields)
        .then(createdTypeFields => {
            res.status(201).send(createdTypeFields);
        })
        .catch(error => {
            res.status(500).send({
                message: "Error creating TypeFields",
                error: error
            });
        });
};

exports.findAllforType = (req, res) => {
    const typeId = req.params.id;
    console.log("\n FIND ALL QUERY: " + typeId);

    TypeField.findAll({ where: {typeId: typeId} })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving types",
            });
        });
};

// Delete a TypeField with the specified id in the request
exports.deleteForType = (req, res) => {
    const typeId = req.params.typeId;
    const typeFieldId = req.params.typeFieldId;

    TypeField.destroy({
        where: { typeId: typeId, id: typeFieldId },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "TypeField was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete TypeField with id=${id}. Maybe TypeField was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete TypeField with id=" + id,
            });
        });
};

