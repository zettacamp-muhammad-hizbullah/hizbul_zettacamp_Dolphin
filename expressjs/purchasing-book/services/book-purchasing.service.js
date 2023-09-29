const { handleDueDateCreditTerm } = require('../utils/index.util');
const bookValidator = require('../validators/book.validator');
const bookService = require('../services/book.service');

exports.bookPurchasing = async (
  bookDetail = null,
  amountOfStock = 10,
  amountOfPurchasedBook = 1,
  percentageDiscount = 0,
  percentageTax = 11,
  lengthOfMonths = 1,
  targetTermToAddAdditionalPrice = null,
  additionalPrice = 0
) => {
  let totalPrice = 0;
  let message = '';
  let errors = [];
  let quantityToBuy = 0;
  console.log('targetTermToAddAdditionalPrice', targetTermToAddAdditionalPrice);
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
    throw new Error(errors);
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
      message = `Out of stock, you can only buy ${i} item from ${amountOfPurchasedBook} you requested.`;
      break;
    }
    quantityToBuy = i;
    totalPrice += priceAfterTax;
  }

  totalPrice = Math.ceil(totalPrice);

  const finalStock = amountOfStock - amountOfPurchasedBook;
  finalStock > 0 ? (message += `You can purchase ${finalStock} item again.`) : (message += ` Book can't purchased again.`);

  const {
    duePayments: termPayments,
    message: termMessage,
    isTermExist,
  } = await handleDueDateCreditTerm(totalPrice, lengthOfMonths, targetTermToAddAdditionalPrice, additionalPrice);
  message += termMessage ? `,& ${termMessage}` : '';
  if (isTermExist) {
    totalPrice += additionalPrice;
  }

  const result = {
    totalPrice,
    termPayments,
    amountOfDiscount,
    amountOfTax,
    quantityToBuy,
  };

  // update book stock
  let newStock = amountOfStock - amountOfPurchasedBook;

  const updatedBook = await bookService.updateBook(bookDetail?._id, {
    stock: newStock >= 1 ? newStock : 0,
  });

  if (!updatedBook) {
    throw new Error("can not update book's stock");
  }

  return { result, message };
};
