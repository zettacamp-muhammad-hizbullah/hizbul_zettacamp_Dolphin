const { asynFunc } = require('../services/async-func.service');

exports.asyncAwaitFunction = async (_, res) => {
  try {
    const isDone = await asynFunc();
    console.log('result', isDone);

    res.status(isDone ? 200 : 500).json({
      success: isDone,
      data: null,
      message: null,
      errors: null,
    });
  } catch (error) {
    res.status(isDone ? 200 : 500).json({
      success: isDone,
      data: null,
      message: null,
      errors: error,
    });
  }
};

exports.asyncNotAwaitFunction = async (req, res) => {
  try {
    const isDone = asynFunc();
    console.log('result', isDone);
    console.log('is result', isDone ? 'ada' : 'tidak');

    res.status(isDone ? 200 : 500).json({
      success: isDone,
      data: null,
      message: null,
      errors: null,
    });
  } catch (error) {
    res.status(isDone ? 200 : 500).json({
      success: isDone,
      data: null,
      message: null,
      errors: error,
    });
  }
};