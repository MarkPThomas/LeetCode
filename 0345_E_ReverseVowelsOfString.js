// O(n) time complexity
// O(n) space complexity (for converting string to array)
// Time to complete: 5:27 min
// Patterns: 2 pointers, Hash Map
// Notes w.r.t. solution:
/**
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function (s) {
  const vowels = {
    'a': true,
    'e': true,
    'i': true,
    'o': true,
    'u': true
  };

  const chars = s.split('');

  let left = 0;
  let right = chars.length - 1;
  while (left < right) {
    while (left < right && !vowels[chars[left].toLowerCase()]) {
      left++;
    }

    while (left < right && !vowels[chars[right].toLowerCase()]) {
      right--;
    }

    const swap = chars[left];
    chars[left] = chars[right];
    chars[right] = swap;

    left++;
    right--;
  }

  return chars.join('');
};

// O(n) time complexity
// O(n) space complexity (for converting string to array)
// Time to complete: 7 min
// Patterns: 2 pointers, Hash Map
// Notes w.r.t. solution:
/**
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function (s) {
  const vowels = {
    'a': true,
    'e': true,
    'i': true,
    'o': true,
    'u': true
  }

  function swap(chars, i, j) {
    const temp = chars[i];
    chars[i] = chars[j];
    chars[j] = temp;
  }

  const chars = s.split('');
  let left = 0;
  let right = chars.length - 1;
  while (left < right) {
    if (vowels[chars[left].toLowerCase()] && vowels[chars[right].toLowerCase()]) {
      swap(chars, left, right);
      left++;
      right--;
    }
    if (!vowels[chars[left].toLowerCase()]) {
      left++;
    }
    if (!vowels[chars[right].toLowerCase()]) {
      right--;
    }
  }
  return chars.join('');
};