const { handleDueDateCreditTerm } = require('../utils/index.util');
const bookValidator = require('../validators/book.validator');

exports.bookPurchasing = async (
  bookDetail = null,
  amountOfStock = 10,
  amountOfPurchasedBook = 1,
  percentageDiscount = 0,
  percentageTax = 11,
  lengthOfMonths = 1
) => {
  let totalPrice = 0;
  let message = '';
  let errors = [];

  isNaN(amountOfStock) ? (amountOfStock = 10) : (amountOfStock = amountOfStock);
  isNaN(amountOfPurchasedBook) ? (amountOfPurchasedBook = 1) : (amountOfPurchasedBook = amountOfPurchasedBook);

  const validationMessages = await bookValidator.validator(
    amountOfStock,
    amountOfPurchasedBook,
    bookDetail,
    percentageDiscount,
    percentageTax,
    lengthOfMonths
  );

  if (validationMessages.length > 0) {
    console.log('====== ERRORS ======');
    validationMessages.forEach((errorMessage) => {
      console.error(errorMessage);
    });

    message = 'something error';
    errors = validationMessages;
    return { data: null, message, errors };
  }

  const bookTitle = String(bookDetail.title);
  const bookPrice = Number(bookDetail.price);
  const isSoldOut = Boolean(bookDetail.isSoldOut);

  if (isSoldOut === true) {
    message = 'sorry this item is out of stock 🙏🙏';
    return { data: null, message };
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

  const {
    duePayments: termPayments
  } = await handleDueDateCreditTerm(totalPrice, lengthOfMonths);

  const result = {
    totalPrice,
    termPayments,
    amountOfDiscount,
    amountOfTax,
  };

  return { result, message, errors };
};
