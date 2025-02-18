// 2025/02/13
// O(n * k^2) time complexity
// O((n + k)^2) space complexity
//  where n = # words, k = longest word length
// Time to complete: NA min
// Patterns: Hashmap
// Notes w.r.t. solution: Worked Solution
/**
 * @param {string[]} words
 * @return {number[][]}
 */
var palindromePairs = function (words) {
  function allValidPrefixes(word) {
    const validPrefixes = [];
    for (let i = 0; i < word.length; i++) {
      if (isPalindromeBetween(word, i, word.length - 1)) {
        validPrefixes.push(word.substring(0, i));
      }
    }
    return validPrefixes;
  }

  function allValidSuffixes(word) {
    const validSuffixes = [];
    for (let i = 0; i < word.length; i++) {
      if (isPalindromeBetween(word, 0, i)) {
        validSuffixes.push(word.substring(i + 1, word.length));
      }
    }
    return validSuffixes;
  }

  function isPalindromeBetween(word, front, back) {
    while (front < back) {
      if (word[front] !== word[back]) {
        return false;
      }
      front++;
      back--;
    }
    return true;
  }

  const wordIdxs = {};
  for (let i = 0; i < words.length; i++) {
    wordIdxs[words[i]] = i;
  }

  const solution = [];
  for (const [word, wordIdx] of Object.entries(wordIdxs)) {

    // Build solutions of case #1. This word will be word 1.
    // Palindrome found as another word in the list
    const reversedWord = word.split('').reverse().join('');
    if (reversedWord in wordIdxs && wordIdxs[reversedWord] !== wordIdx) {
      solution.push([wordIdx, wordIdxs[reversedWord]]);
    }

    // Build solutions of case #2. This word will be word 2.
    const validSuffixes = allValidSuffixes(word);
    for (const suffix of validSuffixes) {
      const reversedSuffix = suffix.split('').reverse().join('');
      if (reversedSuffix in wordIdxs) {
        solution.push([wordIdxs[reversedSuffix], wordIdx]);
      }
    }

    // Build solutions of case #3. This word will be word 1.
    const validPrefixes = allValidPrefixes(word);
    for (const prefix of validPrefixes) {
      const reversedPrefix = prefix.split('').reverse().join('');
      if (reversedPrefix in wordIdxs) {
        solution.push([wordIdx, wordIdxs[reversedPrefix]]);
      }
    }
  }

  return solution;
};

// 2025/02/11
// O(n^2 * k) time complexity
// O(n^2 + k) space complexity
//  where n = # words, k = longest word length
// Time to complete: NA min
// Patterns: Brute Force - TLE
// Notes w.r.t. solution: Worked Solution
/**
 * @param {string[]} words
 * @return {number[][]}
 */
var palindromePairs = function (words) {
  const pairs = [];
  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < words.length; j++) {
      if (i === j) {
        continue;
      }
      const combined = words[i] + words[j];
      const reversed = combined.split('').reverse().join('');
      if (combined === reversed) {
        pairs.push([i, j]);
      }
    }
  }

  return pairs;
};


// 2025/02/11
// O(n * k^2) time complexity
// O(n^2 * k ) space complexity
//  where n = # words, k = longest word length
// Time to complete: NA min
// Patterns: Trie
// Notes w.r.t. solution: Worked Solution
/**
 * @param {string[]} words
 * @return {number[][]}
 */
var palindromePairs = function (words) {
  // make a tree of all words, marked by word & index
  const trie = new Trie();
  for (let i = 0; i < words.length; i++) {
    trie.add(words[i], i);
  }

  const pairs = [];
  for (let i = 0; i < words.length; i++) {
    let matches = trie.search(words[i]);
    for (const j of matches) {
      if (i !== j) {
        pairs.push([i, j]);
      }
    }
  }

  return pairs;
};

class TrieNode {
  constructor() {
    this.children = {};
    this.isWord = false;
    this.j = -1;
    this.jPals = [];
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  hasPalindromeRemaining(word, start, end) {
    let p1 = start ?? 0;
    let p2 = end ?? word.length - 1;
    while (p1 < p2) {
      if (word[p1] !== word[p2]) {
        return false;
      }
      p1++;
      p2--;
    }
    return true;
  }

  add(word, j) {
    let node = this.root;
    for (let i = word.length - 1; i >= 0; i--) {
      if (this.hasPalindromeRemaining(word, null, i)) {
        node.jPals.push(j);
      }

      const char = word[i];
      node.children[char] ??= new TrieNode();
      node = node.children[char];
    }

    node.isWord = true;
    node.j = j;
  }

  search(word) {
    const indices = [];

    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      // Case 3: Word longer than word checked
      if (node.isWord && this.hasPalindromeRemaining(word, i)) {
        indices.push(node.j);
      }

      node = node.children[word[i]];
      if (!node) {
        return indices;
      }
    }

    // Case 1: Word length same as word checked
    if (node.isWord) {
      indices.push(node.j);
    }

    // Case 2: Word length shorter than word checked
    for (const jPal of node.jPals) {
      indices.push(jPal);
    }

    return indices;
  }
}

// 2025/02/11
// O() time complexity
// O() space complexity
// Time to complete: 1:14:29 OT min @ 2/3 initial
// Patterns: Trie
// Notes w.r.t. solution: Was close on concepts! Especially first 2 of 3 cases
/**
 * @param {string[]} words
 * @return {number[][]}
 */
var palindromePairs = function (words) {
  // make a tree of all words, marked by word & index
  const trie = new Trie();
  const palsAt = Array(words.length);
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (!word) {
      continue;
    }

    // Find when a word becomes a palindrome if ignoring beginning
    let palAt = -1;
    let left = 0;
    while (left < word.length) {
      if (word[left] !== word[word.length - 1]) {
        left++;
      } else {
        const remainder = word.substring(left);

        if (remainder === remainder.split().reverse().join()) {
          palAt = left;
          break;
        } else { // continue search
          left++;
        }
      }
    }

    palsAt[i] = palAt;
    trie.add(word, i, palAt);
  }

  const pairs = [];
  for (let i = 0; i < words.length; i++) {
    if (!words[i]) {
      // Add all palindromes at root
      const jPals = trie.search(words[i]);
      for (const jPal of jPals) {
        pairs.push([i, jPal]);
        pairs.push([jPal, i]);
      }

      continue;
    }

    if (words[i].length === 1) {
      // Skip, as it will get a false-positive on itself
      continue;
    }

    // See if it's reverse exists in the tree,
    //  or subtracting its reverse & is a palindrome
    let js = trie.search(words[i], palsAt[i]);

    // if so, add the pair
    for (const j of js) {
      pairs.push([i, j]);
    }
  }

  return pairs;
};

class TrieNode {
  constructor() {
    this.children = {};
    this.isWord = false;
    this.j = -1;
    this.jPals = new Set();
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  add(word, j, palAt) {
    let node = this.root;
    for (let i = word.length - 1; i >= 0; i--) {
      const char = word[i];

      node.children[char] ??= new TrieNode();
      node = node.children[char];

      if (i === palAt) {
        node.jPals.add(j);
      }
    }
    node.isWord = true;
    node.j = j;
  }

  search(word, palAt) {
    const indices = [];

    let node = this.root;
    if (!word) {
      for (const child of Object.values(node.children)) {
        if (child.jPals.size) {
          indices.push(...child.jPals);
        }
      }
      return indices;
    }

    for (let i = 0; i < word.length; i++) {
      const char = word[i];

      // Case of word longer than word checked
      if (node.isWord) {
        if (palAt === i + 1) {
          indices.push(node.j);
        }
      }

      node = node.children[char];
      if (!node) {
        return indices;
      }

    }

    // Case of word length same as word checked
    if (node.isWord) {
      indices.push(node.j);
    }

    // Case of word length shorter than word checked
    for (const child of Object.values(node.children)) {
      if (child.jPals.size) {
        indices.push(...child.jPals);
      }
    }

    return indices;
  }
}