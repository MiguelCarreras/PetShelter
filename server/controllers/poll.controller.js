const { Poll } = require("../models/poll.model");

module.exports.index = (request, response) => {
    response.json({
       message: "Hello World"
    });
}

module.exports.create = (request, response) => {
    const { question, option1, option2, option3, option4 } = request.body;
    Poll.create({
        question,
        option1,
        option2,
        option3,
        option4
    })
    .then(poll => response.json(poll))
    .catch(err => response.json(err));
}