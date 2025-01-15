// O(n) time complexity
// O(1) space complexity
// Time to complete: NA min
// Patterns: 2 Pointer
// Notes w.r.t. solution: LeetCode solution worked
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  let water = 0;

  let leftMax = 0;
  let rightMax = 0;

  let left = 0;
  let right = height.length - 1;

  while (left < right) {
    if (height[left] < height[right]) {
      leftMax = Math.max(leftMax, height[left]);
      water += leftMax - height[left];
      left++;
    } else {
      rightMax = Math.max(rightMax, height[right]);
      water += rightMax - height[right];
      right--;
    }
  }

  return water;
};

// O(n) time complexity
// O(n) space complexity
// Time to complete: NA min
// Patterns: Stack
// Notes w.r.t. solution: LeetCode solution is simpler than mine
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  let water = 0;
  let next = 0;
  const passed = [];
  while (next < height.length) {
    while (passed.length && height[next] > height[passed[passed.length - 1]]) {
      const curr = passed.pop();
      if (!passed.length) {
        break;
      }

      const prev = passed[passed.length - 1];
      const distance = next - prev - 1;
      const boundedHeight = Math.min(height[next], height[prev]) - height[curr];
      water += distance * boundedHeight;
    }

    passed.push(next);
    next++;
  }

  return water;
};


// O(n) time complexity
// O(n) space complexity
// Time to complete: 56:38 min
// Patterns: Stack
// Notes w.r.t. solution:
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  let water = 0;
  const stack = [];
  for (let i = 1; i < height.length; i++) {
    const currStep = height[i] - height[i - 1];
    if (currStep < 0) {
      // Drop, save max height & start
      stack.push([i - 1, height[i - 1], height[i]]);
    } else if (currStep > 0) {
      // Step up, can fill if there is a matching drop

      // Filled or unfilled max during this filling set
      let maxBase = 0;
      while (stack.length) {
        const [prevIdx, prevTop, prevBase] = stack.pop();
        const width = i - prevIdx - 1;

        const currBase = height[i - 1];
        maxBase = Math.max(maxBase, prevBase, currBase);

        const currTop = height[i];
        const fillHeight = Math.min(prevTop, currTop);
        const depth = fillHeight - maxBase;

        // Fill water & record prior level filled
        water += width * depth;
        maxBase = fillHeight;

        if (prevTop > currTop) {
          // Retain prior step for future potential fills
          stack.push([prevIdx, prevTop, prevBase]);
          break;
        } else if (prevTop === currTop) {
          break;
        }
      }
    }
  }

  return water;
};