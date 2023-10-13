const Cron = require('cron');
const songService = require('../services/song.service');
const { RUN_CRON } = require('../config/app.config');

exports.playSongCron = new Cron.CronJob(
  '0 */5 * * * *',
  async function () {
    if (RUN_CRON) {
      try {
        songService.playSong();
      } catch (error) {
        console.log(error.message);
      }
    } else {
      console.log('no job to run');
    }
  },
  null,
  true,
  'Asia/Jakarta'
);
