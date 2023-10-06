const moment = require('moment');

function runMoment(dateValueString) {
  const formatDateString = 'DD-MM-YYYY';
  const formatDateTimeString = 'DD-MM-YYYY HH:mm:s';
  if (!dateValueString && !moment(dateValueString, formatDateString, true).isValid()) {
    return 'invalid format';
  }

  return {
    date_plus_2_hours: moment(dateValueString, formatDateString, true).add(2, 'hours').format(formatDateTimeString),
    date_plus_5_days: moment(dateValueString, formatDateString, true).add(5, 'days').format(formatDateTimeString),
    date_plus_1_week: moment(dateValueString, formatDateString, true).add(1, 'weeks').format(formatDateTimeString),
    date_minus_5_days: moment(dateValueString, formatDateString, true).subtract(5, 'days').format(formatDateTimeString),
    date_start_of_week: moment(dateValueString, formatDateString, true).startOf('week').format(formatDateTimeString),
    date_end_of_month: moment(dateValueString, formatDateString, true).endOf('month').format(formatDateTimeString),
  };
}

const result = runMoment('06-01-2023');
console.log(result);
