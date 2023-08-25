const bookPurchasing = (bookDetail = null, percentageDiscount = 0, percentageTax = 11) => {
  if (percentageDiscount < 0 || percentageDiscount > 100) {
    console.log('discount amount invalid');
    return null;
  }

  if (!bookDetail) {
    console.log('tell me what you want to buy?');
    return null;
  }

  const bookTitle = String(bookDetail.title);
  const bookPrice = Number(bookDetail.price);
  const isSoldOut = Boolean(bookDetail.isSoldOut);

  if (isSoldOut === true) {
    return console.log('sorry this item is out of stock 🙏🙏');
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

  return priceAfterTax;
};

const detailOfBook = {
  price: 45e2,
  title: 'Moriarty',
  isSoldOut: false,
};

const finalPrice = bookPurchasing(detailOfBook, 10);
if (finalPrice) {
  console.log('\n==== FINAL PRICE ====');
  console.log(finalPrice);
}
