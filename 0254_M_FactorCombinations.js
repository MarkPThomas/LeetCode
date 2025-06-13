// 2025/06/12
// O(n^?) time complexity
// O(sqrt(n)?) space complexity
// Time to complete: 37:51 min
// Patterns: Backtracking
// Notes w.r.t. solution: Mostly solved in 22:54.
//  Remainder of time was in debugging subleties.
// Key was in not sorting factors, but generating a separate & consistent key to check 'visited'.
/**
 * @param {number} n
 * @return {number[][]}
 */
var getFactors = function (n) {
  // [] for n === 1
  // [1, 2] = 1 * 2 for n = 2
  const allFactors = [];
  const visited = {};

  function divideBy(val, factors) {
    if (val === 1) {
      return;
    }

    for (let i = 2; i <= val / 2; i++) {
      if (val % i === 0) {
        factors.pop();
        factors.push(i, val / i);
        const key = getKey(factors);
        if (!(key in visited)) {
          visited[key] = true;
          allFactors.push([...factors]);

          divideBy(val / i, factors);
        }

        factors.pop();
        factors.pop();
        factors.push(val);
      }
    }
  }

  function getKey(arr) {
    const freqs = {};
    for (const num of arr) {
      freqs[num] = (freqs[num] ?? 0) + 1;
    }

    let key = ''
    for (const [num, count] of Object.entries(freqs)) {
      key += `${num}:${count}-`
    }
    return key;
  }

  divideBy(n, []);
  return allFactors;
};

// 2025/06/12
// O(n^?) time complexity
// O(sqrt(n)?) space complexity
// Time to complete: 37:51 min
// Patterns: Backtracking
// Notes w.r.t. solution: Mostly solved in 22:54.
//  Remainder of time was in debugging subleties.
// Key was in not sorting factors, but generating a separate & consistent key to check 'visited'.
/**
 * @param {number} n
 * @return {number[][]}
 */
var getFactors = function (n) {
  // [] for n === 1
  // [1, 2] = 1 * 2 for n = 2
  const allFactors = [];
  const visited = {};
  function divideBy(val, factors) {
    if (val === 1) {
      return;
    }

    for (let i = 2; i <= val / 2; i++) {
      if (val % i === 0) {
        factors.pop();
        factors.push(i, val / i);
        const key = [...factors].sort((a, b) => a - b);
        if (!(key in visited)) {
          visited[key] = true;
          allFactors.push([...factors]);

          divideBy(val / i, factors);
        }

        factors.pop();
        factors.pop();
        factors.push(val);
      }
    }
  }

  divideBy(n, []);
  return allFactors;
};