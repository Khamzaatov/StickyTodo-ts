const mongoose = require('mongoose')
const todoSchema = mongoose.Schema({
    userId : {
        ref: 'User',
        type: mongoose.SchemaTypes.ObjectId
    },
    todos : [
            new mongoose.Schema({
                    title : {
                        type: String,
                    },
                    text: {
                        type: String,
                    },
                    completed : {
                        type : Boolean,
                        default : false
                    }  
            }, {timestamps: true})
    ],
})


const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo 