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
