const db = require("../models");
const User = db.user;
const Person = db.person;
const UserCategory = db.userCategory;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!(req.body.roleId || req.body.personId)) {
    res.status(400).send({
      message: "IDs can not be empty!",
    });
    return;
  }

  // Create a User
  const user = {
    roleId: req.body.roleId,
    personId: req.body.personId
  };

  // Save User in the database
  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User.",
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  User.findAll({
    include: [
      {
        model: Person,
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id, {
    include: [
      {
        model: Person,
      },
    ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id,
      });
    });
};

exports.findOneByEmail = async (req, res) => {
  const email = req.params.id;

  try {
    const person = await Person.findOne({ where: { email: email } });
    const user = await User.findOne({
      where: { personId: person.campusId },
      include: [{ model: Person }]
    });
    res.send(user);
  }
  catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while finding this person"
    });
  }
};

exports.findAllCategoriesForUser = (req, res) => {
  const userId = req.params.id;

  UserCategory.findAll({
    where: { userId: userId },
    include: {
      model: db.category
    }
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find categories for User with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User categories with userid=" + id,
      });
    });
}

exports.findAllCategoryIdsForUser = (req, res) => {
  const userId = req.params.id;

  UserCategory.findAll({
    attributes: [categoryId],
    where: { userId: userId }
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find categories for User with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User categories with userid=" + id,
      });
    });
}

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users.",
      });
    });
};
