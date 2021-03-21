import dateTime from 'date-and-time'
import xlsx from 'xlsx'
import City from '../model/city.js'

const fixDate = (date) => {
  var newDate = new Date(date)

  if (isNaN(newDate.getFullYear())) {
    let newDate = date.toString().split('/')

    if (Number(newDate[0]) < 10) {
      newDate[0] = '0' + Number(newDate[0])
    }
    if (Number(newDate[1]) < 10) {
      newDate[1] = '0' + Number(newDate[1])
    }
    return newDate[2] + '-' + newDate[1] + '-' + newDate[0]
  } else {
    return dateTime.format(newDate, 'YYYY-MM-DD')
  }
}

const readXLSX = (filePath, suppressed) => {
  var flagCity = {}

  let workbook = null
  suppressed
    ? (workbook = xlsx.readFile(filePath, { cellDates: true }))
    : (workbook = xlsx.readFile(filePath))
  let worksheet = workbook.Sheets[workbook.SheetNames[0]]
  var jsonObj = xlsx.utils.sheet_to_json(worksheet)

  jsonObj.forEach((elem) => {
    flagCity = {}
    let newCity = null
    suppressed
      ? (flagCity.name = elem['Denominazione Comune'])
      : (flagCity.name = elem['Denominazione in italiano'])
    suppressed
      ? (flagCity.province = elem['Sigla Automobilistica'])
      : (flagCity.province = elem['Sigla automobilistica'])
    suppressed
      ? (flagCity.cityCode = elem['Codice Comune'])
      : (flagCity.cityCode = elem['Codice Comune formato alfanumerico'])
    suppressed
      ? (flagCity.isSuppressed = true)
      : (flagCity.isSuppressed = false)
    suppressed
      ? (flagCity.suppressionDate = fixDate(elem['Data evento']))
      : (flagCity.suppressionDate = null)
    flagCity.nameUpper = flagCity.name.toUpperCase()
    flagCity.cityCodeNoZero = Number(flagCity.cityCode).toString()

    newCity = new City(flagCity)
    newCity.save((err) => {
      if (err) {
        console.error(err)
      }
    })
  })
}

export default readXLSX
