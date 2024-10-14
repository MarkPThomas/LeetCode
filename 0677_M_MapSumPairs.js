// 2024/10/11
//  Initialization
// O(1) time complexity
// O(m) space complexity
//  Insert
// O(c) time complexity
// O(1) space complexity
//  Sum
// O(c) time complexity
// O(1) space complexity
//  where c = # characters in key/prefix
//    m = # of matching prefixes
// Time to complete: 26:00 min (including refactoring from prior solution)
// Patterns: Trie (prefix)
// Notes w.r.t. solution: Improved efficiency by pre-calculating sums & only storing one listing of a prefix w/ val.

var MapSum = function () {
  this.root = new TrieNode();
  this.prefixes = {};
};

/**
* @param {string} key
* @param {number} val
* @return {void}
*/
MapSum.prototype.insert = function (key, val) {
  // Update prefix score if necessary & get delta adjustment
  const delta = val - (this.prefixes[key] ?? 0);
  this.prefixes[key] = val;

  // Traverse tree & update scores as necessary
  let node = this.root;
  node.score += delta;
  for (let i = 0; i < key.length; i++) {
    if (!node.children[key[i]]) {
      node.children[key[i]] = new TrieNode();
    }
    node = node.children[key[i]];
    node.score += delta;
  }
  node.wordVal = val;
};

/**
* @param {string} prefix
* @return {number}
*/
MapSum.prototype.sum = function (prefix) {
  let node = this.root;
  for (let i = 0; i < prefix.length; i++) {
    node = node.children[prefix[i]];

    if (!node) {
      return 0;
    }
  }

  return node.score;
};

/**
* Your MapSum object will be instantiated and called as such:
* var obj = new MapSum()
* obj.insert(key,val)
* var param_2 = obj.sum(prefix)
*/

class TrieNode {
  constructor() {
    this.children = {};
    this.score = 0;
  }
}

// 2024/10/11
//  Initialization
// O(1) time complexity
// O(m * c) space complexity
//  Insert
// O(c) time complexity
// O(1) space complexity
//  Sum
// O(c + m) time complexity
// O(1) space complexity
//  where c = # characters in key/prefix
//    m = # of matching prefixes
// Time to complete: 21:00 min
// Patterns: Trie (prefix)
// Notes w.r.t. solution:

var MapSum = function () {
  this.root = new TrieNode();
};

/**
* @param {string} key
* @param {number} val
* @return {void}
*/
MapSum.prototype.insert = function (key, val) {
  let node = this.root;
  for (let i = 0; i < key.length; i++) {
    if (!node.children[key[i]]) {
      node.children[key[i]] = new TrieNode();
    }
    node = node.children[key[i]];
    node.prefixVals[key] = val;
  }
  node.wordVal = val;
};

/**
* @param {string} prefix
* @return {number}
*/
MapSum.prototype.sum = function (prefix) {
  let node = this.root;
  for (let i = 0; i < prefix.length; i++) {
    node = node.children[prefix[i]];

    if (!node) {
      return 0;
    }
  }

  let sum = 0;
  for (const val of Object.values(node.prefixVals)) {
    sum += val;
  }

  return sum;
};

/**
* Your MapSum object will be instantiated and called as such:
* var obj = new MapSum()
* obj.insert(key,val)
* var param_2 = obj.sum(prefix)
*/

class TrieNode {
  constructor() {
    this.children = {};
    this.wordVal = 0;
    this.prefixVals = {};
  }
}