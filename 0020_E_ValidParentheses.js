// 2024/04/03
// O(n) time complexity
// O(1) space complexity
// Time to complete: 7:11 min
// Patterns: Stack
// Notes w.r.t. solution: Would have solved fasted but had minor bug.
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
    const brackets = {
        '{': '}',
        '(': ')',
        '[': ']',
    }

    const closures = [];
    for (let i = 0; i < s.length; i++) {
        if (brackets[s[i]]) {
            closures.push(brackets[s[i]]);
        } else if (closures[closures.length - 1] === s[i]) {
            closures.pop();
        } else {
            return false;
        }
    }

    return closures.length === 0;
};


// 2023 solution
// O(N) time complexity
// O(N) space complexity
// Time to complete: 10 min
// Patterns: stack structure
// Notes w.r.t. solution:
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid2023 = function (s) {
    const validClosures = {
        ')': '(',
        ']': '[',
        '}': '{',
    }
    const brackets = [];
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        const openBracket = brackets[brackets.length - 1];
        if (brackets.length && validClosures[char] === openBracket) {
            brackets.pop();
        } else {
            brackets.push(char);
        }
    }

    return brackets.length === 0;
};



// 2022 Solution
// O(N) time complexity
// O(N) space complexity
// Time to complete: 8 min
// Patterns: stack structure
// Notes w.r.t. solution:
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid2022 = function (s) {
    // FILO stack
    let parentheses = {
        '(': ')',
        '[': ']',
        '{': '}'
    };

    let closeBrackets = [];
    for (let i = 0; i < s.length; i++) {
        // check if open bracket
        if (parentheses[s[i]]) {
            // add expected closing bracket to pop off
            closeBrackets.push(parentheses[s[i]]);
        } else {
            // can only have a closing bracket that matches the top of the open brackets stack
            if (closeBrackets.pop() !== s[i]) {
                return false;
            }
        }
    }
    // All closing brackets must be emptied
    return closeBrackets.length === 0;
};