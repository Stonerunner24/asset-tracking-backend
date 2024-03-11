const db = require("../models");
const Room = db.room; // Adjust the model name if needed
const Op = db.Sequelize.Op;

// Create and Save a new Room
exports.create = (req, res) => {
    if (!req.body.roomNum || !req.body.buildingId) {
        res.status(400).send({
            message: "Content cannot be empty",
        });
        return;
    }

    const room = {
        roomNum: req.body.roomNum,
        buildingId: req.body.buildingId
    };

    Room.create(room)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the room.",
            });
        });
};

// Retrieve all Rooms
exports.findAll = (req, res) => {
    const id = req.query.id;
    var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

    Room.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving rooms",
            });
        });
};

// Find a single Room with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Room.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Room with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Room with id=" + id,
            });
        });
};

// Find all rooms in the database with a specific buildingId
exports.findAllByBuildingId = (req, res) => {
    const buildingId = req.params.buildingId;

    Roomn.findAll({ where: { buildingId: buildingId } })
        .then((data) => {
            if (data.length > 0) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find items with buildingId=${buildingId}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving items with buildingId=" + buildingId,
            });
        });
};

// Update a Room by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Room.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Room was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update Room with id=${id}. Maybe Room was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Room with id=" + id,
            });
        });
};

// Delete a Room with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Room.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Room was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete Room with id=${id}. Maybe Room was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete Room with id=" + id,
            });
        });
};

// Delete all Rooms from the database.
exports.deleteAll = (req, res) => {
    Room.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({ message: `${nums} Rooms were deleted successfully!` });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all rooms.",
            });
        });
};
