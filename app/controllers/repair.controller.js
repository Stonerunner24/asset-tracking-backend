const db = require("../models");
const Repair = db.repair; 
const Op = db.Sequelize.Op;

// Create and Save a new Repair
exports.create = (req, res) => {
    if (!req.body.date || !req.body.condition) {
        res.status(400).send({
            message: "Date and Condition are required fields",
        });
        return;
    }

    const repair = {
        notes: req.body.notes || null,
        date: new Date(req.body.date),
        problems: req.body.problems || null,
        condition: req.body.condition,
    };

    Repair.create(repair)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the repair.",
            });
        });
};

// Retrieve all Repairs
exports.findAll = (req, res) => {
    const id = req.query.id;
    var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

    Repair.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving repairs",
            });
        });
};

// Find a single Repair with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Repair.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Repair with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Repair with id=" + id,
            });
        });
};

// Update a Repair by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Repair.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Repair was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update Repair with id=${id}. Maybe Repair was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Repair with id=" + id,
            });
        });
};

// Delete a Repair with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Repair.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Repair was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete Repair with id=${id}. Maybe Repair was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete Repair with id=" + id,
            });
        });
};

// Delete all Repairs from the database.
exports.deleteAll = (req, res) => {
    Repair.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({ message: `${nums} Repairs were deleted successfully!` });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all repairs.",
            });
        });
};
