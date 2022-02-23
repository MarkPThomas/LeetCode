// O(N) or less time complexity
// O(1) space complexity
// Time to complete:  4:40 min

/**
 * @param {string} s
 * @return {number}
 */
 var lengthOfLastWord = function(s) {
  if (s.length < 1 || Math.pow(10, 4) < s.length) {
      return 0;
  }

  // Find last word
  let lastWord = [];
  for (let i = s.length - 1; i >= 0; i--) {
      if (s[i] === ' ') {
          if (lastWord.length === 0) {
              continue;
          } else {
              break;
          }
      } else {
          lastWord.push(s[i]);
      }
  }

  return lastWord.length;
};

const testCases = [
{ input: 'Hello World',
  expected: 5},
{ input: '   fly me   to   the moon  ',
  expected: 4},
{ input: 'luffy is still joyboy',
  expected: 6},
];

testCases.forEach((testCase) => {
  let result = lengthOfLastWord(testCase.input);
  let pass = result === testCase.expected;
  console.log(`Input: ${testCase.input}\nExpected: ${testCase.expected}\nResult: ${result}\nPass: ${pass}\n`);
  }
);