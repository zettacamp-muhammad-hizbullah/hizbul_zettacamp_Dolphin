const task1 = require('./task1-variable');

console.log('\n\n====== TASK 2 ======\n\n');

const result = task1.favouriteBook + ' dan ' + task1.constFavouriteBook;
console.log(result);
console.log(typeof result);

console.log('\n\n============\n\n');

const resultArray = task1.favouriteBooksArray.concat(task1.constFavouriteBooksArray);
console.log(resultArray);
console.log(typeof resultArray);

console.log('\n\n============\n\n');

const concatNumberString = task1.age + task1.constFavouriteBook;
console.log(concatNumberString);
console.log(typeof concatNumberString);

console.log('\n\n============\n\n');

const concatNumberArray = task1.age + task1.constFavouriteBooksArray;
console.log(concatNumberArray);
console.log(typeof concatNumberArray);

console.log('\n\n============\n\n');

const concatBooleanString = task1.isIndonesian + task1.constFavouriteBook;
console.log(concatBooleanString);
console.log(typeof concatBooleanString);

console.log('\n\n============\n\n');

const fromBooleanToString = task1.isIndonesian = "changed";
console.log(fromBooleanToString);
console.log(typeof fromBooleanToString);

console.log('\n\n============\n\n');

