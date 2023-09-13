exports.validator = async (amountOfStock, amountOfPurchasedBook, bookDetail, percentageDiscount, percentageTax, lengthOfMonths) => {
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

exports.bookPurchaseValidator = async (req, res, next) => {
  const reqBody = req?.body;
  const errors = [];

  if (!reqBody?.amount) {
    errors.push('amount is required');
  }
  if (!reqBody?.term) {
    errors.push('term is required');
  }

  if (isNaN(reqBody?.amount)) {
    errors.push('amount must be number');
  }
  if (reqBody?.amount < 1) {
    errors.push('amount must be gather then 0');
  }

  if (isNaN(reqBody?.term)) {
    errors.push('term must be number');
  }
  if (reqBody?.term < 1) {
    errors.push('term must be gather then 0');
  }

  if (isNaN(reqBody?.stock)) {
    errors.push('stock must be number');
  }
  if (reqBody?.stock < 0) {
    errors.push('stock must be gather then or equal 0');
  }

  if (isNaN(reqBody?.discount)) {
    errors.push('discount must be number');
  }
  if (reqBody?.discount < 0) {
    errors.push('discount must be gather then or equal 0');
  }

  if (isNaN(reqBody?.tax)) {
    errors.push('tax must be number');
  }
  if (reqBody?.tax < 0) {
    errors.push('tax must be gather then or equal 0');
  }

  if (reqBody?.book_detail) {
    if (!reqBody?.book_detail.hasOwnProperty('title')) {
      errors.push('book_detail must an object and has title property');
    }
    if (!reqBody?.book_detail.hasOwnProperty('price')) {
      errors.push('book_detail must an object and has price property');
    }

    if (reqBody?.book_detail?.title === '') {
      errors.push('title of book_detail is required');
    }
    if (reqBody?.book_detail.price < 1) {
      errors.push('price of book_detail must be gather then or equal 1');
    }
  }

  if (errors.length > 0) {
    isPassed = false;
    res.status(400).json({
      success: false,
      data: null,
      message: 'bad request',
      errors: errors,
    });
    return;
  }

  next();
};
