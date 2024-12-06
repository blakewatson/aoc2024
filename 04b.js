import { readFileSync } from 'fs';

const data = readFileSync('./04-input.txt', 'utf-8');

const grid = data.split('\n').map((row) => row.split(''));
const target = 'MAS';
let count = 0;

for (let row = 1; row < grid[0].length - 1; row++) {
  for (let column = 1; column < grid[0].length - 1; column++) {
    if (checkForX(row, column)) {
      count++;
    }
  }
}

console.log(count);

function checkForX(x, y) {
  if (!x || !y || grid[x][y] !== target[1]) {
    return;
  }

  const line1 = grid[x - 1][y - 1] + grid[x][y] + grid[x + 1][y + 1];
  const line2 = grid[x - 1][y + 1] + grid[x][y] + grid[x + 1][y - 1];

  const reversedTarget = target.split('').toReversed().join('');

  if (
    (line1.includes(target) || line1.includes(reversedTarget)) &&
    (line2.includes(target) || line2.includes(reversedTarget))
  ) {
    return true;
  }
}
