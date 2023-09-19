exports.bookShelfCreateValidator = async (req, res, next) => {
  const reqBody = req?.body;
  const errors = [];

  if (!reqBody?.name) {
    errors.push('name is required');
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

exports.bookShelfUpdateValidator = async (req, res, next) => {
  const reqBody = req?.body;
  const errors = [];

  if (!reqBody?.name) {
    errors.push('name is required');
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

exports.bookShelfAddBookValidator = async (req, res, next) => {
  const reqBody = req?.body;
  const errors = [];

  if (!reqBody?.books) {
    errors.push('books is required');
  }
  if (reqBody?.books?.length < 1) {
    errors.push('books length minimum 1');
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
