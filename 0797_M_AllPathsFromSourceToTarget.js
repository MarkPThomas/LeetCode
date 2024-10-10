// 2024/10/10
// O(n + m) time complexity
// O(1) space complexity
// Time to complete: 14:08 min (total after refactoring from DFS solution)
// Patterns: Graph, BFS w/ Iteration
// Notes w.r.t. solution:
/**
 * @param {number[][]} graph
 * @return {number[][]}
 */
var allPathsSourceTarget = function (graph) {
  const source = 0;
  const target = graph.length - 1;
  const paths = [];

  const queue = [];
  queue.push([graph[source], [source]]);
  while (queue.length) {
    const [neighbors, path] = queue.shift();

    for (const neighbor of neighbors) {
      const item = [graph[neighbor], [...path, neighbor]];
      if (neighbor === target) {
        paths.push(item[1]);
      } else {
        queue.push(item);
      }
    }
  }

  return paths;
};


// 2024/10/10
// O(n + m) time complexity
// O(1) space complexity
// Time to complete: 12:43 min
// Patterns: Graph, DFS w/ Iteration
// Notes w.r.t. solution:
/**
 * @param {number[][]} graph
 * @return {number[][]}
 */
var allPathsSourceTarget = function (graph) {
  const source = 0;
  const target = graph.length - 1;
  const paths = [];

  const stack = [];
  stack.push([graph[source], [source]]);
  while (stack.length) {
    const [neighbors, path] = stack.pop();

    for (const neighbor of neighbors) {
      const item = [graph[neighbor], [...path, neighbor]];
      if (neighbor === target) {
        paths.push(item[1]);
      } else {
        stack.push(item);
      }
    }
  }

  return paths;
};