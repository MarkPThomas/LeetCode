// 2025/01/20
// O(n ) time complexity
// O(n) space complexity
// Time to complete: NA min
// Patterns: Queue, Greedy
// Notes w.r.t. solution: Refactored from LeetCode & my solutions
/**
 * @param {string} senate
 * @return {string}
 */
var predictPartyVictory = function (senate) {
  const RADIANT = 'R';
  const DIRE = 'D';

  const party = {};
  party[RADIANT] = { name: 'Radiant', count: 0, toBan: 0 };
  party[DIRE] = { name: 'Dire', count: 0, toBan: 0 };

  // Establish party counts & vote queue
  let voteQueue = [];
  for (const member of senate) {
    party[member].count++;
    voteQueue.push(member);
  }

  // Vote from queue until one party is out
  while (party[RADIANT].count && party[DIRE].count) {
    const nextVoteQueue = [];
    for (const voter of voteQueue) {
      if (party[voter].toBan) { // Implement floated ban
        party[voter].toBan--;
        party[voter].count--;
      } else {  // Float ban on the other party & re-enqueue
        const other = voter === RADIANT ? DIRE : RADIANT;
        party[other].toBan++

        nextVoteQueue.push(voter);
      }
    }
    voteQueue = nextVoteQueue;
  }

  return party[RADIANT].count ? party[RADIANT].name : party[DIRE].name;
};

// 2025/01/20
// O(n + log^2(n)) time complexity
// O(n) space complexity
// Time to complete: 42:22 min
// Patterns: Queue, Greedy
// Notes w.r.t. solution:
/**
 * @param {string} senate
 * @return {string}
 */
var predictPartyVictory = function (senate) {
  // Set up party lists & vote queue
  let voteQueue = [];
  let radiantsCount = 0;
  let diresCount = 0;
  for (let i = 0; i < senate.length; i++) {
    const vote = senate[i];
    if (vote === 'R') {
      radiantsCount++;
    } else {
      diresCount++;
    }
    voteQueue.push([vote, i]);
  }

  // Vote from queue until one party is out
  const vacated = Array(senate.length).fill(false);
  while (radiantsCount && diresCount) {
    const nextVoteQueue = [];
    for (const [vote, position] of voteQueue) {
      if (vacated[position]) {
        continue;
      }

      // Get member to expel, should be next in the queue
      let expel = position;
      while (senate[expel] === vote || vacated[expel]) {
        expel++;
        // Handle wraparound
        if (expel === senate.length) {
          expel -= senate.length;
        }
        // Check if we have reached the beginning of the list
        if (expel === position) {
          expel = -1;
        }
      }

      if (expel === -1) {
        break;
      }
      vacated[expel] = true;

      // console.log(`${vote} at ${position} Voting to expel ${senate[expel]} at ${expel}`);
      if (vote === 'R') {
        diresCount--;
      } else {
        radiantsCount--;
      }

      // Stop once all of a party has been expelled, or begin next round
      if (!radiantsCount || !diresCount) {
        break;
      }
      nextVoteQueue.push([vote, position]);
    }
    voteQueue = nextVoteQueue;
  }

  return radiantsCount ? 'Radiant' : 'Dire';
};