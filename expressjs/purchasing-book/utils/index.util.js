exports.getToken = (rawToken) => {
  let token = rawToken.split(' ')[1];

  return token;
};

exports.decodeBasicAuth = (rawEncoded) => {
  let encoded = rawEncoded.split(' ')[1];
  let decoded = Buffer.from(encoded, 'base64').toString();
  let name = decoded.split(':')[0];
  let password = decoded.split(':')[1];

  return {
    name,
    password,
  };
};

exports.handleDueDateCreditTerm = async (totalPrice, lengthOfMonth, targetTerm = null, additionalPrice = 0) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Desember'];

  let message = '';
  let isTermExist = false;
  let currentDate = new Date();
  const duePayments = [];
  currentDate.setMonth(currentDate.getMonth() + 1);

  let currentYear = currentDate.getFullYear();
  let currentDay = currentDate.getDate();
  let currentMonth = currentDate.getMonth();
  //   let pricePerMonth = totalPrice / lengthOfMonth;
  let priceInMonths = [];
  let pricePerMonth = Math.floor(totalPrice / lengthOfMonth);
  let remaining = totalPrice % lengthOfMonth;

  for (let index = 0; index < lengthOfMonth; index++) {
    if (index === lengthOfMonth - 1) {
      priceInMonths.push(Math.ceil(pricePerMonth + remaining));
    } else {
      priceInMonths.push(Math.ceil(pricePerMonth));
    }

    if (currentMonth > 11) {
      currentYear = currentDate.getFullYear() + 1;
      currentDate = new Date(currentDate.getFullYear() + 1, 0);
      currentMonth = 0;
    }

    let lastDayThisMonth = new Date(currentDate.getFullYear(), currentMonth + 1, 0);
    let handleCurrentDayLastDay = currentDay > lastDayThisMonth.getDate() ? lastDayThisMonth.getDate() : currentDay;

    currentDate.setDate(currentDate.getDate());
    // duePayments.push({
    //   year: currentYear,
    //   month: months[currentMonth],
    //   day: handleCurrentDayLastDay,
    //   amount: priceInMonths[index],
    //   due_date: `${currentYear} ${months[currentMonth]} ${handleCurrentDayLastDay}`,
    // });
    duePayments.push({
      date: `${currentYear}-${currentMonth + 1}-${handleCurrentDayLastDay}`,
      amount: priceInMonths[index],
    });

    currentMonth++;
  }

  console.log('\n======= DUE PAYMENTS ========');
  let totalPriceInTerm = 0;
  duePayments.map((duePayment, idx) => {
    // console.log(`${idx + 1} - [${duePayment.year}] ${duePayment.month}, ${duePayment.day}   >>    ${duePayment.amount}`);
    console.log(`${idx + 1} - [${duePayment.date}]  >>    ${duePayment.amount}`);
    totalPriceInTerm += duePayment.amount;
  });
  console.log('targetTerm', targetTerm);
  if (targetTerm) {
    // handle not exist index
    if (duePayments[targetTerm - 1] !== undefined) {
      console.log('additionalPrice', additionalPrice);
      if (additionalPrice >= 0) {
        isTermExist = true;
        duePayments[targetTerm - 1].amount += additionalPrice;
      } else {
        isTermExist = false;
        message = `additional_price should be greater then equal 0`;
      }
    } else {
      isTermExist = false;
      message = `can't update price of term in ${targetTerm} order, cause it not exist.`;
    }
  }

  console.log(duePayments);

  console.log('total price in term', totalPriceInTerm);
  console.log('totalPrice', totalPrice);
  console.log('total price === total price in term ?', totalPriceInTerm === totalPrice);
  console.log('isTermExist', isTermExist);
  return { duePayments, message, isTermExist };
};

exports.distincTermAmountAsArray = (termPayments) => {
  const resultTerms = [];
  const distinctTerms = new Set();

  termPayments?.map((termPayment) => {
    distinctTerms.add(termPayment?.amount);
  });

  for (let distincTerm of distinctTerms) {
    resultTerms.push(distincTerm);
  }

  return resultTerms;
};

exports.mapTermPaymentDateAsKey = (termPayments) => {
  let resultObjectMap = {};
  const rawMapTerm = new Map();

  termPayments?.map((termPayment) => {
    rawMapTerm.set(termPayment?.date, termPayment);
  });

  rawMapTerm.forEach((val, key) => {
    let currentObj = Object.assign({}, val);
    Object.assign(resultObjectMap, {
      [key]: currentObj,
    });
  });

  return { resultObjectMap, rawMapTerm };
};

exports.handleTermToPay = (mapTermPayments, targetTerm) => {
  let result = null;

  if (mapTermPayments.has(targetTerm)) {
    result = mapTermPayments.get(targetTerm);
  }

  return result;
};

exports.baseResponse = (res, { success = true, data = null, response = { code: 200, message: null, error: null } }) => {
  res.status(response.code).json({
    data: data,
    success: success,
    response: {
      code: response.code,
      message: response.message,
      error: response.error,
    },
  });
};
