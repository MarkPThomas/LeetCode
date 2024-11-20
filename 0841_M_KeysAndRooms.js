// 2024/11/20
// O(n + e) time complexity
// O(n) space complexity
// where n = # rooms,
//    e = # edges between rooms
// Time to complete: 8:25 min
// Patterns: Graph DFS
// Notes w.r.t. solution:
/**
 * @param {number[][]} rooms
 * @return {boolean}
 */
var canVisitAllRooms = function (rooms) {
  const visited = {};
  const stack = [0];
  while (queue.length) {
    const room = stack.pop();
    const keys = rooms[room];
    for (const key of keys) {
      if (!visited[key]) {
        stack.push(key);
      }
    }

    visited[room] = true;
  }

  return Object.keys(visited).length === rooms.length;
};