// 2025/05/13
// O(n) time complexity
// O(1) space complexity
// Time to complete: 3:47 min
// Patterns:
// Notes w.r.t. solution:

/**
 * @param {string} moves
 * @return {boolean}
 */
var judgeCircle = function (moves) {
  const moveQuants = {
    'L': [-1, 0],
    'R': [1, 0],
    'U': [0, 1],
    'D': [0, -1]
  }

  const position = [0, 0];

  for (let i = 0; i < moves.length; i++) {
    position[0] += moveQuants[moves[i]][0];
    position[1] += moveQuants[moves[i]][1];
  }

  return position[0] === 0 && position[1] === 0;
};