// O(n) time complexity
// O(1) space complexity
// Time to complete: 17:24 min
// Patterns: Hashmap, Greedy
// Notes w.r.t. solution: Would have solved in 10:40 but had minor debugging issues.
/**
 * @param {number[]} bills
 * @return {boolean}
 */
var lemonadeChange = function (bills) {
  const change = { 5: 0, 10: 0, 15: 0, 20: 0 }

  function makeChange(bill) {
    if (bill === 5) {
      return true;
    } else if (bill === 10) {
      if (change[5] > 0) {
        change[5]--;
        return true;
      }
    } else if (bill === 20) {
      if (change[5] > 0 && change[10] > 0) {
        change[5]--;
        change[10]--;
        return true;
      } else if (change[5] >= 3) {
        change[5] -= 3;
        return true;
      }
    }

    return false;
  }

  for (const bill of bills) {
    if (makeChange(bill)) {
      change[bill]++;
    } else {
      return false;
    }
  }

  return true;
};