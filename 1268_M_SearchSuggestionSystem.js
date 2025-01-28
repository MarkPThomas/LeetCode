// 2025/01/27
// O(n * log(n) + m) time complexity
// O(n) space complexity
//  where n = length of all products
//    m = length of search word
// Time to complete: 18:00 min
// Patterns: Trie
// Notes w.r.t. solution:
/**
 * @param {string[]} products
 * @param {string} searchWord
 * @return {string[][]}
 */
var suggestedProducts = function (products, searchWord) {
  const root = new TrieNode();
  products.sort();

  // Build Trie
  for (const product of products) {
    let node = root;
    for (const char of product) {
      node[char] ??= new TrieNode();
      node = node[char];
      node.products.push(product);
    }

  }

  const allResults = [];
  // Search Trie
  let currNode = root;
  for (const char of searchWord) {
    currNode = currNode[char];

    if (!currNode) {
      allResults.push([]);
      break;
    }

    const results = [];
    for (let i = 0; i < Math.min(3, currNode.products.length); i++) {
      results.push(currNode.products[i]);
    }

    allResults.push(results);
  }

  // Fill up for misses
  const missedSearches = searchWord.length - allResults.length;
  for (let i = 0; i < missedSearches; i++) {
    allResults.push([]);
  }

  return allResults;
};

class TrieNode {
  constructor() {
    this.children = {};
    this.products = [];
  }
}