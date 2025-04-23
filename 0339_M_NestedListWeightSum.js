// 2025/04/23
// O(n) time complexity
// O(d) -> O(n) space complexity (since d <= n)
//  where n = total # of integers in the list, d = max depth of all lists
// Time to complete: 13:26 min
// Patterns: DFS
// Notes w.r.t. solution: Spent half the time realizing lists were special objects where I had to use the specified interface.
/**
 * // This is the interface that allows for creating nested lists.
 * // You should not implement it, or speculate about its implementation
 * function NestedInteger() {
 *
 *     Return true if this NestedInteger holds a single integer, rather than a nested list.
 *     @return {boolean}
 *     this.isInteger = function() {
 *         ...
 *     };
 *
 *     Return the single integer that this NestedInteger holds, if it holds a single integer
 *     The result is undefined if this NestedInteger holds a nested list
 *     @return {integer}
 *     this.getInteger = function() {
 *         ...
 *     };
 *
 *     Set this NestedInteger to hold a single integer equal to value.
 *     @return {void}
 *     this.setInteger = function(value) {
 *         ...
 *     };
 *
 *     Set this NestedInteger to hold a nested list and adds a nested integer elem to it.
 *     @return {void}
 *     this.add = function(elem) {
 *         ...
 *     };
 *
 *     Return the nested list that this NestedInteger holds, if it holds a nested list
 *     The result is undefined if this NestedInteger holds a single integer
 *     @return {NestedInteger[]}
 *     this.getList = function() {
 *         ...
 *     };
 * };
 */
/**
 * @param {NestedInteger[]} nestedList
 * @return {number}
 */
var depthSum = function (nestedList) {
  // at each level, we sum:
  //  a. values * depth
  //  b. results of deeper lists
  // for each array element at a given level, we check if it is an array
  // It is easiest to do this as we go across a list at a given level, DFS
  function dfs(nestedList, depth) {
    let sum = 0;

    for (const item of nestedList) {
      if (item.isInteger()) {
        sum += depth * item.getInteger();
      } else {
        sum += dfs(item.getList(), depth + 1);
      }
    }

    return sum;
  }

  return dfs(nestedList, 1);
};