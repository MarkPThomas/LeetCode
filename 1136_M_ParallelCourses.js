// 2024/10/25
// O(n + m) time complexity
// O(n + m) space complexity
// where n = # courses, m = # relations
// Time to complete: 23:25 min
// Patterns: Topological sort
// Notes w.r.t. solution: Version with explicit inDegrees count.
//    This is much faster than manipulating an object w/o the count, as is done in the next example.
/**
 * @param {number} n
 * @param {number[][]} relations
 * @return {number}
 */
var minimumSemesters = function (n, relations) {
  // relations[i] = [prevCourse_i, nextCourse_i]
  const prereqs = {};
  const numNeeded = {};
  for (let course = 1; course <= n; course++) {
    prereqs[course] = [];
    numNeeded[course] = 0;
  }
  for (const [prereq, course] of relations) {
    prereqs[course].push(prereq);
    numNeeded[prereq]++;
  }

  let currSemester = [];
  for (let course = 1; course <= n; course++) {
    if (!numNeeded[course]) {
      currSemester.push(course);
    }
  }

  let minSemesters = 0;
  let coursesTaken = 0;
  while (currSemester.length) {
    minSemesters++;

    const nextSemester = [];
    for (const completedCourse of currSemester) {
      coursesTaken++;
      for (const prereq of prereqs[completedCourse]) {
        numNeeded[prereq]--;
        if (!numNeeded[prereq]) {
          nextSemester.push(prereq);
        }
      }
    }
    currSemester = nextSemester;
  }

  return coursesTaken === n ? minSemesters : -1;
};


// 2024/10/25
// O(n + m) time complexity
// O(n + m) space complexity
// where n = # courses, m = # relations
// Time to complete: 23:25 min
// Patterns: Topological sort
// Notes w.r.t. solution:
/**
 * @param {number} n
 * @param {number[][]} relations
 * @return {number}
 */
var minimumSemesters = function (n, relations) {
  // relations[i] = [prevCourse_i, nextCourse_i]
  const sequence = {};
  for (let course = 1; course <= n; course++) {
    sequence[course] = {};
  }
  for (const [prereq, course] of relations) {
    sequence[course][prereq] = true;
  }

  let currSemester = [];
  for (const [course, prereqs] of Object.entries(sequence)) {
    if (!Object.keys(prereqs).length) {
      currSemester.push(course);
    }
  }

  let minSemesters = 0;
  while (currSemester.length) {
    minSemesters++;

    const nextSemester = [];
    while (currSemester.length) {
      const completedCourse = currSemester.pop();

      for (const [course, prereqs] of Object.entries(sequence)) {
        if (prereqs[completedCourse]) {
          delete prereqs[completedCourse];

          if (!Object.keys(prereqs).length) {
            nextSemester.push(course);
          }
        }
      }

      delete sequence[completedCourse];
    }

    if (nextSemester.length) {
      currSemester = nextSemester;
    } else if (Object.keys(sequence).length) {
      return -1;
    }
  }

  return minSemesters ? minSemesters : -1;
};