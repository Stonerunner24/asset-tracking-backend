const db = require("../models");
const ModelField = db.modelField;
const Op = db.Sequelize.Op;

// Create and Save a new ModelField
exports.create = (req, res) => {
    if (!req.body.fieldId || !req.body.value) {
        res.status(400).send({
            message: "ModelId, fieldId, and value cannot be empty",
        });
        return;
    }

    const modelField = {
        fieldId: req.body.fieldId,
        value: req.body.value
    };

    ModelField.create(modelField)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the modelField.",
            });
        });
};

// Bulk create and save new ModelFields
exports.bulkCreate = (req, res) => {
    
    if (req.body.fieldId.length !== req.body.value.length) {
        res.status(400).send({
            message: "Must have equivalent length arrays",
        });
        return;
    }

    // Retrieve the modelId from the URL parameters
    const modelId = req.params.id;

    // Map the fieldId and value arrays to an array of objects
    const modelFields = req.body.fieldId.map((fieldId, index) => {
        return {
            modelId: modelId, 
            fieldId: fieldId,
            value: req.body.value[index]
        };
    });

    // Use bulkCreate to insert all the ModelFields at once
    ModelField.bulkCreate(modelFields)
        .then(createdModelFields => {
            res.status(201).send(createdModelFields);
        })
        .catch(error => {
            res.status(500).send({
                message: "Error creating ModelFields",
                error: error
            });
        });
};

exports.findAllforModel = (req, res) => {
    const modelId = req.params.id;
    console.log("\n FIND ALL QUERY: " + modelId);

    ModelField.findAll({ where: {modelId: modelId}, include: [db.field] })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving models",
            });
        });
};


// Delete a ModelField with the specified id in the request
exports.deleteForModel = (req, res) => {
    const modelId = req.params.modelId;
    const modelFieldId = req.params.modelFieldId;

    ModelField.destroy({
        where: { modelId: modelId, id: modelFieldId },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "ModelField was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete ModelField with id=${id}. Maybe ModelField was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete ModelField with id=" + id,
            });
        });
};

