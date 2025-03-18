// O(n) time complexity
// O(1) space complexity
// Time to complete: 41:42 min
// Patterns: String, math
// Notes w.r.t. solution: Slow morning, jumped in too fast.
//  Diagram out more slowly before coding.
//  Solved in 25:28 but had bugs to work out.
/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function (num) {
  const romanVals = {
    '1': 'I',
    '5': 'V',
    '10': 'X',
    '50': 'L',
    '100': 'C',
    '500': 'D',
    '1000': 'M',
  }

  const roman = [];
  let place = 1;
  while (num) {
    const digit = num % 10;
    num = Math.floor(num / 10);

    const prevPlace = place;
    place *= 10;

    if (digit === 0) {
      continue;
    } else if (1 <= digit && digit <= 3) {
      // Use corresponding power of tens symbol # times
      for (let i = 1; i <= digit; i++) {
        roman.push(romanVals[prevPlace]);
      }
    } else if (digit === 5) {
      // Use corresponding symbol powers of 5 & 10
      roman.push(romanVals[digit * prevPlace]);
    } else if (digit === 4 || digit === 9) {
      // Use next corresponding symbol & minus 1 (e.g. IV, IX)
      const nextNumeral = (digit + 1) * prevPlace;
      roman.push(romanVals[nextNumeral]);
      roman.push(romanVals[prevPlace]);
    } else {
      // Get last corresponding symbol 6-8
      // Power of 5 & 10, plus remaining ones
      const remainder = (digit - 5);
      for (let i = 1; i <= remainder; i++) {
        roman.push(romanVals[prevPlace]);
      }

      const fives = prevPlace * 5;
      roman.push(romanVals[fives]);
    }
  }

  return roman.reverse().join('');
};

// ===== Worked Solutions =====
// O(1) time complexity
// O(1) space complexity
// Patterns:Greedy
// Notes w.r.t. solution:
/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function (num) {
  const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const numerals = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];

  let roman = '';
  for (let i = 0; i < values.length && num > 0; i++) {
    while (values[i] <= num) {
      num -= values[i];
      roman += numerals[i];
    }
  }

  return roman;
};