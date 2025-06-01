// 2025/04/15
// O() time complexity
// O(1) space complexity
// Time to complete: OT 1:11:43 min @ 5/50
// Patterns: Graph - DFS,
// Notes w.r.t. solution:
/**
 * @param {string[][]} accounts
 * @return {string[][]}
 */
var accountsMerge = function (accounts) {
  // accounts[i] = [name, email1, email2, ..., email_i]

  // accounts[i] are merged w/ accounts[j] if they have any emails in common
  // Multiple accounts may have the same name, yet are different accounts
  // I assume any account w/ a matching email must also ahve the same name?

  // Find all owners to each email
  const emails = {};
  const ownersSkip = new Set();
  for (let i = 0; i < accounts.length; i++) {
    const account = accounts[i];
    for (let j = 1; j < account.length; j++) {
      const email = account[j];
      if (email in emails) {
        ownersSkip.add(i);
      } else {
        emails[email] = new Set();
      }
      emails[email].add(i)
    }
  }

  // Re-add emails while consolidating amount multiple account owners
  //  Choose lower account idx as default core owner
  const emailsByAccount = Array(accounts.length);
  for (const [email, ownersSet] of Object.entries(emails)) {
    const owners = [...ownersSet].sort((a, b) => a - b);

    const owner = owners[0];
    if (ownersSkip.has(owner)) { // Skip owners that will be merged
      continue;
    }
    emailsByAccount[owner] ??= new Set();
    emailsByAccount[owner].add(email);

    if (owners.length > 1) { // Add emails from redundant owners
      for (let i = 1; i < owners.length; i++) {
        const account = accounts[owners[i]];
        for (let j = 1; j < account.length; j++) {
          const mergedEmail = account[j];
          emailsByAccount[owner].add(mergedEmail);
        }
      }
    }
  }

  // For each account that is not empty, fetch name & add to sorted set of emails
  const mergedAccounts = [];
  for (let i = 0; i < emailsByAccount.length; i++) {
    if (!emailsByAccount[i]) {
      continue;
    }

    // merge accounts w/ [name, emails(sorted)]
    const name = accounts[i][0];
    const emails = [...emailsByAccount[i]].sort();
    const mergedAccount = [name, ...emails];
    mergedAccounts.push(mergedAccount);
  }

  return mergedAccounts;
};

// === Solutions
// O(n * k * log(n * k)) time complexity
// O(n * k) space complexity
//  where n = # accounts, k = max # emails of any account
// Patterns: Graph - DFS
/**
 * @param {string[][]} accounts
 * @return {string[][]}
 */
var accountsMerge = function (accounts) {
  const visited = {};
  const adjacent = {};

  function dfs(email, mergedAccount) {
    visited[email] = true;
    mergedAccount.push(email);

    if (!(email in adjacent)) {
      return;
    }

    for (const neighbor of adjacent[email]) {
      if (!visited[neighbor]) {
        dfs(neighbor, mergedAccount);
      }
    }
  }

  // Create connectivity of all email addresses
  for (const account of accounts) {
    const firstEmail = account[1];
    adjacent[firstEmail] ??= [];

    // Build bi-directional adjacency list between first email & all other emails in an account
    for (let j = 2; j < account.length; j++) {
      const email = account[j];
      adjacent[firstEmail].push(email);

      adjacent[email] ??= [];
      adjacent[email].push(firstEmail);
    }
  }

  const mergedAccounts = [];
  for (const account of accounts) {
    const name = account[0];
    const firstEmail = account[1];

    if (!visited[firstEmail]) {
      const mergedAccount = [];

      dfs(firstEmail, mergedAccount);
      mergedAccount.sort();

      mergedAccounts.push([name, ...mergedAccount]);
    }
  }

  return mergedAccounts;
};

// O(n * k * log(n * k)) time complexity
// O(n * k) space complexity
//  where n = # accounts, k = max # emails of any account
// Patterns: Graph - DSU
