// 2024/10/04
// Time to complete: 10:03  min
// Patterns: Trie
// Notes w.r.t. solution:
class TrieNode {
  constructor() {
    this.children = {};
    this.isWord = false;
  }
}

var Trie = function () {
  this.root = new TrieNode();
};

/**
* @param {string} word
* @return {void}
*/
Trie.prototype.insert = function (word) {
  let node = this.root;
  for (let i = 0; i < word.length; i++) {
    if (!node.children[word[i]]) {
      node.children[word[i]] = new TrieNode();
    }
    node = node.children[word[i]];
  }
  node.isWord = true;
};

/**
* @param {string} word
* @return {boolean}
*/
Trie.prototype.search = function (word) {
  let node = this.root;
  for (let i = 0; i < word.length; i++) {
    if (!node.children[word[i]]) {
      return false;
    }
    node = node.children[word[i]];
  }
  return node.isWord;
};

/**
* @param {string} prefix
* @return {boolean}
*/
Trie.prototype.startsWith = function (prefix) {
  let node = this.root;
  for (let i = 0; i < prefix.length; i++) {
    if (!node.children[prefix[i]]) {
      return false;
    }
    node = node.children[prefix[i]];
  }
  return true;
};

/**
* Your Trie object will be instantiated and called as such:
* var obj = new Trie()
* obj.insert(word)
* var param_2 = obj.search(word)
* var param_3 = obj.startsWith(prefix)
*/


// 2023/08
// Time to complete: 11 min
// Patterns: Trie
// Notes w.r.t. solution:

class Node {
  constructor() {
    this.children = {};
    this.isWord = false;
  }
}

// O(1) time complexity
// O(1) space complexity
var Trie = function () {
  this.head = new Node();
};

// O(n) time complexity
// O(n) space complexity
// where n = length of word
/**
* @param {string} word
* @return {void}
*/
Trie.prototype.insert = function (word) {
  let node = this.head;
  for (let i = 0; i < word.length; i++) {
    const char = word[i];
    if (!node.children[char]) {
      node.children[char] = new Node();
    }
    node = node.children[char];
  }
  node.isWord = true;
};

// O(n) time complexity
// O(1) space complexity
// where n = length of word
/**
* @param {string} word
* @return {boolean}
*/
Trie.prototype.search = function (word) {
  let node = this.head;
  for (let i = 0; i < word.length; i++) {
    const char = word[i];
    if (!node.children[char]) {
      return false;
    }
    node = node.children[char];
  }
  return node.isWord;
};

// O(n) time complexity
// O(1) space complexity
// where n = length of prefix
/**
* @param {string} prefix
* @return {boolean}
*/
Trie.prototype.startsWith = function (prefix) {
  let node = this.head;
  for (let i = 0; i < prefix.length; i++) {
    const char = prefix[i];
    if (!node.children[char]) {
      return false;
    }
    node = node.children[char];
  }
  return true;
};

/**
* Your Trie object will be instantiated and called as such:
* var obj = new Trie()
* obj.insert(word)
* var param_2 = obj.search(word)
* var param_3 = obj.startsWith(prefix)
*/