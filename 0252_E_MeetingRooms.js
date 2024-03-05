// 2024/03
// O(n*log(n)) time complexity
// O(1) space complexity
// Time to complete: 3:38 min
// Patterns: Merge intervals
// Notes w.r.t. solution:
/**
 * @param {number[][]} intervals
 * @return {boolean}
 */
var canAttendMeetings = function (intervals) {
  intervals.sort((a, b) => a[0] - b[0]);

  for (let i = 0; i < intervals.length - 1; i++) {
    if (intervals[i][1] > intervals[i + 1][0]) {
      return false;
    }
  }

  return true;
};


// 2023/05
// O(n * log(n)) time complexity
// O(1) space complexity
// Time to complete: 5 min
// Patterns: Merge intervals
// Notes w.r.t. solution: Would have been faster but was a bit too fast & made minor trip ups

/**
 * @param {number[][]} intervals
 * @return {boolean}
 */
var canAttendMeetings202305 = function (intervals) {
  if (intervals.length < 2) {
    return true;
  }

  intervals.sort((a, b) => a[0] - b[0]);

  for (let i = 0; i < intervals.length - 1; i++) {
    if (intervals[i][1] > intervals[i + 1][0]) {
      return false;
    }
  }
  return true;
};

const testCases = [
  {
    input: '',
    expected: ''
  },
];

testCases.forEach((testCase) => {
  // let result = FUT(testCase.input); // insert function name here
  let pass = result === testCase.expected;
  console.log(`Input: ${testCase.input}\nExpected: ${testCase.expected}\nResult: ${result}\nPass: ${pass}\n`);
}
);