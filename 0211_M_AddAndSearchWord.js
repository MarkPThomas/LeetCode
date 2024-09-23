// 2024/09/23
//  Initialize
//    O(1) time complexity
//    O(n) space complexity
//  AddWord
//    O(n) time complexity
//    O(n) space complexity
//  Search
//    O(n) to O(n * 26^n) time complexity (worst case all wildcards)
//    O(1) to (n) space complexity (worst case all wildcards)
// where n = length of word
// Time to complete: 13:20 min
// Patterns: Tries
// Notes w.r.t. solution:

var WordDictionary = function () {
  this.root = {
    children: {}
  };
};

/**
* @param {string} word
* @return {void}
*/
WordDictionary.prototype.addWord = function (word) {
  let node = this.root;
  for (let i = 0; i < word.length; i++) {
    if (!node.children[word[i]]) {
      node.children[word[i]] = {
        isWord: true,
        children: {}
      }
    }
    node = node.children[word[i]];
  }
  node.isWord = word;
};

/**
* @param {string} word
* @return {boolean}
*/
WordDictionary.prototype.search = function (word) {

  function searchWithWildcards(word, start, node) {
    for (let i = start; i < word.length; i++) {
      if (!node.children[word[i]]) {
        if (word[i] === '.') {
          for (const child of Object.values(node.children)) {
            if (searchWithWildcards(word, i + 1, child)) {
              return true;
            }
          }
        }
        return false;
      }
      node = node.children[word[i]];
    }
    return node.isWord;
  }

  return searchWithWildcards(word, 0, this.root);
};

/**
* Your WordDictionary object will be instantiated and called as such:
* var obj = new WordDictionary()
* obj.addWord(word)
* var param_2 = obj.search(word)
*/