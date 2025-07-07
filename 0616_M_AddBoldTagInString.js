// O() time complexity
// O(1) space complexity
// Time to complete: xx min
// Patterns:
// Notes w.r.t. solution:

// ===== Solution =====
// O(m * (n^2 * k - n * k^2)) time complexity
// O(n) space complexity
//  where n = # chars in s, m = # words, k = avg word length
// Patterns: String, Masking
/**
 * @param {string} s  substrings add bold brackets to
 * @param {string[]} words  words to search for in substring to add bold brackets to
 * @return {string}
 */
var addBoldTag = function (s, words) {
  // O(m * (n^2 * k - n * k^2)) time complexity
  // O(n) space complexity
  function getMask() {
    const boldChars = new Array(s.length).fill(false);

    for (const word of words) {
      // Find all starts of word & tag in array
      let startIdx = s.indexOf(word);
      while (startIdx !== -1) {
        for (let i = startIdx; i < startIdx + word.length; i++) {
          boldChars[i] = true;
        }

        startIdx = s.indexOf(word, startIdx + 1);
      }
    }

    return boldChars;
  }

  const boldChars = getMask();
  const OPEN = '<b>';
  const CLOSE = '</b>';
  const result = [];
  for (let i = 0; i < s.length; i++) {
    if (boldChars[i] && !boldChars[i - 1]) {
      result.push(OPEN);
    }

    result.push(s[i]);

    if (boldChars[i] && !boldChars[i + 1]) {
      result.push(CLOSE);
    }
  }

  return result.join('');
};

// O((m + n) * k) time complexity
// O(n + max(n, m * k) space complexity
//  where n = # chars in s, m = # words, k = avg word length
// Patterns: Masking, Trie
/**
 * @param {string} s
 * @param {string[]} words
 * @return {string}
 */
var addBoldTag = function (s, words) {
  // O((m + n) * k) time complexity
  // O(max(n, m * k) space complexity
  function getMask() {
    const wordTrie = new Trie();
    for (const word of words) {   // m * k
      wordTrie.add(word);
    }

    const boldChars = new Array(s.length).fill(false);  // n
    for (let startIdx = 0; startIdx < s.length; startIdx++) { // n * k
      // Find all starts of word to max end of word variations & tag in array
      const maxEndIdx = wordTrie.getMaxEndIdx(startIdx, s);
      for (let i = startIdx; i <= maxEndIdx; i++) {
        boldChars[i] = true;
      }
    }

    return boldChars;
  }

  const boldChars = getMask();
  const OPEN = '<b>';
  const CLOSE = '</b>';
  const result = [];
  for (let i = 0; i < s.length; i++) {
    if (boldChars[i] && !boldChars[i - 1]) {
      result.push(OPEN);
    }

    result.push(s[i]);

    if (boldChars[i] && !boldChars[i + 1]) {
      result.push(CLOSE);
    }
  }

  return result.join('');
};

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  add(word) {
    let node = this.root;
    for (const char of word) {
      node.children[char] ??= new TrieNode();
      node = node.children[char];
    }
    node.isWord = true;
  }

  getMaxEndIdx(idx, s) {
    let node = this.root;
    let matchIdx = -1;
    while (idx < s.length) {
      node = node.children[s[idx]];
      if (!node) {
        return matchIdx;
      }

      const nextMatchIdx = node.isWord ? idx : -1;
      matchIdx = Math.max(matchIdx, nextMatchIdx);
      idx++;
    }

    return matchIdx;
  }
}

class TrieNode {
  constructor() {
    this.children = {};
    this.isWord = false;
  }
}