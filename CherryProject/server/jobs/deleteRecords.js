import cron from "cron"
import City from "../model/city.js"

export const deleteRecords = () => {
    var job = new cron.CronJob('0 0 0 * * *', () => {
        City.deleteMany({}, (err) => {
            if (err) {
                console.error(err)
            } else {
                console.log('Cancellati')
            }
        })
    })
    job.start()
}