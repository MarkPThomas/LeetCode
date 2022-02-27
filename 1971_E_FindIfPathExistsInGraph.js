// O() time complexity
// O(1) space complexity
// Time to complete: xx min
// Patterns: Graph
// Notes w.r.t. solution:

/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} source
 * @param {number} destination
 * @return {boolean}
 */
 var validPath = function(n, edges, source, destination) {
  const graph = new Graph();
  graph.buildGraph(edges, n);
  return graph.hasPath(source, destination);
};

class Graph {
  constructor() {
      this.graph = {};
  }

  buildGraph(edges, numberOfEdges) {
      // I don't like this. It presumes range of values < # of edges
      // Also does not scale well if range of values is large if using edges.length
      // See if hash map can replace
      for (let i = 0; i < numberOfEdges; i++) {
          this.graph[i] = [];
      }

      // Set up associations
      for (let edge of edges) {
          const [nodeI, nodeJ] = edge;

          this.graph[nodeI].push(nodeJ);
          this.graph[nodeJ].push(nodeI);
      }
  }

  hasPath(source, destination) {
      const visited = new Set();
      const toVisit = [source];

      while (toVisit.length) {
          let currentNode = toVisit.shift(); // BFS
          visited.add(currentNode);

          if (currentNode === destination) {
              return true;
          } else {
              // Add associations to stack if not visited
              let associations = this.graph[currentNode];
              for (let association of associations) {
                  if (visited.has(association)) {
                      continue;
                  }

                  toVisit.push(association);
              }
          }
      }

      return false;
  }
}

// Test later
// const testCases = [
// { input: '',
//   expected: ''},
// ];

// testCases.forEach((testCase) => {
//   // let result = FUT(testCase.input); // insert function name here
//   let pass = result === testCase.expected;
//   console.log(`Input: ${testCase.input}\nExpected: ${testCase.expected}\nResult: ${result}\nPass: ${pass}\n`);
//   }
// );