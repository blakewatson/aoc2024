const { readFileSync } = require('fs');

const data = readFileSync(`${__dirname}/input.txt`, 'utf-8');

const grid = data.split('\n').map((row) => row.split(''));
const lastIndex = grid[0].length - 1;
const target = 'XMAS';

function getDiagonalsUp(grid) {
  const diagonals = [];

  for (let i = 0; i <= lastIndex; i++) {
    let line = '';
    let line2 = '';

    for (let j = i; j >= 0; j--) {
      line += grid[i - j][j];

      if (i < lastIndex) {
        line2 += grid[lastIndex - j][lastIndex - i + j];
      }
    }

    diagonals.push(line);

    if (line2.length) {
      diagonals.push(line2);
    }
  }

  return diagonals;
}

/** @param {string} line
 * @param {string} target
 */
function searchLine(line, target) {
  const matches = Array.from(line.matchAll(new RegExp(target, 'gi'))).length;
  target = target.split('').toReversed().join('');
  return matches + Array.from(line.matchAll(new RegExp(target, 'gi'))).length;
}

const diagonalsUp = getDiagonalsUp(grid);
const mirroredGrid = grid.map((row) => row.toReversed());
const diagonalsDown = getDiagonalsUp(mirroredGrid);
const columns = grid.map((row, r) => {
  let col = '';

  for (let i = 0; i < grid.length; i++) {
    col += grid[i][r];
  }

  return col;
});
const rows = grid.map((row) => row.join(''));

const lines = [...diagonalsUp, ...diagonalsDown, ...columns, ...rows];

const matches = lines.reduce(
  (total, line) => total + searchLine(line, target),
  0,
);

console.log(matches);
