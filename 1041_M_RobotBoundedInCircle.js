// 2024/11/16
// O(n) time complexity
// O(1) space complexity
//  where n = # chars in the instructions
// Time to complete: 15:25 min (13:55 for brute force)
// Patterns:
// Notes w.r.t. solution:
/**
 * @param {string} instructions
 * @return {boolean}
 */
var isRobotBounded = function (instructions) {
  const DIRS = [[0, -1], [1, 0], [0, 1], [-1, 0]];
  let x = 0;
  let y = 0;
  let dir = 0;
  for (let i = 0; i < instructions.length; i++) {
    const instruction = instructions[i];

    if (instruction === 'G') {
      x += DIRS[dir % 4][0];
      y += DIRS[dir % 4][1];
    } else if (instruction === 'L') {
      dir--;
      if (dir < 0) {
        dir = 3;
      }
    } else if (instruction === 'R') {
      dir++;
    }
  }

  return ((x === 0 && y === 0) || dir % 4 !== 0);
};