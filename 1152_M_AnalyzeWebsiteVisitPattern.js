// 2025/06/08
// O(n * log(n) + n^3)-> O(n^3) time complexity
// O(n^3) space complexity
// Time to complete: 50:00 min
// Patterns: Backtracking, DFS, Hashmap, Sorting
// Notes w.r.t. solution: Looked at solution & found bug in code - unnecessary backtracking branch to take away!
/**
 * @param {string[]} username
 * @param {number[]} timestamp
 * @param {string[]} website
 * @return {string[]}
 */
var mostVisitedPattern = function (username, timestamp, website) {
  const PATTERN_LENGTH = 3;
  const SEPARATOR = '-';

  function getUserHistories() {
    const orderedTimes = [];
    for (let i = 0; i < timestamp.length; i++) {
      orderedTimes.push([timestamp[i], i])
    }
    orderedTimes.sort((a, b) => a[0] - b[0]);

    const userHistory = {};
    for (const [_, idx] of orderedTimes) {
      userHistory[username[idx]] ??= [];
      userHistory[username[idx]].push(website[idx]);
    }

    return userHistory;
  }

  function getUniquePatternVisits(userHistories) {
    const uniquePatternVisits = {}; // pattern: users[]

    for (const [user, sites] of Object.entries(userHistories)) {
      if (sites.length < PATTERN_LENGTH) {
        continue;
      }

      const uniquePatterns = new Set();
      getUniquePatterns(0, sites, [], uniquePatterns);

      for (const pattern of uniquePatterns) {
        uniquePatternVisits[pattern] ??= new Set();
        uniquePatternVisits[pattern].add(user);
      }
    }

    return uniquePatternVisits;
  }

  function getUniquePatterns(idx, sites, pattern, uniquePatterns) {
    if (pattern.length === PATTERN_LENGTH) {
      const patternKey = pattern.join(SEPARATOR);
      uniquePatterns.add(patternKey);

      return;
    }

    for (let i = idx; i < sites.length; i++) {
      pattern.push(sites[i]);
      getUniquePatterns(i + 1, sites, pattern, uniquePatterns);
      pattern.pop();
    }
  }

  function getMostFrequentVisits(patterns) {
    let maxScore = -1;
    let patternWinner = '';
    for (const [pattern, visitors] of Object.entries(patterns)) {
      if (visitors.size > maxScore) {
        patternWinner = pattern;
        maxScore = visitors.size;
      } else if (visitors.size === maxScore && pattern < patternWinner) {
        patternWinner = pattern;
      }
    }

    return patternWinner.split(SEPARATOR);
  }

  const userHistories = getUserHistories();
  const uniquePatternVisits = getUniquePatternVisits(userHistories);
  return getMostFrequentVisits(uniquePatternVisits);
};


// 2025/06/08
// O(n * log(n) + n^3) time complexity
// O(n^3) space complexity
// Time to complete: OT 43:02 min TLE@14/61
// Patterns: Backtracking, DFS, Hashmap, Sorting
// Notes w.r.t. solution:
/**
 * @param {string[]} username
 * @param {number[]} timestamp
 * @param {string[]} website
 * @return {string[]}
 */
var mostVisitedPattern = function (username, timestamp, website) {
  // pattern is any 3 website names in the order visited (no need to be contiguous)
  // score is # users whose visits matched the pattern
  // return lexicographally smallest pattern w/ largest score

  // P11 - apparently arrays are NOT in order of time.
  //      Problem statement never specified, but only showed in order :-P
  //      Use timestamps to order
  // 158931262
  // 562600350
  // 148438945

  // get unique website names
  // generate all patterns of 3
  // see which users visited what pattern
  const orderedTimes = [];
  for (let i = 0; i < timestamp.length; i++) {
    orderedTimes.push([timestamp[i], i])
  }
  orderedTimes.sort((a, b) => a[0] - b[0]);

  // graph is probably too much work/space...
  const userHistory = {};
  for (const [_, idx] of orderedTimes) {
    userHistory[username[idx]] ??= [];
    userHistory[username[idx]].push(website[idx]);
  }

  let maxScore = 0;
  const patterns = {}; // pattern: score
  function backtrack(idx, pattern, user, sites) {
    if (pattern.length === 3) {
      const patternKey = pattern.join('-');
      patterns[patternKey] ??= new Set();
      patterns[patternKey].add(user);

      maxScore = Math.max(maxScore, patterns[patternKey].size);
      return;
    } else if (idx >= sites.length) {
      return;
    }

    for (let i = idx; i < sites.length; i++) {
      // Try skipping
      backtrack(i + 1, pattern, user, sites);

      // Try adding
      pattern.push(sites[i]);
      backtrack(i + 1, pattern, user, sites);
      pattern.pop();
    }
  }

  for (const [user, sites] of Object.entries(userHistory)) {
    backtrack(0, [], user, sites);
  }

  // Get all patterns of max score, sort, return first
  const patternWinners = [];
  for (const [pattern, visitors] of Object.entries(patterns)) {
    if (visitors.size === maxScore) {
      patternWinners.push(pattern);
    }
  }

  patternWinners.sort();
  return patternWinners[0].split('-');
};