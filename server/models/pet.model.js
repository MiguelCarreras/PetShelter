const mongoose = require('mongoose');
const PetSchema = new mongoose.Schema({
    name: { type: String,
            required: true,
            minLength: 3 },
    type: { type: String,
            required: true,
            minLength: 3 },
    description: { type: String,
                   required: true,
                   minLength: 3 },
    skill1: { type: String },
    skill2: { type: String },
    skill3: { type: String },
    likes: { type: Number, 
             default: 0,
             required: true,
             min: 0 } 
}, { timestamps: true });
module.exports.Pet = mongoose.model('Pet', PetSchema);
