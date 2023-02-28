const { Pet } = require("../models/pet.model");
const { io } = require("../server");

module.exports.index = (request, response) => {
    response.json({
        message: "Hello World"
    });
}

module.exports.getAll = async (request, response) => {
    try {
        const pets = await Pet.find({});
        response.json(pets)
    } catch (error) {
        console.log(error);
        response.status(400)
        response.json(error)
    }
}

module.exports.create = async (request, response) => {
    try {
        const { name, type, description, skill1, skill2, skill3 } = request.body;
        const wasAdopted = false;
        const pet = await Pet.create({
            name,
            type,
            description,
            skill1,
            skill2,
            skill3,
            wasAdopted
        });
        response.json(pet);
    } catch (error) {
        response.error(400);
        response.json(error);
    }
}

module.exports.find = async (request, response) => {
    try {
        const pet = await Pet.findOne({ _id: request.params.id });
        response.json(pet);
    } catch (error) {
        response.error(400);
        response.json(error);
    }
}

module.exports.update = async (request, response) => {
    console.log(request.body);
    try {
        const params = request.body;
        const pet = await Pet.findOneAndUpdate({ _id: request.params.id }, params, { new: true });
        response.json(pet);
    } catch (error) {
        response.status(400);
        response.json(error);
    }
}

module.exports.delete = async (request, response) => {
    try {
        await Pet.deleteOne({ _id: request.params.id });
        response.status(200);
        response.json({_id: request.params.id });
    } catch (error) {
        response.status(400);
        response.json(error);
    }
}

module.exports.like = async (request, response) => {
    try {
        const pet = await Pet.findOne({ _id: request.params.id });
        const likedPet = await Pet.findOneAndUpdate({_id: request.params.id}, {likes: pet.likes + 1}, { new: true });
        response.status(200);
        response.json(likedPet);
    } catch (error) {
        response.status(400);
        response.json(error);
    }
}