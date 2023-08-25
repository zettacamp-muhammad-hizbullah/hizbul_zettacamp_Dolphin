/*
Title: Unique Characters

Description:
Write a function named hasUniqueCharacters that takes a string as input and returns true if the string contains all unique characters, and false otherwise. You can assume that the string contains only lowercase alphabets (a-z).

Example:
console.log(hasUniqueCharacters("abcdefg")); // Output: true
console.log(hasUniqueCharacters("hello")); // Output: false
*/

// function hasUniqueCharacters(str) {
//   // Your logic here
//   const duplicateChars = [];
//   str = str.toLowerCase();

//   if (!/^[a-zA-Z]+$/.test(str)) {
//     return 'must alphabet contains';
//   }

//   loop1: for (let i = 0; i < str.length; i++) {
//     const currentChar = str[i];
//     for (let j = i + 1; j < str.length; j++) {
//       console.log('i => ', currentChar, '| j => ', str[j]);
//       if (currentChar === str[j]) {
//         console.error('duplicate char', currentChar);
//         duplicateChars.push(currentChar);
//         break loop1;
//       }
//     }
//   }

//   return duplicateChars.length > 0 ? false : true;
// }

function hasUniqueCharacters(str) {
  // Your logic here
  const duplicateChars = [];
  str = str.toLowerCase();

  if (!/^[a-zA-Z]+$/.test(str)) {
    return 'must alphabet contains';
  }

  let strArray = str.split('');
  let result = strArray.some((value, index, arr) => {
    console.log('cek index => ', index);
    console.log('string yang dicek => ', value);
    console.log('index dari value yang dicari => ', arr.lastIndexOf(value));
    console.log('cek => ', arr.lastIndexOf(value) !== index);
    return arr.lastIndexOf(value) !== index;
  });
  console.log('hasil => ', result);
  // jika string "aku"
  // a cari index, index of a = 0, apakah 0 tidak sama index saat ini yaitu = 0, ternyata sama, maka
  // console.log(result);
  return !result;
}

console.log(hasUniqueCharacters('abcdefg')); // Output: true
console.log(hasUniqueCharacters('hello')); // Output: false
console.log(hasUniqueCharacters('HellO')); // Output: false
console.log(hasUniqueCharacters('HellO123')); // Output: false
