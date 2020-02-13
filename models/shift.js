const mongoose = require('mongoose')

const shiftSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    payBoost: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model('Shift', shiftSchema)