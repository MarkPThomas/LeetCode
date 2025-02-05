// 2025/02/05
// O(n * c) time complexity
// O(1) space complexity
//  where n = # words, c = avg word length => n * c = total length of all words combined
// Time to complete: OT min
// Patterns: Topological Sort
// Notes w.r.t. solution:
/**
 * @param {string[]} words
 * @return {string}
 */
var alienOrder = function (words) {
  const chars = {};
  const counts = {};
  for (const word of words) {
    for (const char of word) {
      chars[char] ??= [];
      counts[char] ??= 0;
    }
  }

  for (let i = 1; i < words.length; i++) {
    const word1 = words[i - 1];
    const word2 = words[i];

    // check word 2 not a prefix of word 1
    if (word1.length > word2.length && word1.substring(0, word2.length) === word2) {
      return "";
    }

    for (let j = 0; j < Math.min(word1.length, word2.length); j++) {
      if (word1[j] !== word2[j]) {
        chars[word1[j]].push(word2[j]);
        counts[word2[j]]++;
        break;
      }
    }
  }

  const queue = new Queue();
  for (const [char, count] of Object.entries(counts)) {
    if (!count) {
      queue.enqueue(char);
    }
  }

  let alphabet = []
  while (queue.size()) {
    const char = queue.dequeue();
    alphabet.push(char);

    for (const nextChar of chars[char]) {
      counts[nextChar]--;
      if (!counts[nextChar]) {
        queue.enqueue(nextChar);
      }
    }
  }

  // Check for cycle before submitting
  return alphabet.length === Object.keys(counts).length ? alphabet.join('') : '';
};