const CreateServer = require('./utils/server')
const mongoose = require('mongoose')
require('dotenv').config()

const PORT = 3000
const app = CreateServer()

// bodyParser usage and configs

// connect to mongodb
async function main () {
  await mongoose.connect(process.env.MONGO_DB_URL)
}
main().catch(err => console.log(err))

app.listen(process.env.PORT, () => {
  console.log('server working successfully at port: ' + PORT)
})

module.exports = app
