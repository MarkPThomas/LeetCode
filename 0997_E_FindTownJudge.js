// O(e) time complexity
// O(n) space complexity
// where e = # edges (length of 'trust'), n = # of people
// Time to complete: 37 min, half of the time was debugging. A bit too fast submitting.
// Patterns: Graph
// Notes w.r.t. solution:

/**
 * @param {number} n
 * @param {number[][]} trust
 * @return {number}
 */
var findJudge = function (n, trust) {
    if (n === 1) {
        return 1;
    }
    if (trust.length < n - 1) {
        return -1;
    }

    const inDegrees = new Array(n).fill(0);
    const outDegrees = new Array(n).fill(0);
    for (let i = 0; i < trust.length; i++) {
        outDegrees[trust[i][0] - 1]++;
        inDegrees[trust[i][1] - 1]++;
    }

    // Only 1 entry at most satisfies condition, so no checks are needed beyond finding first match
    for (let i = 0; i < n; i++) {
        if (outDegrees[i] === 0 && inDegrees[i] === n - 1) {
            return i + 1;
        }
    }
    return -1;
};

// O(n) time complexity
// O(n) space complexity
// Time to complete: Too long
// Patterns: Graph
// Notes w.r.t. solution:
/**
 * @param {number} n
 * @param {number[][]} trust
 * @return {number}
 */
var findJudge = function (n, trust) {
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
            let [truster, trusted] = edge;
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