const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    description: {
        type: String,
        required: true
    },
    salaryPerMonth: {
        type: Number,
        required: true
    }, 
})

module.exports = mongoose.model('Role', roleSchema)