const db = require("../models");
const Category = db.category;
const Op = db.Sequelize.Op;

// Create and Save a new Category
exports.create = (req, res) => {
    if (!req.body.catName || req.body.active === undefined) {
        res.status(400).send({
            message: "Content cannot be empty",
        });
        return;
    }

    const category = {
        catName: req.body.catName,
        active: req.body.active,
    };

    Category.create(category)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the category.",
            });
        });
};

// Retrieve all Categories
exports.findAll = (req, res) => {
    const id = req.query.id;
    var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

    Category.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving categories",
            });
        });
};

// Find a single Category with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Category.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Category with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Category with id=" + id,
            });
        });
};

// Find all categories for a given user
exports.findAllForUser = (req, res) => {
    const userId = req.params.userId;

    Category.findAll({
        include: {
            model: db.userCategory,
            attributes: [],
            where: { userId: userId }
        }
    })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving categories",
            });
        });
}

// Find all categories for a given user
exports.findAllIdsForUser = (req, res) => {
    const userId = req.params.userId;

    Category.findAll({
        include: {
            model: db.userCategory,
            attributes: [],
            where: { userId: userId }
        }
    })
        .then((data) => {
            // Flatten data to a single array
            const ids = data.map(category => category.id);
            res.send({ ids });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving category ids",
            });
        });
}

// Update a Category by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Category.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Category was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update Category with id=${id}. Maybe Category was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Category with id=" + id,
            });
        });
};

// Delete a Category with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Category.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Category was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete Category with id=${id}. Maybe Category was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete Category with id=" + id,
            });
        });
};

// Delete all Categories from the database.
exports.deleteAll = (req, res) => {
    Category.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({ message: `${nums} Categories were deleted successfully!` });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all categories.",
            });
        });
};
