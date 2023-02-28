const mongoose = require('mongoose');
const PetSchema = new mongoose.Schema({
    name: { type: String },
    type: { type: String },
    description: { type: String },
    skill1: { type: String },
    skill2: { type: String },
    skill3: { type: String },
    likes: { type: Number, default: 0 } 
}, { timestamps: true });
module.exports.Pet = mongoose.model('Pet', PetSchema);

