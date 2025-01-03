// yyyymmdd
// O() time complexity
// O(1) space complexity
// Time to complete: xx min
// Patterns:
// Notes w.r.t. solution:


// 2015/01/03
// O(n) time complexity
// O(n) space complexity
// Time to complete: xx min
// Patterns: Sliding Window
// Notes w.r.t. solution: Worked out solution for notes
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var removeDuplicates = function (s, k) {
  const counts = [];
  const result = s.split('');

  let left = 0;
  for (let right = 0; right < s.length; left++, right++) {
    result[left] = result[right];

    if (left === 0 || result[left] !== result[left - 1]) {
      counts.push(1);
    } else {
      const incremented = counts.pop() + 1;
      if (incremented === k) {
        left = left - k;
      } else {
        counts.push(incremented);
      }
    }
  }

  return result.slice(0, left).join('');
};

// 2015/01/03
// O(n) time complexity
// O(n) space complexity
// Time to complete: xx min
// Patterns: Stack
// Notes w.r.t. solution: Worked out solution for notes
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var removeDuplicates = function (s, k) {
  const charCounts = [];
  for (let i = 0; i < s.length; i++) {
    if (!charCounts.length || charCounts[charCounts.length - 1][0] !== s[i]) {
      charCounts.push([s[i], 1]);
    } else {
      let [char, count] = charCounts.pop();
      if (count + 1 < k) {
        charCounts.push([char, count + 1]);
      }
    }
  }

  const results = [];
  while (charCounts.length) {
    const [char, count] = charCounts.pop();
    for (let i = 0; i < count; i++) {
      results.push(char);
    }
  }
  return results.reverse().join('');
};