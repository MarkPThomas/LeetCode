// O(1) time complexity
// O(1) space complexity
// Time to complete: 9:42 min
// Patterns:
// Notes w.r.t. solution:

/**
 * @param {number[][]} edges
 * @return {number}
 */
 var findCenter = function(edges) {
  // center node is connected to all edges, since there are n-1 edges in the graph
  // this also means that no other nodes are connected to any other nodes
  // so node common to first 2 edge entries should be common to the rest, by definition
  // this is O(1)

  if (edges.length > 1) {
    let node1 = edges[0][0];
    if (node1 === edges[1][0] || node1 === edges[1][1]) {
        return node1;
    }

    let node2 = edges[0][1];
    if (node2 === edges[1][0] || node2 === edges[1][1]) {
        return node2;
    }
  }
};

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