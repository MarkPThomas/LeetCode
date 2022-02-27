// O() time complexity
// O(1) space complexity
// Time to complete: Over time - learning graph construction from solution. Study for later examples
// Patterns: Graph, BFS
// Notes w.r.t. solution: Study up again on Sets, classes, BFS vs. DFS w/ arrays & 2-way connections (e.g. visited status)

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

  buildGraph(edges, numberOfEdges) { // O(N)
      for (let i = 0; i < numberOfEdges; i++) { // O(N)
          this.graph[i] = [];
      }

      // Set up associations
      for (let edge of edges) { // O(N)
          const [nodeI, nodeJ] = edge;

          this.graph[nodeI].push(nodeJ);
          this.graph[nodeJ].push(nodeI);
      }
  }

  hasPath(source, destination) {
      const visited = new Set();
      const toVisit = [source];

      while (toVisit.length) { // O(N) at worst
          let currentNode = toVisit.shift(); // BFS, typ. faster for finding a path than DFS
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