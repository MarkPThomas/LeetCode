/**
 * @param {string} s
 * @return {number}
 */
 var romanToInt = function(s) {
  // Validate string length
  if (s.length < 1 || 15 < s.length) {
      return 0;
  }

  const numerals = {
      I: 1,
      V: 5,
      X: 10,
      L: 50,
      C: 100,
      D: 500,
      M: 1000
  }

  const numeralSubtractionValues = {
      I : 1,
      X: 10,
      C: 100
  }

  const numeralSubtractions = {
      V : 'I',
      X: 'I',
      L: 'X',
      C: 'X',
      D: 'C',
      M: 'C'
  }

  let count = 0;
  let priorChar = '';

  for (let i = s.length - 1; i >= 0; i--) {
      let currentChar = s[i];
      let charCount = numerals[currentChar];

      // Enforce character is valid
      if (!charCount) {
          return 0;
      }

      if (priorChar) {
          const numeralSubtraction = numeralSubtractions[priorChar];
          if (numeralSubtraction) {
            const numeralSubtractionValue = numeralSubtractionValues[numeralSubtraction];
            if (numeralSubtractionValue) {
                charCount = numerals[priorChar] - numeralSubtractionValue;
            } else {
                return 0;
            }
          }
      }

      count += charCount
      priorChar = currentChar;
  }

  return count;
};

const testCases = [
{ input: 'III',
 expected: 3},
{ input: 'LVIII',
 expected: 58},
{ input: 'MCMXCIV',
 expected: 1994},
];

testCases.forEach((testCase) => {
  let result = romanToInt(testCase.input);
  let pass = result === testCase.expected;
  console.log(`Input: ${testCase.input}, Expected: ${testCase.expected}, Result: ${result}, Pass: ${pass}`);
  }
);