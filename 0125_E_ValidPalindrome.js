// O(n) time complexity
// O(n) space complexity
// Time to complete: 7 min
// Patterns:
// Notes w.r.t. solution:

/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  function isLetter(c) {
    const charCode = c.toLowerCase().charCodeAt();
    return 'a'.charCodeAt() <= charCode && charCode <= 'z'.charCodeAt();
  }
  function isInteger(c) {
    const charInt = parseInt(c);
    return 0 <= charInt && charInt <= 9;
  }
  function isAlphanumeric(c) {
    return isLetter(c) || isInteger(c);
  }

  let validChars = [];
  for (let i = 0; i < s.length; i++) {
    const letter = s[i].toLowerCase();
    if (isAlphanumeric(letter)) {
      validChars.push(letter);
    }
  }
  const sValidChars = validChars.join('');
  for (let i = 0; i < sValidChars.length; i++) {
    if (sValidChars[i] !== sValidChars[sValidChars.length - 1 - i]) {
      return false;
    }
  }
  return true;
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