import City from '../model/city.js'

export const getAllCities = async (req, res) => {
  try {
    var name = ''
    var province = ''
    var cityCode = ''
    var isSuppressed = ''
    var suppressionDate = ''

    req.query.name
      ? (name = req.query.name.toUpperCase())
      : (name = { $exists: true })
    req.query.province
      ? (province = req.query.province.toUpperCase())
      : (province = { $exists: true })
    req.query.cityCode
      ? (cityCode = Number(req.query.cityCode).toString())
      : (cityCode = { $exists: true })
    req.query.isSuppressed
      ? (isSuppressed = req.query.isSuppressed)
      : (isSuppressed = { $exists: true })
    req.query.suppressionDate
      ? (suppressionDate = req.query.suppressionDate)
      : (suppressionDate = { $exists: true })

    const cities = await City.find({
      nameUpper: name,
      province: province,
      cityCodeNoZero: cityCode,
      isSuppressed: isSuppressed,
      suppressionDate: suppressionDate,
    })
    res.status(200).json(cities)
  } catch (err) {
    res.status(404).json({ message: err })
  }
}
