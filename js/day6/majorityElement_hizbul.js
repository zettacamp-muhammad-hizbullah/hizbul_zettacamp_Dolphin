/**
 * write a function that returns the majority element.
 * The majority element is the element that appears more than other element.
 * READ EXAMPLE BELOW!

console.log(majorityElement([3, 2, 3])); // Output: 3 
console.log(majorityElement([2, 2, 1, 1, 1, 2, 2])); // Output: 2 

 * You may assume that the majority element always exists in the array.

 * Returns the majority element from the input array of integers.

 * @param {number[]} nums - The input array of integers.
 * @return {number} Returns the majority element.
 */
function majorityElement(nums) {
  // Your logic here
  let elementMajority = nums[0];
  let tempTimes = 1;
  let times = 0;

  nums.map((num) => {
    nums.map((num2) => {
      if (num === num2) {
        times++;
      }
      if (tempTimes < times) {
        tempTimes = times;
        elementMajority = num;
      }
    });
  });

  return elementMajority;
}

console.log(majorityElement([3, 2, 3])); // Output: 3
console.log(majorityElement([2, 2, 1, 1, 1, 2, 2])); // Output: 2
