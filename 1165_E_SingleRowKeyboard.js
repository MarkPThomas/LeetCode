// O(n) time complexity
// O(1) space complexity
// where n = # of chars in word. Keyboard size doesn't matter since it is constant at 26 chars.
// Time to complete: 5:16 min
// Patterns: Hash map
// Notes w.r.t. solution:

/**
 * @param {string} keyboard
 * @param {string} word
 * @return {number}
 */
var calculateTime = function (keyboard, word) {
  const keyIndices = [];
  for (let i = 0; i < keyboard.length; i++) {
    keyIndices[keyboard[i]] = i;
  }

  let distance = 0;
  let lastIndex = 0;
  for (let i = 0; i < word.length; i++) {
    distance += Math.abs(keyIndices[word[i]] - lastIndex);
    lastIndex = keyIndices[word[i]];
  }

  return distance;
};