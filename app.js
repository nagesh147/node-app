const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')

//CORS
const cors = require('cors')

// create our express app
const app = express()

//CORS options
var corsOptions = {
  origin: 'http://localhost:3001',
}
app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
)

const db = require('../node-app/models')
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to Mangoose database!')
  })
  .catch((err) => {
    console.log('Cannot connect to Mangoose database!', err)
    process.exit()
  })

// simple route
app.get('/', (req, res) => {
  // res.json({ message: 'Welcome to Node App' })
  res.send('Welcome to Node App')
})

require('../node-app/routes/policies.routes')(app)

// set port, listen for requests
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
