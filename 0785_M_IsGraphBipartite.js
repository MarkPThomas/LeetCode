// O(v + e) time complexity
// O(v) space complexity
//  where v = # vertices, e = # edges
// Time to complete: 9:12 min
// Patterns: Graph - BFS
// Notes w.r.t. solution: Coloring by BFS. Did after seeing solution hint/rationale.
/**
 * @param {number[][]} graph
 * @return {boolean}
 */
var isBipartite = function (graph) {
  const visited = {};

  for (let start = 0; start < graph.length; start++) {
    if (start in visited) {
      continue;
    }
    visited[start] = true;

    const regionTags = {};

    let region = [start];
    let color = 1;
    while (region.length) {
      color *= -1; // Flip color for next region

      const nextRegion = [];
      for (let i = 0; i < region.length; i++) {
        const node = region[i];
        visited[node] = true;

        if (!(node in regionTags)) {
          regionTags[node] = color;
          nextRegion.push(...graph[node])
        } else if (regionTags[node] !== color) {
          return false;
        }
      }
      region = nextRegion;
    }
  }

  return true;
};


// O() time complexity
// O(1) space complexity
// Time to complete: 50:00 (OT) min @ 66/82
// Patterns: Graph - DFS
// Notes w.r.t. solution:
/**
 * @param {number[][]} graph
 * @return {boolean}
 */
var isBipartite = function (graph) {
  // there cannot be more than v edges for a bipartite graph?
  //  1. Each node in a set must have at least one edge that connects to a node
  //      in the other set
  //  2. Nodes in a set cannot have edges that connect to other nodes in the set

  // Cannot have cycles
  // DFS
  function dfs(node, prev, visited) {
    visited[node] = false;
    for (const nextNode of graph[node]) {
      if (nextNode === prev) {
        continue;
      }

      if (nextNode in visited || !dfs(nextNode, node, visited)) { // Cycle
        // cycle is OK if it completes a shape, but not within a shape
        // i.e. node can have 1 incoming & 1 outgoing edge & still be OK
        return graph[nextNode].length < 3;
      }
    }
    visited[node] = true;

    return true;
  }

  for (let i = 0; i < graph.length; i++) {
    const visited = {};
    if (!dfs(i, null, visited)) {
      return false;
    }
  }

  // Count # nodes & edges
  //  If v = even # nodes, there must be 2*v edges
  //  If v = odd # nodes, there must be 2*v - 1 edges (or < 2*v edges?)

  // Get nodes count
  const numNodes = graph.length;
  let numEdges = 0;
  for (const edges of graph) {
    numEdges += edges.length;
  }

  if (numNodes % 2) {
    return numEdges < 2 * numNodes;
  } else {
    return numEdges <= 2 * numNodes;
  }
};

// ==== Solution ====
// O(v + e) time complexity
// O(v) space complexity
//  where v = # vertices, e = # edges
// Patterns: Graph - DFS
// Notes w.r.t. solution: Coloring by DFS

// Color a node blue if it is part of the first set, else red.
// We should be able to greedily color the graph if and only if it is bipartite:
//  one node being blue implies all it's neighbors are red, all those neighbors are blue, and so on.

