// 2025/02/03
// O(r * c * 3^w) time complexity
// O(n * w) space complexity
//  where n = # words, w = avg # chars per word, r = # rows, c = # cols
// Time to complete: 30:00 min - 39:34 min for delete optimization
// Patterns: Backtracking, Trie
// Notes w.r.t. solution: Don't forget to remove word from trie - at min reset word prop, at best remove leaf nodes
/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function (board, words) {
  const VISITED = '_'
  const DIRS = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  function getWords(row, col, parent, wordsFound) {
    const char = board[row][col];

    const node = parent?.children[char];
    if (!node) {
      return;
    }

    // Add word & remove as one in trie
    if (node.word) {
      wordsFound.push(node.word);
      node.word = '';
    }

    // Mark visited & keep searching
    board[row][col] = VISITED;

    for (const [deltRow, deltCol] of DIRS) {
      const nextRow = row + deltRow;
      const nextCol = col + deltCol;

      // Check in-bounds or visited
      if (nextRow < 0 || board.length <= nextRow
        || nextCol < 0 || board[0].length <= nextCol
        || board[nextRow][nextCol] === VISITED) {
        continue;
      }

      getWords(nextRow, nextCol, node, wordsFound);
    }

    // Unmark visited & remove char from Trie
    board[row][col] = char;
    if (!Object.keys(node.children).length) {
      delete parent.children[char];
    }
  }

  function addWord(word, root) {
    let node = root;
    for (const char of word) {
      node.children[char] ??= new TrieNode();
      node = node.children[char];
    }
    node.word = word;
  }

  const trie = new TrieNode();
  for (const word of words) {
    addWord(word, trie);
  }

  const wordsFound = [];
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      getWords(row, col, trie, wordsFound);

      if (wordsFound.length === words.length) {
        return wordsFound;
      }
    }
  }

  return wordsFound;
};

class TrieNode {
  constructor() {
    this.word = '';
    this.children = {};
  }
}