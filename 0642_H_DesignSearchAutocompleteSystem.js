// 2025/01/25
// O(n * k + m * (n + m / k) * A) time complexity
// O(k * (n * k + m)) space complexity
//  where A = log(n + m / k) for sort, A = 1 for heap/Priority Queue
//    n = # sentences
//    k = average sentence length
//    m = # times input is called
// Time to complete: OT min
// Patterns: Trie
// Notes w.r.t. solution: Was close, got too complex.
/**
 * @param {string[]} sentences
 * @param {number[]} times
 */
var AutocompleteSystem = function (sentences, times) {
  this.topK = 3;
  this.root = new TrieNode();
  this.currNode = this.root;
  this.currSentence = [];

  for (let i = 0; i < sentences.length; i++) {
    const sentence = sentences[i];
    const timesUsed = times[i];
    this.addToTrie(sentence, timesUsed);
  }
};

AutocompleteSystem.prototype.addToTrie = function (sentence, count) {
  let node = this.root;
  for (const char of sentence) {
    node.children[char] ??= new TrieNode();
    node = node.children[char];

    node.sentences[sentence] = (node.sentences[sentence] || 0) + count;
  }
}

/**
* @param {character} c
* @return {string[]}
*/
AutocompleteSystem.prototype.input = function (c) {
  if (c === '#') {
    this.addToTrie(this.currSentence.join(''), 1);
    this.currSentence = [];

    this.currNode = this.root;

    return [];
  } else {
    this.currSentence.push(c);

    this.currNode = this.currNode?.children[c];
    if (!this.currNode) {
      return [];
    }

    // return this.getTopK();
    return this.getTopKPQ();
  }

};

AutocompleteSystem.prototype.getTopK = function () {
  /// Basic Sorting solution
  const sentences = Object.entries(this.currNode.sentences).sort((a, b) => {
    if (a[1] === b[1]) { // Counts are equal sort ascending alphabetically
      return a[0].localeCompare(b[0]);
    }
    return b[1] - a[1]; // Sort descending by count
  });

  const topSentences = [];
  for (let i = 0; i < Math.min(sentences.length, this.topK); i++) {
    topSentences.push(sentences[i][0]);
  }

  return topSentences;
}

AutocompleteSystem.prototype.getTopKPQ = function () {
  /// Optimized Heap Sorting solution
  // Sort reverse for minPQ
  const minSentences = new PriorityQueue({
    compare: (a, b) => {
      if (a[1] === b[1]) { // Counts are equal sort descending alphabetically
        return b[0].localeCompare(a[0]);
      }
      return a[1] - b[1]; // Sort ascending by count
    }
  });

  for (const sentence of Object.entries(this.currNode.sentences)) {
    minSentences.enqueue(sentence);
    if (minSentences.size() > this.topK) {
      minSentences.dequeue();
    }
  }

  const topSentences = [];
  while (minSentences.size()) {
    topSentences.push(minSentences.dequeue()[0]);
  }

  return topSentences.reverse();
}

class TrieNode {
  constructor() {
    this.children = {};
    this.sentences = {};
  }
}

/**
* Your AutocompleteSystem object will be instantiated and called as such:
* var obj = new AutocompleteSystem(sentences, times)
* var param_1 = obj.input(c)
*/