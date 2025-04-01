// O(n * log(n)) time complexity
// O(n) space complexity
// Time to complete: OT min
// Patterns: Sort
// Notes w.r.t. solution: Question was VERY confusing. Hard to concentrate with asthma & sleep today as well ;-P.
//  Ultimately had to look at better examples in the Wikipedia article link to understand the question.
/**
 * @param {number[]} citations
 * @return {number}
 */
var hIndex = function (citations) {
  citations.sort((a, b) => b - a);

  let position = 1;
  for (let i = 0; i < citations.length; i++) {
    if (citations[i] >= position && !(citations[i + 1] >= position + 1)) {
      return position;
    }
    position++;
  }

  return 0;
};


// ==== Solutions ====
// O(n) time complexity
// O(n) space complexity
// Patterns: Counting Sort
/**
 * @param {number[]} citations
 * @return {number}
 */
var hIndex = function (citations) {
  const n = citations.length;

  // Buckets to count # of papers w/ m citations
  // Take min of citation count & n because max of h = n
  const papers = Array(n + 1).fill(0);
  for (const citationCount of citations) {
    papers[Math.min(citationCount, n)]++;
  }

  let h = n;
  for (let sumRefers = papers[n]; h > sumRefers; sumRefers += papers[h]) {
    h--;
  }
  return h;
};