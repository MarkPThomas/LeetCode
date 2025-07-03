// 2024/10/15
// O(p + c) time complexity
// O(p + c) space complexity
//  where c = # courses (vertices),
//    p = # pre-reqs (edges)
// Time to complete:  min
// Patterns: Topological Sort DFS
// Notes w.r.t. solution: Working out DFS form of Topological Sort
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function (numCourses, prerequisites) {
  const prereqs = {};
  for (let course = 0; course < numCourses; course++) {
    prereqs[course] = [];
  }

  for (const dependency of prerequisites) {
    const [course, prereq] = dependency;
    prereqs[course].push(prereq);
  }

  const taken = {};
  const sequence = [];
  function dfs(course) {
    if (taken.hasOwnProperty(course)) {
      return taken[course];
    }

    taken[course] = false;
    for (const prereq of prereqs[course]) {
      const isValid = dfs(prereq);
      if (!isValid) {
        return false;
      }
    }

    sequence.push(parseInt(course));
    taken[course] = true;

    return true;
  }

  for (const course of Object.keys(prereqs)) {
    const isValid = dfs(course);

    if (isValid === false) {
      return [];
    }
  }

  return sequence;
};

// 2024/10/14
// O(p + c) time complexity
// O(p + c) space complexity
//  where c = # courses (vertices),
//    p = # pre-reqs (edges)
// Time to complete:  min
// Patterns: Topological Sort BFS
// Notes w.r.t. solution: Refactored prior solution to better use pattern based on answer. Prior solution was slow.
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function (numCourses, prerequisites) {
  const preReqsNeeded = [];
  const courses = {};
  for (let course = 0; course < numCourses; course++) {
    preReqsNeeded[course] = 0;
    courses[course] = [];
  }

  for (const course of prerequisites) {
    preReqsNeeded[course[0]]++;
    courses[course[1]].push(course[0]);
  }

  let noPrereqs = [];
  for (let course = 0; course < numCourses; course++) {
    if (!preReqsNeeded[course]) {
      noPrereqs.push(course);
    }
  }

  let sequence = [];
  let coursesTaken = 0;
  while (noPrereqs.length) {
    const course = noPrereqs.shift();
    sequence.push(course);
    coursesTaken++;

    if (courses[course]) {
      for (const taken of courses[course]) {
        preReqsNeeded[taken]--;
        if (!preReqsNeeded[taken]) {
          noPrereqs.push(taken);
        }
      }
    }
  }

  return coursesTaken === numCourses ? sequence : [];
};


// 2024/10/11
// O(p + c) time complexity
// O(p + c) space complexity
//  where c = # courses (vertices),
//    p = # pre-reqs (edges)
// Time to complete: 30:21 min
// Patterns: Topological Sort BFS
// Notes w.r.t. solution: Would have been 25:00 but had unspecified edge cases to work through with trial & error
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function (numCourses, prerequisites) {
  const courses = {};
  for (let i = 0; i < numCourses; i++) {
    courses[i] = {};
  }

  for (const course of prerequisites) {
    courses[course[0]][course[1]] = true;
  }

  let sequence = [];
  let coursesAdded = 0;
  while (coursesAdded < numCourses && Object.keys(courses).length) {
    // Get all courses w/ no pre-reqs
    const noPrereqs = [];
    for (const [course, prereqs] of Object.entries(courses)) {
      if (!Object.keys(prereqs).length) {
        noPrereqs.push(parseInt(course));
      }
    }

    // If no course has no pre-reqs, likely a cycle. At least not possible.
    if (!noPrereqs.length) {
      return [];
    }

    // Add to path
    coursesAdded += noPrereqs.length;
    sequence.push(...noPrereqs);

    // Remove courses
    for (const course of noPrereqs) {
      delete courses[course];
    }

    for (const prereqs of Object.values(courses)) {
      for (const taken of noPrereqs) {
        delete prereqs[taken];
      }
    }
  }

  return sequence;
};