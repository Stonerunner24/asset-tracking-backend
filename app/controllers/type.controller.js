const db = require("../models");
const Type = db.type;
const TypeFields = db.typeField;
const Op = db.Sequelize.Op;

// Add functions to create TypeFields? or maybe do that in its own controller? 

// Create and Save a new Type
exports.create = (req, res) => {
    if (!req.body.typeName || req.body.active === undefined) {
        res.status(400).send({
            message: "Content cannot be empty",
        });
        return;
    }

    const type = {
        typeName: req.body.typeName,
        active: req.body.active,
        categoryId: req.body.categoryId
    };

    Type.create(type)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the type.",
            });
        });
};

// find all types
exports.findAll = (req, res) => {
    const id = req.query.id;
    var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

    Type.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving types",
            });
        });
};

// Find all items in the database with a specific categoryId
exports.findAllByCategoryId = (req, res) => {
    const categoryId = req.params.categoryId;

    Type.findAll({ where: { categoryId: categoryId } })
        .then((data) => {
            if (data.length > 0) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find items with categoryId=${categoryId}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving items with categoryId=" + categoryId,
            });
        });
};

exports.findAllByManyCategoryIds = (req, res) => {
    // Convert string param to number array
    const categoryIds = req.params.categoryIds.split(',').map(Number);

    Type.findAll({
        where: { categoryId: { [Op.in]: categoryIds } }
    })
        .then((data) => {
            if (data.length > 0) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find items with categoryId=${categoryIds}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving items with categoryId=" + categoryIds,
            });
        });
}

// Find a single Type with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Type.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Type with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Type with id=" + id,
            });
        });
};

// Update a Type by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Type.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Type was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update Type with id=${id}. Maybe Type was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Type with id=" + id,
            });
        });
};

// Delete a Type with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Type.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Type was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete Type with id=${id}. Maybe Type was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete Type with id=" + id,
            });
        });
};

// Delete all Types from the database.
exports.deleteAll = (req, res) => {
    Type.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({ message: `${nums} Types were deleted successfully!` });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all types.",
            });
        });
};
