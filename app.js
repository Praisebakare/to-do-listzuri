const express = require("express")
const route = require("./routes/tasks")
const connectDB = require("./db/connectDB")
const notFound = require('./middleware/NOT_FOUND')
const errorHandler = require('./middleware/error_handler')
require("dotenv").config()
const cors = require('cors')

const port = process.env.PORT || 4000
const app = express()

app.use('/api/v1/tasks', route)

app.use(express.json())
app.use(express.static('./public'))
app.use(cors())

app.use(notFound)

app.use(errorHandler)

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL)
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    } catch(error){
        console.log(error)
    }
}

start()