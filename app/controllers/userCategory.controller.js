const db = require("../models");
const UserCategory = db.userCategory; // Adjust the model name if needed
const Op = db.Sequelize.Op;

// Create and Save a new UserCategory
exports.create = (req, res) => {
    if (!req.body.userId || !req.body.categoryId) {
        res.status(400).send({
            message: "Content cannot be empty",
        });
        return;
    }

    const userCategory = {
        userId: req.body.userId,
        categoryId: req.body.categoryId
    };

    UserCategory.create(userCategory)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the userCategory.",
            });
        });
};

// Retrieve all UserCategorys
exports.findAll = (req, res) => {
    const id = req.query.id;
    var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

    UserCategory.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving userCategorys",
            });
        });
};

// Find a single UserCategory with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    UserCategory.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find UserCategory with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving UserCategory with id=" + id,
            });
        });
};

// Update a UserCategory by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    UserCategory.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "UserCategory was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update UserCategory with id=${id}. Maybe UserCategory was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating UserCategory with id=" + id,
            });
        });
};

// Delete a UserCategory with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    UserCategory.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "UserCategory was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete UserCategory with id=${id}. Maybe UserCategory was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete UserCategory with id=" + id,
            });
        });
};

// Delete all UserCategorys from the database.
exports.deleteAll = (req, res) => {
    UserCategory.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({ message: `${nums} UserCategorys were deleted successfully!` });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all userCategorys.",
            });
        });
};
