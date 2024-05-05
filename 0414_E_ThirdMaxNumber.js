// O(n) time complexity
// O(1) space complexity
// Time to complete: 10:54 min
// Patterns: 3 Pointers
// Notes w.r.t. solution: Took some time working out an T:O(n) solution.
//    Also derped on the return - sloppy on what the problem wanted as the fallback if there is no third max.
// Alt Case 1: Min Heap of size 3. This has the same Time/Space complexity.
//    This would be simpler & scale better if other kth values were desired, esp. dynamically.
// Alt Case 2: An option without heaps is to use a Set that is limited to at most k elements and sorted after each insertion.
//    This adds k to n in time complexity, but assuming k << n, this is effectively constant.
//    T: O(n * (1 + k * log(k))) -> O(n) since k is constant, or if scaleable, if k << n
//    S: O(k) -> O(1) since k is constant, or if scaleable, if k << n
//    Basically, sort a subset of the total solutions. This is a common strategy for optimized sort-based problems.

/**
 * @param {number[]} nums
 * @return {number}
 */
var thirdMax = function (nums) {
  let max1 = -Infinity;
  let max2 = -Infinity;
  let max3 = -Infinity;

  nums.forEach((num) => {
    if (max3 < num && num < max2) {
      max3 = num;
    } else if (max2 < num && num < max1) {
      max3 = max2;
      max2 = num;
    } else if (max1 < num) {
      max3 = max2;
      max2 = max1;
      max1 = num;
    }
  });

  return (max3 !== -Infinity) ? max3 : max1;
};

// Example of Alternative Case 2
let thirdMax = function (nums) {
  // Sorted set to keep elements in sorted order.
  let sortedNums = new Set();

  // Iterate on all elements of 'nums' array.
  for (let index in nums) {
    let num = nums[index];

    // Do not insert same element again.
    if (sortedNums.has(num)) {
      continue;
    }

    // If sorted set has 3 elements.
    if (sortedNums.size == 3) {
      let [firstElement] = sortedNums;

      // And the smallest element is smaller than current element.
      if (firstElement < num) {
        // Then remove the smallest element ans push the current element.
        sortedNums.delete(firstElement);
        sortedNums.add(num);
      }

    }
    // Otherwise push the current element of nums array.
    else {
      sortedNums.add(num);
    }

    // Sort the set, it has at most 3 elements only.
    sortedNums = new Set([...sortedNums].sort((a, b) => a - b));
  }

  // If sorted set has three elements return the smallest among those 3.
  if (sortedNums.size == 3) {
    let [firstElement] = sortedNums;
    return firstElement;
  }

  // Otherwise return the biggest element of nums array.
  let lastElement = Array.from(sortedNums).pop();
  return lastElement;
};