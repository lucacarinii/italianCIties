import mongoose from "mongoose"

const citySchema = mongoose.Schema({
    name: String,
    province: String,
    cityCode: String,
    isSuppressed: Boolean,
    suppressionDate: String,
    nameUpper: String,
    cityCodeNoZero: String
})

const City = mongoose.model('City', citySchema)

export default City