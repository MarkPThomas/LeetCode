// O() time complexity
// O(1) space complexity
// Time to complete: xx min
// Patterns: Graph
// Notes w.r.t. solution:

/**
 * @param {number} n
 * @param {number[][]} trust
 * @return {number}
 */
 var findJudge = function(n, trust) {
  let townsPeople = new Graph();
  townsPeople.buildGraph(n, trust);

  return townsPeople.trustsNoOneButTrustedByAll();
};

class Graph {
  constructor() {
      this.graph = {};
      this.numberOfPeople;
  }

  buildGraph(n, edges) {
      this.numberOfPeople = n;

      for (let i = 1; i <= n; i++) {
          this.graph[i] = {};
      }

      for (let edge of edges) {
          let [ truster, trusted ] = edge;
          if (!this.graph[truster]) {
              this.graph[truster] = {};
          }
          this.graph[truster][trusted] = true;
      }
  }

  trustsNoOneButTrustedByAll() {
      // we need to find who trusts no one, which means we need to visit all nodes to be sure
      // depth first search, 2-way trust possible

      let trustsNoOne = [];
      for (let i = 1; i <= this.numberOfPeople; i++) {
          let peopleTrustedByI = this.graph[i];
          if (Object.keys(peopleTrustedByI).length === 0) {
              trustsNoOne.push(i);
          }
      }

      for (let i = 0; i < trustsNoOne.length; i++) {
          let possibleJudge = trustsNoOne[i];
          let trustedByAll = true;
          for (let j = 1; j <= this.numberOfPeople; j++) {
              // Skip self
              if (j === possibleJudge) {
                  continue;
              }

              if (!this.graph[j][possibleJudge]) {
                  trustedByAll = false;
              }
          }
          if (trustedByAll) {
              return possibleJudge;
          }
      }

      return -1;
  }
}

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