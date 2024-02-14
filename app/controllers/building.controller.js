const db = require("../models");
const Building = db.building; 
const Op = db.Sequelize.Op;

// Create and Save a new Building
exports.create = (req, res) => {
    if (!req.body.buildingTag) {
        res.status(400).send({
            message: "Content cannot be empty",
        });
        return;
    }

    const building = {
        buildingTag: req.body.buildingTag,
        buildingName: req.body.buildingName,
        yearBuilt: req.body.yearBuilt,
        sqFeet: req.body.sqFeet,
        numStories: req.body.numStories,
        hasElevator: req.body.hasElevator || null,
        hasFireMonitor: req.body.hasFireMonitor || null,
        hasFireAlarm: req.body.hasFireAlarm || null,
        fireSmokeNotes: req.body.fireSmokeNotes || null,
        construction: req.body.construction || null,
        value: req.body.value || null,
    };

    Building.create(building)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the building.",
            });
        });
};

// Retrieve all Buildings
exports.findAll = (req, res) => {
    const id = req.query.id;
    var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

    Building.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving buildings",
            });
        });
};

// Find a single Building with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Building.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Building with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Building with id=" + id,
            });
        });
};

// Update a Building by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Building.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Building was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update Building with id=${id}. Maybe Building was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Building with id=" + id,
            });
        });
};

// Delete a Building with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Building.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Building was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete Building with id=${id}. Maybe Building was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete Building with id=" + id,
            });
        });
};

// Delete all Buildings from the database.
exports.deleteAll = (req, res) => {
    Building.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({ message: `${nums} Buildings were deleted successfully!` });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all buildings.",
            });
        });
};
