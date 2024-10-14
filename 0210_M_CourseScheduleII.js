// 2024/10/11
// O(p + c) time complexity
// O(p + c) space complexity
//  where c = # courses (vertices),
//    p = # pre-reqs (edges)
// Time to complete: 30:21 min
// Patterns: Topological sort
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