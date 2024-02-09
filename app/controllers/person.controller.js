const db = require("../models");
const Person = db.person;
const Op = db.Sequelize.Op;

//create a new person 
exports.create = (req, res) =>{
    if(!req.body.campusid){
        res.status(400).send({
            message: "content cannot be empty"
        });
    }
    const person = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        campusId: req.body.campusId
    };

    Person.create(person)
        .then((data) => {
            res.send(data);
        })
        .catch((err)=>{
            res.status(500).send({
                message: err.message || "Some error occured while creating a person"
            });
        });
};
//retrieve all people
exports.findAll = (req, res) =>{
    const id = req.queury.campusId;
    var condition = id ? {id: {[Op.like]: `%${id}%`}} : null;
    Person.findAll({ where: condition})
        .then((data) =>{
            console.log(data);
            res.send(data);
        }) 
        .catch((err)=>{
            res.status(500).send({
                message: 
                err.message || "Some error occured while trying to find people"
            });
        });
};

//retrieve a person by campusId
exports.findPersonById = (req, res) =>{
    const campusId = req.params.campusId;
    Person.findAll({where: {campusId: campusId}})
        .then((data) =>{
            if(data){
                res.send(data);
            }
            else{
                res.status(404).send({
                    message: `Cannot find person with Id number ${campusId}`
                });
            }
        })
        .catch((err)=>{
            res.status(500).send({
                message: err.message || "error retrieving person with id " + campusId,
            });
        });
};
//update person
exports.updatePerson = (req, res) =>{
    const campusId = req.params.campusId;
    Person.update(req.body, {
        where: { campusId: campusId},
    })
        .then((num) =>{
            if(num ==1){
                res.send({
                    message: "User was updated successfully.",
                });
            }else{
                res.send({
                    message: `Cannot update user with campus id = ${campusId}`
                });
            }
        })
        .catch((err) =>{
            res.status(500).send({
                message: "Error updating a person with id = " + campusId
            });
        });
};
//delete person
exports.deletePerson = (req, res) =>{
    const campusId = req.params.campusId;
    Person.destroy({
        where: {campusId: campusId}    
    })
    .then((num)=>{
        if(num == 1){
            res.send({
                message: "Person was successfully deleted"
            });
        }
        else{
            res.send({
                message: `cannot delete person with id = ${campusId} because the id was not found`
            });
        }
    })
    .catch((err)=>{
        res.status(500).send({
            message: "could not delete person with id " + campusId
        });
    });
};