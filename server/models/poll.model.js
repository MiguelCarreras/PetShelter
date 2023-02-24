const mongoose = require('mongoose');
const PollSchema = new mongoose.Schema({
    question: { type: String },
    option1: { type: String },
    option2: { type: String },
    option3: { type: String },
    option4: { type: String }
}, { timestamps: true });
module.exports.Poll = mongoose.model('Poll', PollSchema);

