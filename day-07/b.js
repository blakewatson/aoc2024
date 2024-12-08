const { readFileSync } = require('fs');

const data = readFileSync(__dirname + '/input.txt', 'utf8')
  .split('\n')
  .map((row) => {
    row = row.replace(':', '');
    return row.split(' ').map((_) => parseInt(_));
  });

const ops = [add, multiply, concat];
let result = 0;

for (let problem of data) {
  const answer = problem[0];
  const nums = problem.slice(1);

  const combinations = generateStates(nums.length - 1);

  for (let combo of combinations) {
    if (evaluate(nums, combo) === answer) {
      result += answer;
      break;
    }
  }
}

console.log(result);

/**
 * @param {number[]} nums
 * @param {string} combo
 * @returns number
 */
function evaluate(nums, combo) {
  let result = 0;
  const comboArr = combo.split('');

  for (let i = 0; i < nums.length - 1; i++) {
    const op = ops[comboArr.shift()];
    result = op(result || nums[i], nums[i + 1]);
  }

  return result;
}

function add(x, y) {
  return x + y;
}

function multiply(x, y) {
  return x * y;
}

function concat(x, y) {
  return parseInt(`${x}${y}`);
}

function generateStates(n) {
  var states = [];

  // Convert to decimal
  var maxDecimal = parseInt('2'.repeat(n), 3);

  // For every number between 0->decimal
  for (var i = 0; i <= maxDecimal; i++) {
    // Convert to base 3, pad with 0, and add to final results
    states.push(i.toString(3).padStart(n, '0'));
  }

  return states;
}
