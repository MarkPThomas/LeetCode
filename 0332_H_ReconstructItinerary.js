// 2025/02/09
// O(n*log(n)) time complexity
// O(n) space complexity
//  where n = # cities
// Time to complete: NA min
// Patterns: DFS Postorder
// Notes w.r.t. solution: Worked Solution
/**
 * @param {string[][]} tickets
 * @return {string[]}
 */
var findItinerary = function (tickets) {
  let itinerary = [];

  // DFS Post-order
  function dfs(to) {
    const destinations = flights[to];
    while (destinations?.length) {
      dfs(destinations.shift())
    }
    itinerary.push(to);
  }

  // build sorted adjancency list
  const flights = {};
  for (const [from, to] of tickets) {
    flights[from] ??= [];
    flights[from].push(to);
  }
  for (const key of Object.keys(flights)) {
    flights[key].sort();
  }

  // DFS Post-order created itinerary backwards
  dfs('JFK');
  return itinerary.reverse();
};

// 2025/02/07
// O() time complexity
// O() space complexity
// Time to complete: 24:37/43:40 min
// Patterns: DFS Preorder
// Notes w.r.t. solution:
/**
 * @param {string[][]} tickets
 * @return {string[]}
 */
var findItinerary = function (tickets) {
  // build sorted adjancency list
  const flights = {};
  for (const [from, to] of tickets) {
    flights[from] ??= [];
    flights[to] ??= [];
    flights[from].push(to);
  }
  for (const key of Object.keys(flights)) {
    flights[key].sort();
  }


  // starting at JFK, DFS, in alphabetical order
  let itinerary = [];
  const visited = {};
  const stack = ['JFK'];
  while (stack.length) {
    const from = stack.pop();
    itinerary.push(from);

    if (flights[from].length) {
      const to = flights[from].shift();
      stack.push(to);
    }

    // see if valid path
    if (!stack.length && tickets.length + 1 > itinerary.length) {
      // Undo path to next prev city with other options
      let to = itinerary.pop();
      let from = itinerary[itinerary.length - 1];
      flights[from].push(to);
      while (flights[from].length < 2) {
        to = itinerary.pop();
        from = itinerary[itinerary.length - 1];
        flights[from].push(to);
      }

      // Try the next city
      const nextTo = flights[from].shift();
      if (nextTo) {
        stack.push(nextTo);
      }
    }
  }

  return itinerary;
};