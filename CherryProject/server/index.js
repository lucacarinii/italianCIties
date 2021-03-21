import exrpress from 'express'
import mongoose from 'mongoose'
import { updateDataJob } from './jobs/insertCities.js'
import { deleteRecords } from './jobs/deleteRecords.js'
import listAllCities from './routes/listOfAllCities.js'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()
const App = exrpress()

App.use(cors())
App.use('/cities', listAllCities)

App.get('/', (req, res) => {
  res.send('Cities API')
})

mongoose
  .connect(process.env.URL_DBCONNECTION, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    App.listen(process.env.PORT || 5000, () => {
      console.log('Connesso')
      deleteRecords()
      updateDataJob()
    })
  })
  .catch((err) => {
    console.error(err)
  })
