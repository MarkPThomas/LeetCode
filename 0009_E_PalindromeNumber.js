// 2024/04/24
// O(n) time complexity
// O(1) space complexity
// Time to complete: 3:51 min
// Patterns: Picking off digits by 1
// Notes w.r.t. solution: Solved in 1:30 for brute force, before procedding to full solution.
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  // Optimization - negative symbol is considered, which cannot be mirrored
  // Optimization - trailing 0s cannot be mirrored as leading 0s
  if (x < 0 || (x !== 0 && x % 10 === 0)) {
    return false;
  }

  // brute force, then refine
  // const digits = x.toString().split(''); // brute force solution, problems asks to not do this
  const digits = [];  // Proper solution
  while (x) {
    digits.push(x % 10);
    x = Math.floor(x / 10);
  }

  let left = 0;
  let right = digits.length - 1;
  while (left < right) {
    if (digits[left] !== digits[right]) {
      return false;
    }

    left++;
    right--;
  }

  return true;
};

// 2022
// O(N) time complexity
// O(1) space complexity
// Memory Usage: 50.9 MB, less than 32.07% of JavaScript online submissions for Palindrome Number.

/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  if (x < Math.pow(-2, 31) || Math.pow(2, 31) - 1 < x) {
    return false;
  }

  let number = x.toString(); // O(N)
  let endIndex = Math.ceil(number.length / 2);

  for (let i = 0; i < endIndex; i++) { // O(N/2)
    let startingChar = number[i];
    let endingChar = number[number.length - 1 - i];

    if (startingChar !== endingChar) {
      return false;
    }
  }
  return true;
};

const testCases = [
  {
    input: 121,
    expected: true
  },
  {
    input: -121,
    expected: false
  },
  {
    input: 10,
    expected: false
  },
];

testCases.forEach((testCase) => {
  let result = isPalindrome(testCase.input); // insert function name here
  let pass = result === testCase.expected;
  console.log(`Input: ${testCase.input}\nExpected: ${testCase.expected}\nResult: ${result}\nPass: ${pass}\n`);
}
);



-2 ^ 31 <= x <= 2 ^ 31 - 1


// Follow up: Could you solve it without converting the integer to a string?