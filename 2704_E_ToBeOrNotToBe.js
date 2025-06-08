// 2025/06/08
// O(1) time complexity
// O(1) space complexity
// Time to complete: 6:44 min
// Patterns: Functional Programming
// Notes w.r.t. solution:
/**
 * @param {string} val
 * @return {Object}
 */
var expect = function (val) {
  const outerVal = val;

  this.toBe = function (val) {
    if (val === outerVal) {
      return true;
    } else {
      throw "Not Equal";
    }
  }

  this.notToBe = function (val) {
    if (val !== outerVal) {
      return true;
    } else {
      throw "Equal";
    }
  }

  return this;
};

/**
* expect(5).toBe(5); // true
* expect(5).notToBe(5); // throws "Equal"
*/