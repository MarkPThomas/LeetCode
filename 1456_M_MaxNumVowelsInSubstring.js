// 2025/01/30
// O(n) time complexity
// O(1) space complexity
// Time to complete: 12:58 min
// Patterns: Sliding Window
// Notes w.r.t. solution: Would have been 8:45 or faster, but accidentally solved the wrong problem at first!
//    Originally returned max # of any particular vowel in the window. :-P
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var maxVowels = function (s, k) {
  const vowels = new Set();
  vowels.add('a');
  vowels.add('e');
  vowels.add('i');
  vowels.add('o');
  vowels.add('u');

  let maxCount = 0;
  let currCount = 0;
  for (let i = 0; i < s.length; i++) {
    if (i >= k && vowels.has(s[i - k])) {
      currCount--;
    }

    if (vowels.has(s[i])) {
      currCount++;
      maxCount = Math.max(maxCount, currCount);
    }
  }

  return maxCount;
};