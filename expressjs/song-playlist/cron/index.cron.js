const { playSongCron } = require("./run-song.cron")

module.exports = async function() {
    playSongCron.start()
}