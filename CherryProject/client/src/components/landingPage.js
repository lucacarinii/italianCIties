import { useState } from 'react'
import axios from 'axios'
import _ from 'lodash'

const pageSize = 50

const Main = (props) => {
  const [cities, setCities] = useState(null)
  const [paginatedCities, setPaginatedCities] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  let cityName = ''
  let isSuppressed = ''
  let province = ''
  let cityCode = ''
  let suppressionDate = ''

  const getData = (
    cityName,
    province,
    cityCode,
    isSuppressed,
    suppressionDate
  ) => {
    axios
      .get(
        `https://cherry-project.herokuapp.com/cities/listOfAllCities?name=${cityName}&province=${province}&cityCode=${cityCode}&isSuppressed=${isSuppressed}&suppressionDate=${suppressionDate}`,
        { headers: { 'Access-Control-Allow-Origin': 'true' } }
      )
      .then((res) => {
        setCities(res.data)
        setPaginatedCities(_(res.data).slice(0).take(pageSize).value())
      })
  }

  useState(() => {
    getData(cityName, province, cityCode, isSuppressed, suppressionDate)
  }, [props.name])

  const handleSubmit = (event) => {
    event.preventDefault()
    const cityNameParam = cityName
    const provinceParam = province
    const cityCodeParam = cityCode
    const isSuppressedParam = isSuppressed
    const suppressionDateParam = suppressionDate

    getData(
      cityNameParam.trim(),
      provinceParam.trim(),
      cityCodeParam.trim(),
      isSuppressedParam,
      suppressionDateParam.trim()
    )
  }

  const handleInputChange = (event) => {
    event.preventDefault()
    switch (event.target.name) {
      case 'cityName':
        cityName = event.target.value
        break
      case 'province':
        province = event.target.value
        break
      case 'cityCode':
        cityCode = event.target.value
        break
      case 'isSuppressed':
        isSuppressed =
          event.target.value === 'Suppressed ( True / False )'
            ? ''
            : event.target.value
        break
      case 'suppressionDate':
        suppressionDate = event.target.value
        break
      default:
        break
    }
  }

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber)
    const startIndex = (pageNumber - 1) * pageSize
    const paginated = _(cities).slice(startIndex).take(pageSize).value()
    setPaginatedCities(paginated)
  }
  const pageCount = cities ? Math.ceil(cities.length / pageSize) : 0
  const pages = _.range(1, pageCount + 1)
  return (
    <div style={{ marginTop: '2%', width: '100%', height: '100%' }}>
      {!paginatedCities ? (
        <div
          style={{ position: 'absolute', left: '50%' }}
          className="spinner-grow"
          role="status"
        >
          <span className="visually-hidden"></span>
        </div>
      ) : (
        <div style={{ width: '85%', height: '100%', margin: '0 auto' }}>
          <form onSubmit={handleSubmit} method="Get">
            <div className="form-row">
              <div className="form-group col-md-6">
                <p>
                  <input
                    placeholder="City Name"
                    className="form-control"
                    type="text"
                    name="cityName"
                    onChange={handleInputChange}
                  />
                </p>
              </div>
              <div className="form-group col-md-2">
                <p>
                  <input
                    placeholder="Province"
                    className="form-control"
                    type="text"
                    name="province"
                    onChange={handleInputChange}
                  />
                </p>
              </div>
              <div className="form-group col-md-4">
                <p>
                  <input
                    placeholder="City Code"
                    className="form-control"
                    type="text"
                    name="cityCode"
                    onChange={handleInputChange}
                  />
                </p>
              </div>
            </div>
            <div className="form-row">
              <div className="col-md-6">
                <p>
                  <select
                    name="isSuppressed"
                    onChange={handleInputChange}
                    className="form-control"
                  >
                    <option>Suppressed ( True / False )</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                </p>
              </div>
              <div className="col-md-6">
                <p>
                  <input
                    placeholder="Suppressed Date (yyyy-mm-dd)"
                    className="form-control"
                    type="text"
                    name="suppressionDate"
                    onChange={handleInputChange}
                  />
                </p>
              </div>
            </div>
            <p>
              <button className="btn btn-primary">Search</button>
            </p>
          </form>
          <table style={{ marginTop: '5%' }} className="table">
            <thead className="thead-dark">
              <tr>
                <th>City Name</th>
                <th>Province</th>
                <th>City Code</th>
                <th>Suppressed</th>
                <th>Suppression Date</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCities.map((city, index) => (
                <tr key={index}>
                  <td>{city.name}</td>
                  <td>{city.province}</td>
                  <td>{city.cityCode}</td>
                  <td>{!city.isSuppressed ? 'No' : 'Yes'}</td>
                  <td>{city.suppressionDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text">Pages</label>
            </div>
            <select
              className="custom-select"
              onChange={(e) => {
                pagination(e.target.value)
              }}
            >
              {pages.map((page) => (
                <option key={page} value={page}>
                  {page}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  )
}

export default Main
