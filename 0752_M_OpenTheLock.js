// 2024/11/18
// O(4 * (d + 10^4)) time complexity
// O(4 * (d + 10^4)) space complexity
//  from (w * (d + n^w))
//  where w = # wheels = 4
//    n = # values on each wheel = 10
//    d = # deadend combos
// Time to complete: 35:00 min
// Patterns: Graph - Nary-Tree BFS
// Notes w.r.t. solution: Attempt #1: 20 min stopped & looked at hint.
//  Attempt #2: 26:15 TLE due to not including 'visited' checks
//  Debugging & updating took to 35:00
// Optimized solution, with a single function & not building a tree, just traversing - Performs much faster & with less memory
/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
var openLock = function (deadends, target) {
  const invalidCombos = {};
  for (const deadend of deadends) {
    invalidCombos[deadend] = true;
  }

  function nextCombos(combo) {
    const digits = [];
    for (let i = 0; i < 4; i++) {
      digits.push(Number(combo[i]));
    }

    const combos = [];
    for (let i = 0; i < 4; i++) {
      // Increment forward
      digits[i] = (digits[i] + 10 + 1) % 10;
      let nextCombo = digits.join('');
      if (!invalidCombos[nextCombo]) {
        combos.push(nextCombo);
        invalidCombos[nextCombo] = true;
      }

      // Increment backward
      digits[i] = (digits[i] + 10 - 2) % 10;
      nextCombo = digits.join('');
      if (!invalidCombos[nextCombo]) {
        combos.push(nextCombo);
        invalidCombos[nextCombo] = true;
      }

      // Reset
      digits[i] = (digits[i] + 10 + 1) % 10;
    }

    return combos;
  }

  const root = '0000';
  if (invalidCombos[root]) {
    return -1;
  }
  invalidCombos[root] = true;

  let queue = [root];
  let turns = 0;
  while (queue.length) {
    const queueRow = [];
    while (queue.length) {
      const comboDigits = queue.pop();

      if (comboDigits === target) {
        return turns;
      }

      // invalidCombo[comboDigits] = true;
      queueRow.push(...nextCombos(comboDigits));
    }

    turns++;
    queue = queueRow;
  }

  return -1;
};

// // Original solution with class & array
// /**
//  * @param {string[]} deadends
//  * @param {string} target
//  * @return {number}
//  */
// var openLock = function (deadends, target) {
//   // T: O(d * w)
//   // S: O(d * w)
//   const invalidCombo = {};
//   for (const deadend of deadends) {
//     invalidCombo[deadend] = true;
//   }

//   class Node {
//     constructor(vals) {
//       this.vals = vals;
//       this.children = [];
//     }

//     combo() {
//       return this.vals.join('');
//     }

//     generateChildren() {
//       for (let i = 0; i < 4; i++) {
//         const plusWheels = [...this.vals]
//         plusWheels[i]++;
//         if (plusWheels[i] > 9) {
//           plusWheels[i] = 0;
//         }

//         if (!invalidCombo[plusWheels]) {
//           this.children.push(new Node(plusWheels));
//         }

//         const minusWheels = [...this.vals]
//         minusWheels[i]--;
//         if (minusWheels[i] < 0) {
//           minusWheels[i] = 9;
//         }

//         if (!invalidCombo[minusWheels]) {
//           this.children.push(new Node(minusWheels));
//         }
//       }
//     }
//   }

//   const root = new Node([0, 0, 0, 0]);

//   let queue = [root];
//   let turns = 0;
//   // Worst-case we iterate on all n^w unique combinations
//   //  Performing 2 * w turns for each combo (exporing +/- turns)
//   //  T: O(2 * w * n^w)
//   // Total T: O(2 * w * n^w + d * w) = O(2 * 4 * 10^4 + d * 4) = O(4 * (d + 2 * 10^4)) -> O(4 * (d + 10^4))
//   // And saving these to a 'visited' map of original size d * w...
//   //  S: O(2 * w * n^w)
//   // Total S: O(2 * w * n^w + d * w) = O(2 * 4 * 10^4 + d * 4) = O(4 * (d + 2 * 10^4)) -> O(4 * (d + 10^4))
//   while (queue.length) {
//     const queueRow = [];
//     for (let i = 0; i < queue.length; i++) {
//       const node = queue[i];

//       let nodeCombo = node.combo();
//       if (invalidCombo[nodeCombo]) {
//         continue;
//       } else if (nodeCombo === target) {
//         return turns;
//       }

//       invalidCombo[nodeCombo] = true;
//       node.generateChildren();
//       queueRow.push(...node.children);
//     }

//     turns++;
//     queue = queueRow;
//   }

//   return -1;
// };