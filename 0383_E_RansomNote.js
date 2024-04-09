// 2024/04/09
// O(m + r) time complexity
// O(m) space complexity -> O(1) as there is a fixed number of letters in the alphabet that can be used for keys
// where m = magazine length, r = ransome note length
// Time to complete: 3:52 min
// Patterns: Hash Map
// Notes w.r.t. solution:
/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function (ransomNote, magazine) {
  if (magazine.length < ransomNote.length) {
    return false;
  }

  const lettersCount = {};
  for (let i = 0; i < magazine.length; i++) {
    if (!lettersCount[magazine[i]]) {
      lettersCount[magazine[i]] = 0;
    }
    lettersCount[magazine[i]]++;
  }

  for (let i = 0; i < ransomNote.length; i++) {
    if (lettersCount[ransomNote[i]]) {
      lettersCount[ransomNote[i]]--;
    } else {
      return false;
    }
  }

  return true;
};

// 2023/06
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
var canConstruct2023 = function (ransomNote, magazine) {
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