// 2025/05/18
// O(n) time complexity
// O(1) space complexity
// Time to complete: 2:47 min
// Patterns:
// Notes w.r.t. solution:
/**
 * @param {Function[]} functions
 * @return {Function}
 */
var compose = function (functions) {

  return function (x) {
    for (let i = functions.length - 1; i >= 0; i--) {
      x = functions[i](x);
    }

    return x;
  }
};

/**
* const fn = compose([x => x + 1, x => 2 * x])
* fn(4) // 9
*/