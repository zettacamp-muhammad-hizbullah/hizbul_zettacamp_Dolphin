const bookService = require('../services/book.service');
const { distincTermAmountAsArray, mapTermPaymentDateAsKey, handleTermToPay } = require('../utils/index.util');

exports.purchaseBook = async (req, res) => {
  const reqBody = req?.body;

  const detailOfBook = {
    // price: 1e4,
    price: 10005,
    title: 'Moriarty',
  };

  let bookDetail = reqBody?.book_detail || detailOfBook;
  let amountOfStock = reqBody?.stock;
  let amountOfPurchasedBook = reqBody?.amount;
  let percentageDiscount = reqBody?.discount || 0;
  let percentageTax = reqBody?.tax || 0;
  let lengthOfMonths = reqBody?.term || 2;
  let targetTerm = reqBody?.target_term || null;
  let additionalPrice = reqBody?.additional_price || 0;
  let targetDate = reqBody?.target_date_to_paid || null;

  //   handle validation request

  const { result, errors, message } = await bookService.bookPurchasing(
    bookDetail,
    amountOfStock,
    amountOfPurchasedBook,
    percentageDiscount,
    percentageTax,
    lengthOfMonths,
    targetTerm,
    additionalPrice
  );

  let totalDiscount = result?.amountOfDiscount * amountOfPurchasedBook;
  let totalTax = result?.amountOfTax * amountOfPurchasedBook;

  // const finalResult = {
  //   books: bookDetail,
  //   terms: result?.termPayments,
  //   discount_percentage: `${percentageDiscount} %`,
  //   total_discount: totalDiscount,
  //   tax_percentage: `${percentageTax} %`,
  //   total_tax: totalTax,
  //   total_price: result?.totalPrice,
  // };

  const resultTerms = distincTermAmountAsArray(result?.termPayments);
  const { resultObjectMap: resultListTermsMapDate, rawMapTerm } = mapTermPaymentDateAsKey(result?.termPayments);
  const resultTargetTermToPay = handleTermToPay(rawMapTerm, targetDate);
  console.log('rawMapTerm', typeof rawMapTerm);

  const finalResult = {
    distinct_terms: resultTerms,
    list_term: resultListTermsMapDate,
    // list_term_original: rawMapTerm,
    term_to_pay: resultTargetTermToPay,
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
