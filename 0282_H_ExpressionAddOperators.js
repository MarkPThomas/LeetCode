// 2025/04/23
// O() time complexity
// O() space complexity
// Time to complete: OT min
// Patterns: Backtracking
// Notes w.r.t. solution: 2025: Was on right track. Logic was mostly correct.
/**
 * @param {string} num
 * @param {number} target
 * @return {string[]}
 */
var addOperators = function (num, target) {
  // backtrack
  //  num idx
  //  check once idx = num.length

  // do operation as lower stack called? Or at end?
  //  PEMDAS evaluation -> simpler to do this at end

  // state to do/undo is operator to try & curr val

  // memo only needs to track operations. Digits are always in same order
  // can set ops to only record this as well
  //  (num[0] => ops[0] to num[0], ops[1] to num[1]... num[last])

  const memo = {};

  const ADD = '+';
  const SUBTRACT = '-';
  const MULTIPLY = '*';

  const results = [];
  // Consider additional memo to optmize partial evals? Maybe premature optimization.
  function backtrack(idx, currInt, ops, ints) {
    if (idx >= num.length) {
      const expression = createExpression(ops, ints);
      console.log('expression', expression)
      if (!(expression in memo)) {
        const resultant = evaluateExpression(expression);
        memo[expression] = resultant;
        console.log('resultant', resultant)

        if (resultant === target) {
          results.push(expression);
        }
      }
      return;
    }

    console.log('ints', ints)
    // Try larger int
    if (currInt !== '0' && idx < num.length) {  // No leading 0s
      const nextInt = currInt + num[idx];

      console.log('nextInt', nextInt)
      // ints.push(nextInt);
      backtrack(idx + 1, nextInt, ops, ints);
      // ints.pop();
    }

    ints.push(currInt);

    // Try  each operation
    ops.push(ADD);
    backtrack(idx + 1, num[idx + 1], ops, ints);
    ops.pop();

    ops.push(SUBTRACT);
    backtrack(idx + 1, num[idx + 1], ops, ints);
    ops.pop();

    ops.push(MULTIPLY);
    backtrack(idx + 1, num[idx + 1], ops, ints);
    ops.pop();

    ints.pop();
  }

  function createExpression(ops, ints) {
    let expression = [ints[0]];

    // Ignore starting '+' for result, implied in evaluation
    for (let i = 1; i < ops.length; i++) {
      expression.push(ops[i]);
      expression.push(ints[i]);
    }

    return expression.join('');
  }

  function evaluateExpression(expression) {
    const evaluations = [Number(expression[0])];

    let i = 1;
    while (i < expression.length - 1) {
      const operator = expression[i];
      const intNum = Number(expression[i + 1]);

      if (operator === ADD) {
        evaluations.push(intNum);
      } else if (operator === SUBTRACT) {
        evaluations.push(-intNum);
      } else if (operator === MULTIPLY) {
        let product = evaluations.pop() * intNum;

        let nextOperator = operator;
        while (i < expression.length - 1) {
          i += 2
          nextOperator = expression[i];
          const nextIntNum = Number(expression[i + 1]);

          if (nextOperator === MULTIPLY) {
            product *= nextIntNum;
          } else {
            // Reset to last multiple & exit for normal increment
            i -= 2;
            break;
          }
        }

        evaluations.push(product);
      }

      i += 2;
    }

    return evaluations.reduce((acc, val) => acc + val);
  }

  backtrack(1, num[0], [ADD], []);

  return results;
};

// ===== Solution =====
// O(n * 4^n) time complexity
// O(n) space complexity
// Patterns: Backtracking
/**
 * @param {string} num
 * @param {number} target
 * @return {string[]}
 */
var addOperators = function (num, target) {
  const ADD = '+';
  const SUBTRACT = '-';
  const MULTIPLY = '*';

  const results = [];

  function backtrack(idx, prevOp, currOp, val, result) {
    if (idx >= num.length) {
      if (val === target && currOp === 0) {
        results.push(result.join(''));
      }
      return;
    }

    // No-Op - Add next digit to current operand if not leading 0
    currOp = currOp * 10 + Number(num[idx]);
    if (currOp > 0) {
      backtrack(idx + 1, prevOp, currOp, val, result);
    }

    if (!result.length) { // Add first number
      result.push(currOp);
      backtrack(idx + 1, currOp, 0, currOp, result);
      result.pop();
      return;
    }

    // Try  each operation
    const addOp = currOp;
    const addVal = val + addOp;
    backtrackOp(idx, ADD, currOp, addOp, addVal, result);

    const subOp = -currOp;
    const subVal = val + subOp;
    backtrackOp(idx, SUBTRACT, currOp, subOp, subVal, result);

    const multOp = prevOp * currOp;
    const multVal = val - prevOp + multOp;
    backtrackOp(idx, MULTIPLY, currOp, multOp, multVal, result);
  }

  function backtrackOp(idx, operand, currOp, nextOp, opsVal, ops) {
    ops.push(operand);
    ops.push(currOp);
    backtrack(idx + 1, nextOp, 0, opsVal, ops);
    ops.pop();
    ops.pop();
  }

  backtrack(0, 0, 0, 0, []);

  return results;
};