// 2025/06/09
// O(n) time complexity
// O(n) -> O(1) space complexity (since counts are only for at most #s 1-9)
// Time to complete: 1:15:40 min
// Patterns: Greedy, Hashmap, Counting
// Notes w.r.t. solution: Refactored solution to make it cleaner (see next entry for original).
//  Added some efficiencies as well.
/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumOperations = function (nums) {
  function getTop2Freqs(freqs) {
    let topNum = -1;
    let topNum2nd = -1;

    let maxFreq = -1;
    let maxFreq2nd = -1;
    for (const [num, count] of freqs) {
      if (count > maxFreq) {
        maxFreq2nd = maxFreq;
        maxFreq = count;

        topNum2nd = topNum;
        topNum = Number(num);
      } else if (count > maxFreq2nd) {
        maxFreq2nd = count;
        topNum2nd = Number(num);
      }
    }

    return [topNum, topNum2nd];
  }

  const oddFreqs = { '-1': 0 };
  const evenFreqs = { '-1': 0 };
  for (let i = 0; i < nums.length; i++) {
    if (i % 2) {
      evenFreqs[nums[i]] = (evenFreqs[nums[i]] ?? 0) + 1;
    } else {
      oddFreqs[nums[i]] = (oddFreqs[nums[i]] ?? 0) + 1;
    }
  }

  const oddFreqEntries = Object.entries(oddFreqs);
  const evenFreqEntries = Object.entries(evenFreqs);

  const [oddNum, oddNum2nd] = getTop2Freqs(oddFreqEntries);
  const [evenNum, evenNum2nd] = getTop2Freqs(evenFreqEntries);

  const oddLength = Math.floor((nums.length + 1) / 2);
  const evenLength = Math.floor(nums.length / 2);

  if (oddNum !== evenNum) {
    return (oddLength - oddFreqs[oddNum]) + (evenLength - evenFreqs[evenNum]);
  }

  return Math.min(
    ((oddLength - oddFreqs[oddNum]) + (evenLength - evenFreqs[evenNum2nd])),
    ((oddLength - oddFreqs[oddNum2nd]) + (evenLength - evenFreqs[evenNum]))
  );
};

// 2025/06/09
// O(n) time complexity
// O(n) -> O(1) space complexity (since counts are only for at most #s 1-9)
// Time to complete: 1:15:40 min
// Patterns: Greedy, Hashmap, Counting
// Notes w.r.t. solution: Refactored solution to make it cleaner (see next entry for original)
/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumOperations = function (nums) {
  function getTop2Freqs(freqs) {
    let topNum = -1;
    let topNum2nd = -1;

    let maxFreq = -1;
    let maxFreq2nd = -1;
    for (const [num, count] of freqs) {
      if (count > maxFreq) {
        maxFreq2nd = maxFreq;
        maxFreq = count;

        topNum2nd = topNum;
        topNum = Number(num);
      } else if (count > maxFreq2nd) {
        maxFreq2nd = count;
        topNum2nd = Number(num);
      }
    }

    return [topNum, topNum2nd];
  }

  function getNumOps(target, freqs) {
    let numOps = 0;
    for (const [num, count] of freqs) {
      if (Number(num) !== target) {
        numOps += count;
      }
    }
    return numOps;
  }

  const oddFreqs = {};
  const evenFreqs = {};
  for (let i = 0; i < nums.length; i++) {
    if (i % 2) {
      evenFreqs[nums[i]] = (evenFreqs[nums[i]] ?? 0) + 1;
    } else {
      oddFreqs[nums[i]] = (oddFreqs[nums[i]] ?? 0) + 1;
    }
  }

  let oddNum = -1;
  const oddFreqEntries = Object.entries(oddFreqs);

  let evenNum = -1;
  const evenFreqEntries = Object.entries(evenFreqs);

  if (oddFreqEntries.length === 1) {
    oddNum = Number(oddFreqEntries[0][0]);
  } else if (evenFreqEntries.length === 1) {
    evenNum = Number(evenFreqEntries[0][0]);
  }

  // All of one needs to be flipped
  if (oddNum !== -1 && evenNum !== -1) {
    return Math.min(oddFreqEntries[oddNum], evenFreqEntries[evenNum]);
  }

  let oddNum2nd = -1;
  if (oddNum === -1) {
    [oddNum, oddNum2nd] = getTop2Freqs(oddFreqEntries);
  }

  let evenNum2nd = -1;
  if (evenNum === -1) {
    [evenNum, evenNum2nd] = getTop2Freqs(evenFreqEntries);
  }

  let numOps2nd = Infinity;
  if (oddNum === evenNum) {
    // choose maxOdd, 2ndMax even
    // choose 2ndMaxOdd, maxEven
    const swapOdd = oddNum;
    oddNum = oddNum2nd;
    oddNum2nd = swapOdd;

    numOps2nd = getNumOps(oddNum2nd, oddFreqEntries)
      + getNumOps(evenNum2nd, evenFreqEntries);
    numOps2nd = numOps2nd ? numOps2nd : Infinity;
  }

  let numOps = getNumOps(oddNum, oddFreqEntries)
    + getNumOps(evenNum, evenFreqEntries);

  return Math.min(numOps, numOps2nd);
};

// 2025/06/09
// O(n) time complexity
// O(n) -> O(1) space complexity (since counts are only for at most #s 1-9)
// Time to complete: 1:15:40 min
// Patterns: Greedy, Hashmap, Counting
// Notes w.r.t. solution:
/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumOperations = function (nums) {
  // i - 1 !== i
  // i - 2 === i
  // for all i
  // count odd ints @ i & i + 2...
  // count even ints @ i + 1 & i + 3...
  // greatest count of either is the corresponding odd/even int,
  //  unless it is the only int for odd/even
  // sum counts of odd/even for all other #s for result
  const oddFreqs = {};
  const evenFreqs = {};
  for (let i = 0; i < nums.length; i++) {
    if (i % 2) {
      evenFreqs[nums[i]] = (evenFreqs[nums[i]] ?? 0) + 1;
    } else {
      oddFreqs[nums[i]] = (oddFreqs[nums[i]] ?? 0) + 1;
    }
  }

  let oddNum = -1;
  const oddFreqEntries = Object.entries(oddFreqs);

  let evenNum = -1;
  const evenFreqEntries = Object.entries(evenFreqs);

  if (oddFreqEntries.length === 1) {
    oddNum = Number(oddFreqEntries[0][0]);
  } else if (evenFreqEntries.length === 1) {
    evenNum = Number(evenFreqEntries[0][0]);
  }

  // All of one needs to be flipped
  if (oddNum !== -1 && evenNum !== -1) {
    return Math.min(oddFreqEntries[oddNum], evenFreqEntries[evenNum]);
  }

  let oddNum2nd = -1;
  if (oddNum === -1) {
    let maxOddFreq = -1;
    let maxOddFreq2nd = -1;
    for (const [num, count] of oddFreqEntries) {
      if (count > maxOddFreq) {
        maxOddFreq2nd = maxOddFreq;
        maxOddFreq = count;
        oddNum2nd = oddNum;
        oddNum = Number(num);
      } else if (count > maxOddFreq2nd) {
        maxOddFreq2nd = count;
        oddNum2nd = Number(num);
      }
    }
  }

  let evenNum2nd = -1;
  if (evenNum === -1) {
    let maxEvenFreq = -1;
    let maxEvenFreq2nd = -1;
    for (const [num, count] of evenFreqEntries) {
      if (count > maxEvenFreq) {
        maxEvenFreq2nd = maxEvenFreq;
        maxEvenFreq = count;
        evenNum2nd = evenNum;
        evenNum = Number(num);
      } else if (count > maxEvenFreq2nd) {
        maxEvenFreq2nd = count;
        evenNum2nd = Number(num);
      }
    }
  }

  let numOps = 0;
  if (oddNum === evenNum) {
    // choose maxOdd, 2ndMax even
    // choose 2ndMaxOdd, maxEven
    let numOps2nd = 0;
    for (const [num, count] of oddFreqEntries) {
      if (Number(num) !== oddNum) {
        numOps += count;
      }

      if (Number(num) !== oddNum2nd) {
        numOps2nd += count;
      }
    }

    for (const [num, count] of evenFreqEntries) {
      if (Number(num) !== evenNum) {
        numOps2nd += count;
      }

      if (Number(num) !== evenNum2nd) {
        numOps += count;
      }
    }

    numOps = numOps ? numOps : Infinity;
    numOps2nd = numOps2nd ? numOps2nd : Infinity;

    return Math.min(numOps, numOps2nd);
  } else {
    for (const [num, count] of oddFreqEntries) {
      if (Number(num) !== oddNum) {
        numOps += count;
      }
    }

    for (const [num, count] of evenFreqEntries) {
      if (Number(num) !== evenNum) {
        numOps += count;
      }
    }

    return numOps;
  }
};