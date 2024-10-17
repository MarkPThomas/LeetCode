// 2024/10/17
// O(v + e) time complexity
// O(v + e) space complexity
// Time to complete: 21:37 min
// Patterns: Topological Sort
// Notes w.r.t. solution:
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
  // inverted adjacencies, prereqs
  const prereqs = {};
  for (let course = 0; course < numCourses; course++) {
    prereqs[course] = [];
  }

  for (const [course, prereq] of prerequisites) {
    // prereqs[prereq].push(course);
    prereqs[course].push(prereq);
  }

  // Not possible if:
  //  1. Cycle detected
  //  2. Not all nodes visited
  const visited = {};
  // DFS
  function dfs(course) {
    if (visited.hasOwnProperty(course)) {
      return visited[course];
    }
    visited[course] = false;

    for (const prereq of prereqs[course]) {
      if (!dfs(prereq)) {
        return false;
      }
    }
    visited[course] = true;
    return true;
  }

  for (let course = 0; course < numCourses; course++) {
    if (!dfs(course)) {
      return false;
    } else if (Object.keys(visited).length === numCourses) {
      return true;
    }
  }

  return true;
};