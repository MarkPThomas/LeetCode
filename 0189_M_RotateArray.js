// O(n) time complexity
// O(1) space complexity
// Time to complete: too long :-( min
// Patterns: Cyclic sorting
// Notes w.r.t. solution: Would have been saved if I had diagrammed things out more before coding

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
  if (nums.length < 2) {
    return;
  }

  let count = 0;
  for (let startIndex = 0; count < nums.length; startIndex++) {
    let currentIndex = startIndex;
    let lastValue = nums[startIndex];
    do {
      let nextIndex = (currentIndex + k) % nums.length;
      let tempValue = nums[nextIndex];
      nums[nextIndex] = lastValue;
      lastValue = tempValue;
      currentIndex = nextIndex;
      count++;

    } while (startIndex !== currentIndex)
  }
};


const testCases = [
  {
    input: '',
    expected: ''
  },
];

testCases.forEach((testCase) => {
  // let result = FUT(testCase.input); // insert function name here
  let pass = result === testCase.expected;
  console.log(`Input: ${testCase.input}\nExpected: ${testCase.expected}\nResult: ${result}\nPass: ${pass}\n`);
}
);