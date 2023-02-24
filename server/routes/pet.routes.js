const PetController = require('../controllers/pets.controller');
module.exports = function(app){
    app.get('/api', PetController.index);
    app.get('/api/pets', PetController.getAll);
    app.post('/api/pet', PetController.create);
    app.get('/api/pet/:id', PetController.find);
    app.put('/api/pet/:id', PetController.update);
}
