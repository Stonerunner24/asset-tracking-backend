const db = require("../models");
const Field = db.field; 
const Op = db.Sequelize.Op;

// Create and Save a new Field
exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Content cannot be empty",
        });
        return;
    }

    const field = {
        name: req.body.name,
    };

    Field.create(field)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the field.",
            });
        });
};

// Retrieve all Fields
exports.findAll = (req, res) => {
    const id = req.query.id;
    var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

    Field.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving fields",
            });
        });
};

// Find a single Field with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Field.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Field with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Field with id=" + id,
            });
        });
};

// Update a Field by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Field.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Field was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update Field with id=${id}. Maybe Field was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Field with id=" + id,
            });
        });
};

// Delete a Field with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Field.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Field was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete Field with id=${id}. Maybe Field was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete Field with id=" + id,
            });
        });
};

// Delete all Fields from the database.
exports.deleteAll = (req, res) => {
    Field.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({ message: `${nums} Fields were deleted successfully!` });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all fields.",
            });
        });
};
