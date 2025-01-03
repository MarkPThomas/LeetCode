// yyyymmdd
// O() time complexity
// O(1) space complexity
// Time to complete: xx min
// Patterns:
// Notes w.r.t. solution:

// 2025/01/03
// O(e + v * log(v)) time complexity
// O(e + v) space complexity
// Time to complete: xx min
// Patterns: Graph BFS
// Notes w.r.t. solution: Worked out solution for notes
/**
 * @param {string} s
 * @param {number[][]} pairs
 * @return {string}
 */
var smallestStringWithSwaps = function (s, pairs) {

  function dfs(s, vertex, chars, indices, adj, visited) {
    chars.push(s[vertex]);
    indices.push(vertex);
    visited[vertex] = true;

    for (const adjacent of adj[vertex]) {
      if (!visited[adjacent]) {
        dfs(s, adjacent, chars, indices, adj, visited);
      }
    }
  }

  const adj = Array(s.length).fill().map(() => []);
  for (const [source, destination] of pairs) {
    adj[source].push(destination);
    adj[destination].push(source);
  }


  const smallest = Array(s.length);
  const visited = Array(s.length);
  for (let vertex = 0; vertex < s.length; vertex++) {
    if (!visited[vertex]) {
      // Get vertices that are in the same component, organized by root
      const chars = [];
      const indices = [];
      dfs(s, vertex, chars, indices, adj, visited);

      // Collect & sort chars in component
      chars.sort();
      indices.sort((a, b) => a - b);

      // Store sorted chars
      for (let idx = 0; idx < chars.length; idx++) {
        smallest[indices[idx]] = chars[idx];
      }
    }
  }

  return smallest.join('');
};

// 2025/01/03
// O((e + v) * alpha(v) + v * log(v)) -> O(e + v * log(v)) time complexity
// O(v) space complexity
// Time to complete: xx min
// Patterns: DSU
// Notes w.r.t. solution: Worked out solution for notes
/**
 * @param {string} s
 * @param {number[][]} pairs
 * @return {string}
 */
var smallestStringWithSwaps = function (s, pairs) {
  const dsu = new DSU(s.length);
  for (const [source, destination] of pairs) {
    dsu.union(destination, source);
  }

  // Get vertices that are in the same component, organized by root
  const rootToComponent = {};
  for (let idx = 0; idx < s.length; idx++) {
    const root = dsu.find(idx);

    if (!rootToComponent[root]) {
      rootToComponent[root] = [];
    }
    rootToComponent[root].push(idx);
  }

  const smallest = Array(s.length);
  for (const indices of Object.values(rootToComponent)) {
    // Collect & sort chars in component
    const chars = [];
    for (const idx of indices) {
      chars.push(s[idx]);
    }
    chars.sort();

    // Store sorted chars
    for (let idx = 0; idx < indices.length; idx++) {
      smallest[indices[idx]] = chars[idx];
    }
  }

  return smallest.join('');
};

class DSU {
  constructor(count) {
    this.roots = [];
    this.ranks = [];
    for (let i = 0; i < count; i++) {
      this.roots[i] = i;
      this.ranks[i] = 1;
    }
  }

  find(x) {
    if (this.roots[x] !== x) {
      this.roots[x] = this.find(this.roots[x]);
    }

    return this.roots[x];
  }

  union(child, parent) {
    let childRoot = this.find(child);
    let parentRoot = this.find(parent);

    if (childRoot === parentRoot) {
      return false;
    }

    if (this.ranks[childRoot] > this.ranks[parentRoot]) {
      const swap = childRoot;
      childRoot = parentRoot;
      parentRoot = swap;
    }

    this.roots[childRoot] = parentRoot;
    this.ranks[parentRoot] += this.ranks[childRoot];

    return true;
  }
}