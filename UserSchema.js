const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: 'Unknown'
    },

    age: {
        type: Number,
        required: true,
        default: 0
    },

    favoriteFoods: {
        type: [String],
        required: true,
        default: ['Sand', 'water']
    }
})

module.exports = mongoose.model('Account', userSchema)