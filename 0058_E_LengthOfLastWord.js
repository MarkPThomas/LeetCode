// 2024/04/01
// O(n) time complexity
// O(1) space complexity
// Time to complete:  1:34 min w/ libs, 4:41 manual
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord20240401Libs = function (s) {
  return s.trim().split(' ').pop().length;
};

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord20240401Manual = function (s) {
  let indexLast = -1;
  for (let i = s.length - 1; 0 <= i; i--) {
    if (s[i] !== ' ' && indexLast === -1) {
      indexLast = i;
    } else if (indexLast !== -1 && s[i] === ' ') {
      return indexLast - i;
    }
  }
  return indexLast === -1 ? 0 : indexLast + 1;
};

// 2023 Solution - w/ built-in functions
// O(N) or less time complexity
// O(1) space complexity
// Time to complete:  1 min
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord2023 = function (s) {
  return s.trim().split(' ').pop().length;
};


// 2023 Solution - Manual
// O(N) or less time complexity
// O(1) space complexity
// Time to complete:  3 min
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord2023Manual = function (s) {
  let end = s.length - 1;
  while (end >= 0 && s[end] === ' ') {
    end--;
  }

  let start = end;
  while (start >= 0 && s[start] !== ' ') {
    start--;
  }

  return end - start;
};


// 2022 Solution
// O(N) or less time complexity
// O(1) space complexity
// Time to complete:  4:40 min

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord2022 = function (s) {
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
  {
    input: 'Hello World',
    expected: 5
  },
  {
    input: '   fly me   to   the moon  ',
    expected: 4
  },
  {
    input: 'luffy is still joyboy',
    expected: 6
  },
];

testCases.forEach((testCase) => {
  let result = lengthOfLastWord(testCase.input);
  let pass = result === testCase.expected;
  console.log(`Input: ${testCase.input}\nExpected: ${testCase.expected}\nResult: ${result}\nPass: ${pass}\n`);
}
);