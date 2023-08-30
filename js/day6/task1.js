const bookPurchasing = (
  bookDetail = null,
  amountOfStock = 10,
  amountOfPurchasedBook = 1,
  percentageDiscount = 0,
  percentageTax = 11,
  lengthOfMonths = 1
) => {
  let totalPrice = 0;
  let message = '';

  isNaN(amountOfStock) ? (amountOfStock = 10) : (amountOfStock = amountOfStock);
  isNaN(amountOfPurchasedBook) ? (amountOfPurchasedBook = 1) : (amountOfPurchasedBook = amountOfPurchasedBook);

  const validationMessages = validator(amountOfStock, amountOfPurchasedBook, bookDetail, percentageDiscount, percentageTax, lengthOfMonths);

  if (validationMessages.length > 0) {
    console.log('====== ERRORS ======');
    validationMessages.forEach((errorMessage) => {
      console.error(errorMessage);
    });

    message = 'something error';
    return { totalPrice, message };
  }

  const bookTitle = String(bookDetail.title);
  const bookPrice = Number(bookDetail.price);
  const isSoldOut = Boolean(bookDetail.isSoldOut);

  if (isSoldOut === true) {
    message = 'sorry this item is out of stock 🙏🙏';
    return { totalPrice, message };
  }

  console.log('============================');
  console.log(`==== PEMBELIAN BUKU ${bookTitle} ====`);
  console.log('============================\n');

  console.log('==== AMOUNT OF DISCOUNT ====');
  const amountOfDiscount = (bookPrice * percentageDiscount) / 100;
  console.log(amountOfDiscount);

  console.log('\n==== PRICE AFTER DISCOUNT ====');
  const priceAfterDiscount = bookPrice - amountOfDiscount;
  console.log(priceAfterDiscount);

  console.log('\n==== AMOUNT OF TAX ====');
  const amountOfTax = (priceAfterDiscount * percentageTax) / 100;
  console.log(amountOfTax);

  console.log('\n==== PRICE AFTER TAX ====');
  const priceAfterTax = priceAfterDiscount + amountOfTax;
  console.log(priceAfterTax);

  for (let i = 1; i <= amountOfPurchasedBook; i++) {
    if (i > amountOfStock) {
      message = `out of stock, you can buy only ${i} item from ${amountOfPurchasedBook} you requested`;
      break;
    }
    totalPrice += priceAfterTax;
  }

  const finalStock = amountOfStock - amountOfPurchasedBook;
  finalStock > 0 ? (message = `You can purchase ${finalStock} item again`) : (message = `Book can't purchased again`);

  handleDueDateCreditTerm(totalPrice, lengthOfMonth);

  return { totalPrice, message };
};

const validator = (amountOfStock, amountOfPurchasedBook, bookDetail, percentageDiscount, percentageTax, lengthOfMonths) => {
  const errors = [];
  // console.log('validator stock', amountOfStock);
  if (lengthOfMonths < 1) {
    errors.push('invalid month value');
  }

  if (amountOfStock < amountOfPurchasedBook) {
    errors.push('stock empty');
  }

  if (amountOfStock < 0 || amountOfStock % 1 !== 0) {
    errors.push('invalid amount of stock, integer positive number required');
  }

  if (amountOfPurchasedBook < 1 || amountOfPurchasedBook % 1 !== 0) {
    errors.push('invalid amount of purchased book, minimum 1 and not decimal');
  }

  if (percentageDiscount < 0 || percentageDiscount > 100) {
    errors.push('discount amount invalid');
  }

  if (percentageTax < 0 || percentageTax > 100) {
    errors.push('percentage amount invalid');
  }

  if (!bookDetail) {
    errors.push('tell me what you want to buy!');
  }

  return errors;
};

const handleDueDateCreditTerm = (totalPrice, lengthOfMonth) => {
  let currentDate = new Date();
  //   let currentDate = new Date(2023, 12, -3);
  //   console.log("this current date", currentDate.toLocaleDateString());
  //   let lastDayCurrentMonth = new Date(2023, 8, 0);
  //   console.log(currentDate.setMonth(currentDate.getMonth() + 1));
  //   console.log('currentDate currentDate ', currentDate.getDate());
  //   console.log('currentDate month ', currentDate.getMonth());
  //   console.log('currentDate currentDate ', currentDate.toLocaleDateString());
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
};

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Desember'];

const detailOfBook = {
  price: 1e4,
  title: 'Moriarty',
  isSoldOut: false,
  amountOfPurchasedBook: 1,
  amountOfStock: 10,
  discount: 0,
  tax: 0,
};

const lengthOfMonth = 3;

const { finalPrice, message } = bookPurchasing(
  detailOfBook,
  detailOfBook.amountOfStock,
  detailOfBook.amountOfPurchasedBook,
  detailOfBook.discount,
  detailOfBook.tax,
  lengthOfMonth
);
if (finalPrice) {
  console.log('\n==== FINAL PRICE ====');
  console.log(finalPrice);
}
console.log('\n==== MESSAGE ====');
console.log(message);
