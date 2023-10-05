const moment = require('moment');

function runMoment(dateValueString, dateValueObject) {
  const formatDateString = 'DD-MM-YYYY';
  if (
    (!moment(dateValueString, formatDateString, true).isValid() && dateValueObject) ||
    !moment(dateValueObject.date, formatDateString, true).isValid()
  ) {
    return 'invalid format';
  }

  const currentDate = moment(dateValueString, formatDateString, true);
  const dateTimeObject = dateValueObject;

  let dateTimeString = '';
  if (dateTimeObject && typeof dateTimeObject === 'object') {
    if (dateTimeObject.date && moment(dateTimeObject.date, formatDateString, true).isValid()) {
      dateTimeString += dateTimeObject.date;
    } else {
      return 'invalid date';
    }

    if (dateTimeObject.time) {
      dateTimeString += ` ${dateTimeObject.time}`;
    }
  }

  return {
    currentDate: moment(),
    dateTimeFromString: currentDate,
    dateTimeFromObject: moment(dateTimeString, formatDateString),
    currentDateUTC: moment().utc(),
    isValidDateStringInput: moment(dateValueString, formatDateString, true).isValid(),
    validDateStringInputValue: moment(dateValueString, formatDateString, true),
  };
}

const objectDate = {
  date: '10-10-2022',
  time: '17:12:02',
};

// const result = runMoment('2023-01-10', objectDate);
const result = runMoment('10-01-2022', objectDate);
console.log(result);