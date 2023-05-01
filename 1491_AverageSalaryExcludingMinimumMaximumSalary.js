// O(n) time complexity
// O(1) space complexity
// Time to complete: 2 min + 3 min debugging = 5 min
// Patterns:
// Notes w.r.t. solution:
/**
 * @param {number[]} salary
 * @return {number}
 */
var average = function (salary) {
    let minSalary = Infinity;
    let maxSalary = -Infinity;
    let sum = 0;

    salary.forEach((value) => {
        sum += value;
        minSalary = Math.min(minSalary, value);
        maxSalary = Math.max(maxSalary, value);
    })

    return (sum - minSalary - maxSalary) / (salary.length - 2);
};