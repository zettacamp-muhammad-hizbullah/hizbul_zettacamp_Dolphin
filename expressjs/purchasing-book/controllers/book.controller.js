const bookService = require('../services/book.service');

exports.purchaseBook = async (req, res) => {
  const reqBody = req?.body;

  const detailOfBook = {
    price: 1e4,
    title: 'Moriarty',
  };

  let bookDetail = reqBody?.book_detail || detailOfBook;
  let amountOfStock = reqBody?.stock;
  let amountOfPurchasedBook = reqBody?.amount;
  let percentageDiscount = reqBody?.discount || 0;
  let percentageTax = reqBody?.tax || 0;
  let lengthOfMonths = reqBody?.term || 2;

  //   handle validation request

  const { result, errors, message } = await bookService.bookPurchasing(
    bookDetail,
    amountOfStock,
    amountOfPurchasedBook,
    percentageDiscount,
    percentageTax,
    lengthOfMonths
  );

  let totalDiscount = result?.amountOfDiscount * amountOfPurchasedBook;
  let totalTax = result?.amountOfTax * amountOfPurchasedBook;

  const finalResult = {
    books: bookDetail,
    terms: result?.termPayments,
    discount_percentage: `${percentageDiscount} %`,
    total_discount: totalDiscount,
    tax_percentage: `${percentageTax} %`,
    total_tax: totalTax,
    total_price: result?.totalPrice,
  };

  if (errors?.length < 1) {
    res.json({
      success: true,
      data: finalResult,
      message: message,
      errors: null,
    });
  } else {
    res.status(500).json({
      success: false,
      data: null,
      message: message,
      errors: errors,
    });
  }
};
