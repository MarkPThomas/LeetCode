// O(N) time complexity
// O(1) space complexity
// Memory Usage: 50.9 MB, less than 32.07% of JavaScript online submissions for Palindrome Number.

/**
 * @param {number} x
 * @return {boolean}
 */
 var isPalindrome = function(x) {
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
  { input: 121,
    expected: true},
  { input: -121,
    expected: false},
  { input: 10,
    expected: false},
  ];

testCases.forEach((testCase) => {
  let result = isPalindrome(testCase.input); // insert function name here
  let pass = result === testCase.expected;
  console.log(`Input: ${testCase.input}\nExpected: ${testCase.expected}\nResult: ${result}\nPass: ${pass}\n`);
  }
);



-2^31 <= x <= 2^31 - 1


// Follow up: Could you solve it without converting the integer to a string?