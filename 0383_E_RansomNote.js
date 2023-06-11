// O(n) time complexity
// O(1) space complexity due to constant size of alphabet
// where n = length of magazine
// Time to complete: 3:00 min
// Patterns: Hashmap
// Notes w.r.t. solution:

/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function (ransomNote, magazine) {
  if (ransomNote.length > magazine.length) {
    return false;
  }

  const lettersCount = {};
  for (let i = 0; i < magazine.length; i++) {
    const char = magazine[i];
    if (!lettersCount[char]) {
      lettersCount[char] = 0;
    }
    lettersCount[char]++;
  }

  for (let i = 0; i < ransomNote.length; i++) {
    const char = ransomNote[i];
    if (!lettersCount[char]) {
      return false;
    }

    lettersCount[char]--;
  }
  return true;
};