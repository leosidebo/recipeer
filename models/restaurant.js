const mongoose = require('mongoose')
const Role = require('./role')
const Chef = require('./chef')

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    employees: {
        type: Array,
        required: true
    }
})