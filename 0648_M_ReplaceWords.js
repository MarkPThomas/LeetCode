// 2024/10/02
// O(d * w + s * w) time complexity
// O(d * w + s * w) space complexity
//    where d = # words in dictionary
//      s = # words in sentence
//      w = avg word length
// Time to complete: 22:47 min
// Patterns: Trie
// Notes w.r.t. solution: Solved in 12:44 but had minor bugs
/**
 * @param {string[]} dictionary
 * @param {string} sentence
 * @return {string}
 */
var replaceWords = function (dictionary, sentence) {
  const words = sentence.split(' ');  // T: O(s * w)

  const trie = new Trie();            // T: O(d * w)
  for (const word of dictionary) {
    trie.add(word);
  }

  for (let i = 0; i < words.length; i++) {  // T: O(s * w)
    const prefix = trie.prefix(words[i]);   // T: O(w)
    if (prefix) {
      words[i] = prefix;
    }
  }

  return words.join(' ');
};

class TrieNode {
  constructor() {
    this.children = {};
    this.word = ''
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  add(str) {
    let node = this.root;
    let idx = 0;
    while (idx < str.length) {
      if (!node.children[str[idx]]) {
        node.children[str[idx]] = new TrieNode();
      }
      node = node.children[str[idx]];
      idx++;
    }
    node.word = str;
  }

  prefix(str) {
    let node = this.root;
    let idx = 0;
    while (idx < str.length && node.children[str[idx]]) {
      if (node.word) {
        return node.word;
      }
      node = node.children[str[idx]];
      idx++;
    }

    return node.word;
  }
}