// O(N) time complexity where N = s.length
// O(1) space complexity
// Time to complete: 19:07 min

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
 var isIsomorphic = function(s, t) {
  if (s.length !== t.length
     || (s.length < 1 || Math.pow(50, 4) < s.length)) {
      return false;
  }

  let sToT = {};
  let tToS = {};
  for (let i = 0; i < s.length; i++) {
      let charS = s[i];
      let charT = t[i];

      let charSMappedToT = sToT[charS];
      let charTMappedToS = tToS[charT];

      if (!charSMappedToT && !charTMappedToS) {
          sToT[charS] = charT;
          tToS[charT] = charS;
      } else {
          if (charSMappedToT !== charT
             || charTMappedToS !== charS) {
              return false;
          }
      }
  }
  return true;
};

const testCases = [
  { input: {
      s: 'egg',
      t: 'add'
    },
    expected: true},
  { input: {
      s: 'foo',
      t: 'bar'
    },
    expected: false},
  { input: {
      s: 'paper',
      t: 'title'
    },
    expected: true},
  { input: {
      s: 'abcde',
      t: 'abcda'
    },
    expected: false},
];

testCases.forEach((testCase) => {
  let result = isIsomorphic(testCase.input.s, testCase.input.t);
  let pass = result === testCase.expected;
  console.log(`Input: ${testCase.input}\nExpected: ${testCase.expected}\nResult: ${result}\nPass: ${pass}\n`);
  }
);