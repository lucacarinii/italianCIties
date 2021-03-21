import cron from 'cron'
import download from 'download'
import path from 'path'
import dotenv from 'dotenv'
import readXLSX from '../utils/utils.js'

dotenv.config()
const __dirname = path.resolve()
const filePath_list_cities =
  __dirname + '/listOfCities/Elenco-comuni-italiani.xls'
const filePath_list_suppressed_cities =
  __dirname +
  '/listOfCities/Elenco dei comuni soppressi/Elenco comuni soppressi.xls'

const insertCities = () => {
  readXLSX(filePath_list_cities, false)
  console.log('Città non soppresse inserite')
}

const insertSuppressedCities = () => {
  readXLSX(filePath_list_suppressed_cities, true)
  console.log('Città soppresse inserite')
}

export const updateDataJob = () => {
  var job = new cron.CronJob('0 0 0 * * *', () => {
    download(process.env.URL_LIST_CITIES, 'listOfCities')
    console.log('scaricato file lista comuni')
    insertCities()
    download(process.env.URL_SUPPRESSED_CITIES, 'listOfCities', {
      extract: true,
    })
    console.log('scaricato file comuni soppressi')
    insertSuppressedCities()
  })
  job.start()
}
