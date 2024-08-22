// 2024/08/22
// O(n + m) time complexity
// O(n) space complexity
//  where n is the smaller list length, m is the longer list length
// Time to complete: 11:54 min
// Patterns: Hash map
// Notes w.r.t. solution:
/**
 * @param {string[]} list1
 * @param {string[]} list2
 * @return {string[]}
 */
var findRestaurant = function (list1, list2) {
  const listCommon = {};

  list1.forEach((item, idx) => {
    if (!listCommon[item]) {
      listCommon[item] = idx;
    }
  });

  let minSum = Infinity;
  let result = [];
  list2.forEach((item, idx2) => {
    if (listCommon.hasOwnProperty(item)) {
      const sum = listCommon[item] + idx2;
      if (sum < minSum) {
        result = [item];
        minSum = sum;
      } else if (sum === minSum) {
        result.push(item);
      }
    }
  });

  return result;
};