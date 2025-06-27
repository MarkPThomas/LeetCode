// 2025/06/27
// O(n) time complexity
// O(n) space complexity
// Time to complete: 30:29 min
// Patterns: Graph DFS
// Notes w.r.t. solution:
/**
 * @param {number[]} pid    // child process id (1 parent)
 * @param {number[]} ppid   // parent process id (m children). Root.val === 0.
 * @param {number} kill     // process to kill, which also kills all children
 * @return {number[]}       // list of all processes killed
 */
var killProcess = function (pid, ppid, kill) {
  function addChildren(pVal, processes) {
    if (pVal in adj) {
      processes.push(...adj[pVal]);
    }
  }

  // Make adjacency matrix
  const adj = {};
  for (let i = 0; i < pid.length; i++) {
    const cVal = pid[i];
    const pVal = ppid[i];
    adj[pVal] ??= [];
    adj[pVal].push(cVal);
  }

  // 1. Find process to kill via DFS from root
  const killed = [];
  const pKill = [];
  const pSearch = [0];
  while (pSearch.length) {
    const pVal = pSearch.pop();
    if (pVal === kill) {
      // 2a. Add to output,
      killed.push(pVal);
      addChildren(pVal, pKill);
      break;
    } else if (pVal in adj) {
      addChildren(pVal, pSearch);
    }
  }

  // 2b. Add all children to output via DFS
  // const visited = {};
  while (pKill.length) {
    const pVal = pKill.pop();
    killed.push(pVal);
    addChildren(pVal, pKill);
  }

  return killed;
};