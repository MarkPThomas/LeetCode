// 2025/05/12
// O(n * m) time complexity
// O(r) space complexity
//  where n = # responses, m = avg. # choices given in each response, r = # choices available, s = # of equal max responses (s <= r)
// Time to complete: 20:37 min
// Patterns: Hashmap
// Notes w.r.t. solution: Saw hint for how to bypass sorting (derp, wasn't sure if sorting was even the bottleneck. Server errors)
/**
 * @param {string[][]} responses
 * @return {string}
 */
var findCommonResponse = function (responses) {
  // hashmap

  // 1st pass to get unique responses
  // 2nd pass to count unique responses (once per survey)
  const choices = {};
  let maxCount = 0;
  let maxChoice = '';
  for (const response of responses) {

    const usedChoices = new Set();
    for (const choice of response) {
      if (!usedChoices.has(choice)) {
        choices[choice] ??= 0;
        usedChoices.add(choice);
        choices[choice]++;

        if (choices[choice] > maxCount) {
          maxCount = choices[choice];
          maxChoice = choice;
        } else if (choices[choice] === maxCount) {
          // Update to 'preceding' word
          if (!maxChoice || maxChoice > choice) {
            maxChoice = choice;
          }
        }
      }
    }
  }

  return maxChoice;
};

// 2025/05/12
// O(n * m + r + s * log(s)) time complexity
// O(r + s) space complexity
//  where n = # responses, m = avg. # choices given in each response, r = # choices available, s = # of equal max responses (s <= r)
// Time to complete: 15:37 min
// Patterns: Hashmap
// Notes w.r.t. solution:
/**
 * @param {string[][]} responses
 * @return {string}
 */
var findCommonResponse = function (responses) {
  // hashmap

  // 1st pass to get unique responses
  const choices = {};
  for (const response of responses) {
    for (const choice of response) {
      choices[choice] = 0;
    }
  }

  // 2nd pass to count unique responses (once per survey)
  const allChoices = Object.keys(choices);
  for (const response of responses) {

    const unusedChoices = new Set(allChoices);
    for (const choice of response) {
      if (unusedChoices.has(choice)) {
        unusedChoices.delete(choice);
        choices[choice]++;
      }
    }

  }

  // Get max
  let maxChoices = [];
  let maxCount = 0;
  for (const [choice, count] of Object.entries(choices)) {
    if (count > maxCount) {
      maxCount = count;
      maxChoices = [choice];
    } else if (count === maxCount) {
      maxChoices.push(choice);
    }
  }

  // Sort max & return
  maxChoices.sort();
  return maxChoices[0];
};