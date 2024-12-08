const { readFileSync } = require('fs');

const data = readFileSync(__dirname + '/input.txt', 'utf8')
  .split('\n')
  .map((row) => {
    row = row.replace(':', '');
    return row.split(' ').map((_) => parseInt(_));
  });

const ops = ['+', '*'];
let result = 0;

for (let problem of data) {
  const answer = problem[0];
  const nums = problem.slice(1);

  const combinations = generateStates(nums.length - 1);

  for (let combo of combinations) {
    let expression = nums.reduce((exp, n, i) => {
      if (!exp.length) {
        return `${n}`;
      }

      exp = `(${exp})`;

      return `${exp}${ops[combo[i - 1]]}${n}`;
    }, '');

    if (eval(expression) === answer) {
      result += answer;
      break;
    }
  }
}

console.log(result);

function generateStates(n) {
  var states = [];

  // Convert to decimal
  var maxDecimal = parseInt('1'.repeat(n), 2);

  // For every number between 0->decimal
  for (var i = 0; i <= maxDecimal; i++) {
    // Convert to binary, pad with 0, and add to final results
    states.push(i.toString(2).padStart(n, '0'));
  }

  return states;
}
