const { Pet } = require("../models/pet.model");

module.exports.index = (request, response) => {
    response.json({
        message: "Hello World"
    });
}

module.exports.getAll = async (request, response) => {
    try {
        const pets = await Pet.find({$where: function(){
            return !this.wasAdopted;
        }});
        console.log(pets)
        response.json(pets)
    } catch (error) {
        console.log(error);
        response.status(400)
        response.json(error)
    }
}

module.exports.create = async (request, response) => {
    const { name, type, description, skill1, skill2, skill3 } = request.body;
    const wasAdopted = false;
    Pet.create({
        name,
        type,
        description,
        skill1,
        skill2,
        skill3,
        wasAdopted
    })
        .then(poll => response.json(poll))
        .catch(err => response.json(err));
}

module.exports.find = async (request, response) => {
    try {
        const pet = await Pet.findOne({_id: request.params.id});
        response.json(pet);
    } catch(error) {
        response.error(400);
        response.json(error);
    }
}

module.exports.update = async (request, response) => {
    console.log(request.body);
    try {
        const params = request.body;
        const pet = await Pet.findOneAndUpdate({_id: request.params.id}, params, {new: true});
        response.json(pet);
    } catch(error) {
        response.status(400);
        response.json(error);
    }
}