// O(n) time complexity
// O(n) -> O(1) space complexity because there are a finite # of characters, e.g. 26 for letters
// where n = length of either stirng
// Time to complete: 3 min
// Patterns: Hash Map
// Notes w.r.t. solution:

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  if (s.length !== t.length) {
    return false;
  }

  const letterCounts = {};
  for (let i = 0; i < s.length; i++) {
    const letter = s[i];
    if (!letterCounts[letter]) {
      letterCounts[letter] = 0;
    }
    letterCounts[letter]++;
  }

  for (let i = 0; i < t.length; i++) {
    const letter = t[i];
    if (!letterCounts[letter]) {
      return false;
    }
    letterCounts[letter]--;
    if (letterCounts[letter] == 0) {
      delete letterCounts[letter];
    }
  }

  return Object.keys(letterCounts).length === 0;
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