const db = require("../models");
const ItemInformation = db.itemInformation; // Adjust the model name if needed
const Op = db.Sequelize.Op;

// Create and Save a new Item Information
exports.create = (req, res) => {
    if (!req.body.information || !req.body.itemId) {
        res.status(400).send({
            message: "Information and ItemId are required fields",
        });
        return;
    }

    const itemInformation = {
        information: req.body.information,
        itemId: req.body.itemId,
    };

    ItemInformation.create(itemInformation)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the item information.",
            });
        });
};

// Retrieve all Item Informations
exports.findAll = (req, res) => {
    const id = req.query.id;
    var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

    ItemInformation.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving item informations",
            });
        });
};

// Find a single Item Information with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    ItemInformation.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Item Information with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Item Information with id=" + id,
            });
        });
};

exports.findAllForItem = async(req, res) => {
    const itemId = req.params.itemId;
    try{
        const data = await ItemInformation.findAll({where: [{itemId: itemId}]});
        if(data){
            res.send(data);
        }
    }
    catch(err){
        res.status(500).send({
            message: "Error retrieving Item Information with id=" + id,
        });
    }
};

// Update an Item Information by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    ItemInformation.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Item Information was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update Item Information with id=${id}. Maybe Item Information was not found or req.body is empty!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Item Information with id=" + id,
            });
        });
};

// Delete an Item Information with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    ItemInformation.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Item Information was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete Item Information with id=${id}. Maybe Item Information was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete Item Information with id=" + id,
            });
        });
};

// Delete all Item Informations from the database.
exports.deleteAll = (req, res) => {
    ItemInformation.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({ message: `${nums} Item Informations were deleted successfully!` });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all item informations.",
            });
        });
};
