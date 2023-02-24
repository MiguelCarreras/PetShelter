const PollController = require('../controllers/poll.controller');
module.exports = function(app){
    app.get('/api', PollController.index);
    app.post('/api/poll', PollController.create);
}
