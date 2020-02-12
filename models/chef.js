const mongoose = require('mongoose')

const chefSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    professional: {
        type: Boolean,
        required: true
    },
})

module.exports = mongoose.model('Chef', chefSchema)