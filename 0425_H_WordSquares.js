// 2025/02/12
// O(n * k * 26^k) time complexity
// O(n * k) space complexity
//  where n = # words, k = word length (all words are same length), a = length of char set = 26 (constant)
//    note average prefix length  = k / 2
// Time to complete: 59:02 min
// Patterns: Backtracking, Trie
// Notes w.r.t. solution:
/**
 * @param {string[]} words
 * @return {string[][]}
 */
var wordSquares = function (words) {
  function addWord(word, node) { // T: O(k), S: O(k)
    for (const char of word) {
      node.children[char] ??= new TrieNode();
      node = node.children[char];
      node.words.push(word);
    }
  }

  function searchPrefix(prefix, node) { // T: O(k / 2) -> O(k), S:O(1)
    // Traverse to end of prefix
    for (const char of prefix) {
      node = node.children[char];
      if (!node) {
        return [];
      }
    }

    // Return all words that use the prefix
    return node.words;
  }

  function generatePrefix(prefixEnd, wordSquare) { // T: O(k / 2) -> O(k), S: O(k / 2) -> O(k)
    const prefix = [];
    for (let i = 0; i < wordSquare.length; i++) {
      prefix.push(wordSquare[i][prefixEnd]);
    }
    return prefix;
  }

  function backtrack(prefixEnd, wordSquare, root, result) { // T: O(k * 26^k), ), S: O(n * k / 2)
    // We are done once we have equal # words to chars in first word
    if (wordSquare.length === wordSquare[0].length) {
      result.push([...wordSquare]);
    }

    // for each char after the first, build prefix
    // try word that starts w/ char, add char to prefix
    // try next char in chosen word after prefix

    // Get next char & node of last word added
    const nextPrefix = generatePrefix(prefixEnd, wordSquare); // T: O(k + a^k), S: O(k)
    const words = searchPrefix(nextPrefix, root);             // T: O(k), S:O(1)
    for (const word of words) {
      wordSquare.push(word);
      backtrack(prefixEnd + 1, wordSquare, root, result);
      wordSquare.pop();
    }
  }

  const root = new TrieNode();
  for (const word of words) { // T: O(n * k), S: O(n * k)
    addWord(word, root);
  }

  const result = [];
  for (const word of words) { // T: O(n * k * a^k) -> O(n * k * 26^k), S: O(n * k / 2)
    const wordSquare = [word];
    backtrack(1, wordSquare, root, result);
  }

  return result;
};

class TrieNode {
  constructor() {
    this.words = [];
    this.children = {};
  }
}