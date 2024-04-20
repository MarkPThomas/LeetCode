// O((m + n) * log (m)) time complexity
// O(log(m)) space complexity (JavaScript sorting)
// where n = # spells, m = # potions
// Time to complete: 15:00 min
// Patterns: Binary Search
// Notes w.r.t. solution: Was close, but made some minor fatal mistakes. Slow down & be more careful!

/**
 * @param {number[]} spells
 * @param {number[]} potions
 * @param {number} success
 * @return {number[]}
 */
var successfulPairs = function (spells, potions, success) {
  potions.sort((a, b) => a - b);
  const maxPotion = potions[potions.length - 1];

  const pairs = new Array(spells.length);
  for (let i = 0; i < spells.length; i++) {
    const minPotion = Math.ceil(success / spells[i]);
    if (minPotion > maxPotion) {
      pairs[i] = 0;
    } else {
      const index = lowerBound(potions, minPotion);
      pairs[i] = potions.length - index;
    }
  }

  return pairs;
};

function lowerBound(arr, val) {
  let low = 0;
  let high = arr.length - 1;
  while (low < high) {
    const mid = Math.floor(low + (high - low) / 2);
    if (arr[mid] < val) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return low;
}

const testCases = [
  {
    input: {
      spells: [5, 1, 3],
      potions: [1, 2, 3, 4, 5],
      success: 7
    },
    expected: [4, 0, 3]
  },
  {
    input: {
      spells: [3, 1, 2],
      potions: [9, 5, 8],
      success: 16
    },
    expected: [2, 0, 2]
  },
];

testCases.forEach((testCase) => {
  let result = successfulPairs(testCase.input.spells, testCase.input.potions, testCase.input.success); // insert function name here
  let pass = result === testCase.expected;
  console.log(`Input: ${testCase.input}\nExpected: ${testCase.expected}\nResult: ${result}\nPass: ${pass}\n`);
}
);