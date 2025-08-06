// 2025/04/17
// O() time complexity
// O() space complexity
// Time to complete: 26:50/50:48 min TLE @ 20/38
// Patterns: Graph DFS
// Notes w.r.t. solution: Solved w/ less efficient comparison (26:50) then added '*' var comparison (+24:00 to 50:48).
//  Still too inefficient. It turns out I needed to do BFS w/ backtracking instead of DFS w/ backtracking
/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {string[][]}
 */
var findLadders = function (beginWord, endWord, wordList) {
  //  graph of word permutations
  //  each permutation can only change one char, which determines 'directions'/branches
  //  BFS gets 'shortest path'
  //  For tracking path, might need DFS & compare valid path lengths?
  //  build graph as we go, track last permuation to avoid backtracking, using wordList

  function addWordMasks(word) {
    wordMap[word] = new Set();

    const letters = word.split('');

    for (let i = 0; i < letters.length; i++) {
      const char = letters[i];
      letters[i] = '*';

      const mask = letters.join('');
      wordMap[mask] ??= new Set();

      wordMap[mask].add(word);
      wordMap[word].add(mask);

      letters[i] = char;
    }
  }

  function getNextWords(word) {
    const allNextWords = [];

    const wordMasks = [...wordMap[word]];
    for (const wordMask of wordMasks) {
      for (const nextWord of wordMap[wordMask]) {

        if (usedWords.has(nextWord)) {
          continue;
        }
        allNextWords.push(nextWord);
      }
    }

    return allNextWords;
  }

  const wordMap = {};
  addWordMasks(beginWord);
  for (const word of wordList) {
    addWordMasks(word);
  }

  if (!(endWord in wordMap)) {
    return [];
  }

  let minWordPaths = [];
  let minWordPathLength = Infinity;
  const wordPath = [beginWord];

  const usedWords = new Set();
  usedWords.add(beginWord);

  function dfs(word) {
    if (word === endWord) {
      if (wordPath.length < minWordPathLength) {
        minWordPathLength = wordPath.length;
        minWordPaths = [[...wordPath]];
      } else if (wordPath.length === minWordPathLength) {
        minWordPaths.push([...wordPath]);
      }
      return;
    }

    const nextWords = getNextWords(word);

    for (const nextWord of nextWords) {
      usedWords.add(nextWord);
      wordPath.push(nextWord);

      dfs(nextWord);

      wordPath.pop();
      usedWords.delete(nextWord);
    }
  }

  dfs(beginWord);

  return minWordPaths;
};

// ==== Solution ====
// O(n * c^2) time complexity
// O(n * c) space complexity
//  where n = # words in list, c = # chars in any word
// Patterns: Graph BFS, Backtracking
// Notes w.r.t. solution:
/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {string[][]}
 */
var findLadders = function (beginWord, endWord, wordList) {
  // Checks if two words a and b are connected
  function isConnected(a, b) {
    let c = 0;
    for (let i = 0; i < a.length && c < 2; i++) {
      if (a[i] !== b[i]) c++;
    }
    return c === 1;
  }

  // Construct the Shortest Paths from endWord
  function constructPaths(endWord, nodesByLevel) {
    let paths = [[endWord]];
    for (let level = nodesByLevel.length - 1; level >= 0; level--) {
      const nextPaths = [];
      for (let i = 0; i < paths.length; i++) { // for each path till now
        const path = paths[i];
        const first = path[0]; // first word of current path

        for (let word of nodesByLevel[level]) { // for each word(node) and current level
          if (isConnected(first, word)) {
            nextPaths.push([word, ...path]);
          }
        }
      }
      paths = nextPaths;
    }
    return paths;
  }

  const wordSet = new Set(wordList);
  const nodesByLevel = []; // stores connected nodes per level
  let currWords = [beginWord]; // ONLY stores all connected nodes
  let reached = false; // indidcates if we reached the endWord

  // Finds nodes at each level that leads us from beginWord to endWord
  while (currWords.length && !reached) {
    nodesByLevel.push([...currWords]);

    const nextWords = [];
    for (let i = 0; i < currWords.length && !reached; i++) {
      const from = currWords[i];

      for (const to of wordSet) {
        if (!isConnected(from, to)) {
          continue;
        }
        if (to === endWord) {
          reached = true;
          break;
        }
        nextWords.push(to);
        wordSet.delete(to);
      }
    }
    currWords = nextWords;
  }

  // If there is no path found
  if (!reached) {
    return [];
  }

  return constructPaths(endWord, nodesByLevel)
};