// O(n) time complexity
// O(1) space complexity
// Time to complete: 26 min
// Patterns:
// Notes w.r.t. solution:

/**
 * @param {string} columnTitle
 * @return {number}
 */
var titleToNumber = function (columnTitle) {
  let base = 0;
  let colNumber = 0;
  for (let i = columnTitle.length - 1; i >= 0; i--) {
    const charCode = columnTitle.charCodeAt(i) - 'A'.charCodeAt() + 1;
    colNumber += (26 ** base) * charCode;
    base++;
  }
  return colNumber;
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