const moment = require('moment');

function runMoment(dateValueString) {
  const formatDateString = 'DD-MM-YYYY';
  const formatDateTimeString = 'DD-MM-YYYY HH:mm:s';
  if (!dateValueString && !moment(dateValueString, formatDateString, true).isValid()) {
    return 'invalid format';
  }

  return {
    datePlus2Hour: moment(dateValueString, formatDateString, true).add(2, 'hours').format(formatDateTimeString),
    datePlus5Day: moment(dateValueString, formatDateString, true).add(5, 'days').format(formatDateTimeString),
    datePlus1Week: moment(dateValueString, formatDateString, true).add(1, 'weeks').format(formatDateTimeString),
    dateMinus5Day: moment(dateValueString, formatDateString, true).subtract(5, 'days').format(formatDateTimeString),
    dateStartOfWeek: moment(dateValueString, formatDateString, true).startOf('week').format(formatDateTimeString),
    dateEndOfMonth: moment(dateValueString, formatDateString, true).endOf('month').format(formatDateTimeString),
  };
}

const result = runMoment('06-01-2023');
console.log(result);
