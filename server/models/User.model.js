const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    username: {
        type: String,
        default: 'Пользователь'
    },
    password : {
        type: String,
        required: true
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User