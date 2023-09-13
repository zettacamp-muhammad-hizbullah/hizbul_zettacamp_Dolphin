exports.asynFunc = async () => {
  let isDone = false;
  for (let i = 0; i < 5; i++) {
    console.log(`index => ${i}`);
    if (i === 4) {
      isDone = true;
      console.log(`completed isDone = `, isDone);
    }
    // await pauseTime();
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
  console.log(`isDone = ${isDone}`);
  console.log(`================`);
  return isDone;
};

// const pauseTime = () => new Promise((resolve) => setTimeout(resolve, 2000));
