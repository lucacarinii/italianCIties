import express from "express"
import { getAllCities } from "../controllers/listAllCities.js"

const router = express.Router()

router.get('/listOfAllCities', getAllCities)


export default router