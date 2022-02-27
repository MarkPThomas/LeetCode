// O() time complexity
// O(1) space complexity
// Time to complete: Over time - learning graph construction from solution. Study for later examples
// Patterns: Graph, BFS, Bi-directional BFS
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

  buildGraph(edges, numberOfEdges) {
      // Below is only OK based on definition of N & formation of graph, otherwise hashes should be based on edges noes & NOT i
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
      const sourceVisited = new Set();
      const sourceToVisit = [source];

      const destinationVisited = new Set();
      const destinationToVisit = [destination];

      while (sourceToVisit.length && destinationToVisit.length) {
          // Bi-directional BFS
          let currentSourceNode = sourceToVisit.shift(); // BFS
          sourceVisited.add(currentSourceNode);

          let currentDestinationNode = destinationToVisit.shift(); // BFS
          destinationVisited.add(currentDestinationNode);

          if (sourceVisited.has(currentDestinationNode) || destinationVisited.has(currentSourceNode)) {
              return true;
          } else {
              // Add associations to stack if not visited
              this.updateToVisit(sourceToVisit, sourceVisited, currentSourceNode);
              this.updateToVisit(destinationToVisit, destinationVisited, currentDestinationNode);
          }
      }

      return false;
  }

  updateToVisit(toVisit, visited, currentNode) {
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