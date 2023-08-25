const bookPurchasing = (bookDetail = null, amountOfStock = 10, amountOfPurchasedBook = 1, percentageDiscount = 0, percentageTax = 11) => {
  let totalPrice = 0;
  let message = '';

  !amountOfStock ? (amountOfStock = 10) : (amountOfStock = amountOfStock);
  !amountOfPurchasedBook ? (amountOfPurchasedBook = 1) : (amountOfPurchasedBook = amountOfPurchasedBook);

  const validationMessages = validator(amountOfStock, amountOfPurchasedBook, bookDetail, percentageDiscount, percentageTax);
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

  return { totalPrice, message };
};

const validator = (amountOfStock, amountOfPurchasedBook, bookDetail, percentageDiscount, percentageTax) => {
  const errors = [];
  if (amountOfStock < 0 || amountOfStock % 1 !== 0) {
    errors.push('invalid amount of stock, integer positive number required');
  }

  if (amountOfPurchasedBook < 1 || amountOfPurchasedBook % 1 !== 0) {
    errors.push('invalid amount of purchased book, minimum 1 and not decimal');
  }

  if (percentageDiscount < 0 || percentageDiscount > 100) {
    errors.push('discount amount invalid');
  }

  if (!bookDetail) {
    errors.push('tell me what you want to buy!');
  }

  return errors;
};

const detailOfBook = {
  price: 45e2,
  title: 'Moriarty',
  isSoldOut: false,
  amountOfPurchasedBook: 20,
  amountOfStock: 20,
  discount: 0,
  tax: 11,
};

const { finalPrice, message } = bookPurchasing(
  detailOfBook,
  detailOfBook.amountOfStock,
  detailOfBook.amountOfPurchasedBook,
  detailOfBook.discount,
  detailOfBook.tax
);
if (finalPrice) {
  console.log('\n==== FINAL PRICE ====');
  console.log(finalPrice);
}
console.log('\n==== MESSAGE ====');
console.log(message);
