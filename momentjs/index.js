const moment = require('moment');

function runMoment(dateStringOne, dateStringTwo) {
  const formatDateString = 'DD-MM-YYYY';
  const formatDateIndonesia = 'dddd, DD MMMM YYYY [pukul] HH:mm:ss [GMT]Z';

  if (
    (!dateStringOne && !moment(dateStringOne, formatDateString, true).isValid()) ||
    (!dateStringTwo && !moment(dateStringTwo, formatDateString, true).isValid())
  ) {
    return 'invalid format';
  }

  const isParamOneSameParamTwo = moment(dateStringOne, formatDateString, true).isSameOrAfter(moment(dateStringTwo, formatDateString, true));
  if (isParamOneSameParamTwo) {
    console.log('first paramenter is same or after with second paramenter ✅');
  } else {
    console.log('first paramenter is not same or after with second paramenter ❌');
  }

  const isCurrentDateBetweenParamOneAndParamTwo = moment().isBetween(
    moment(dateStringOne, formatDateString, true),
    moment(dateStringTwo, formatDateString, true)
  );
  if (isCurrentDateBetweenParamOneAndParamTwo) {
    console.log('current date is between first param and second param ✅');
  } else {
    console.log('current date is not between first param and second param ❌');
  }

  // console.log(
  //   'isSameOrAfter',
  //   moment(dateStringOne, formatDateString, true).isSameOrAfter(moment(dateStringTwo, formatDateString, true), 'year')
  // );

  return {
    indonesia_date_format: {
      wib: moment(dateStringOne, formatDateString, true).locale('id').format(formatDateIndonesia),
      wita: moment(dateStringOne, formatDateString, true).locale('id').utcOffset(480).format(formatDateIndonesia),
      wit: moment(dateStringOne, formatDateString, true).locale('id').utcOffset('+09:00').format(formatDateIndonesia),
    },
    different_in_weeks: moment(dateStringOne, formatDateString, true).diff(moment(dateStringTwo, formatDateString, true), 'week', false),
    is_date_one_same_or_after_date_two: isParamOneSameParamTwo,
    is_current_date_between_date_one_and_date_two: isCurrentDateBetweenParamOneAndParamTwo,
  };
}

console.log("======== 111111");
const result = runMoment('12-09-2023', '09-10-2023');
console.log(result, '\n\n');

console.log("======== 222222222");
const result2 = runMoment('08-10-2023', '10-10-2023');
console.log(result2, '\n\n');

console.log("======== 3333333");
const result3 = runMoment('21-10-2023', '01-10-2023');
console.log(result3, '\n\n');
