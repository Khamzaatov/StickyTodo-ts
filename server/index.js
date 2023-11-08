const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()

const app = express()


app.use(express.json())
app.use(cors())
app.use(require('./routes/todo.route'))
app.use(require('./routes/user.route'))

app.get("/", (req, res) => {
    res.json('Hello my friend!')
})

mongoose.set('strictQuery', false)

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO)

        app.listen(4000, () => {
            console.log('Connecteeeeeeed')
        })
    } catch (error) {
        console.log(error, 'Ошибка сервера!')
    }
}

start()
 
