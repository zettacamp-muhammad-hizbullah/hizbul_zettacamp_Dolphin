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

exports.handleDueDateCreditTerm = async (totalPrice, lengthOfMonth) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Desember'];

  let message = '';
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
      priceInMonths.push(pricePerMonth + remaining);
    } else {
      priceInMonths.push(pricePerMonth);
    }

    if (currentMonth > 11) {
      currentYear = currentDate.getFullYear() + 1;
      currentDate = new Date(currentDate.getFullYear() + 1, 0);
      currentMonth = 0;
    }

    let lastDayThisMonth = new Date(currentDate.getFullYear(), currentMonth + 1, 0);
    let handleCurrentDayLastDay = currentDay > lastDayThisMonth.getDate() ? lastDayThisMonth.getDate() : currentDay;

    currentDate.setDate(currentDate.getDate());
    duePayments.push({
      year: currentYear,
      month: months[currentMonth],
      day: handleCurrentDayLastDay,
      amount: priceInMonths[index],
      due_date: `${currentYear} ${months[currentMonth]} ${handleCurrentDayLastDay}`,
    });

    currentMonth++;
  }

  console.log('\n======= DUE PAYMENTS ========');
  let totalPriceInTerm = 0;
  duePayments.map((duePayment, idx) => {
    console.log(`${idx + 1} - [${duePayment.year}] ${duePayment.month}, ${duePayment.day}   >>    ${duePayment.amount}`);
    totalPriceInTerm += duePayment.amount;
  });

  console.log(duePayments);

  console.log('total price in term', totalPriceInTerm);
  console.log('total price === total price in term ?', totalPriceInTerm === totalPrice);
  return { duePayments, message };
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
