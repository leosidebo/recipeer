const mongoose = require('mongoose')
const Role = require('./role')

const chefSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    hoursPerWeek: {
        type: Number,
        required: true
    },
    shift: {
        type: String, 
        required: true
    },
    yearsWorked: { // Consider making type: Date instead
        type: Number,
        required: true
    }
})

// Should also have a restaurant associated with them

module.exports = mongoose.model('Chef', chefSchema)