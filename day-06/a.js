const { readFileSync } = require('fs');

const data = readFileSync(`${__dirname}/input.txt`, 'utf-8');

const map = data.split('\n').map((r) => r.split(''));
const mapHistory = map.map((r) => [...r]);

let dir = '^';
let done = false;

/** @type {number[]} */
let xy = map.reduce((xy, row, y) => {
  const x = row.indexOf('^');

  if (x == -1) {
    return xy;
  }

  return [x, y];
}, []);

while (!done) {
  const [x, y] = xy;

  mapHistory[y][x] = 'X';

  const [x2, y2] = getNextPosition(x, y, dir);

  if (!map[y2]?.[x2]) {
    done = true;
    continue;
  }

  if (map[y2][x2] === '#') {
    dir = turn(dir);
    continue;
  }

  xy = [x2, y2];
}

console.log(countPositions());

function turn(dir) {
  const directions = '^>v<';
  return directions[(directions.indexOf(dir) + 1) % 4];
}

function getNextPosition(x, y, dir) {
  if (dir === '^') {
    return [x, y - 1];
  } else if (dir === 'v') {
    return [x, y + 1];
  } else if (dir === '<') {
    return [x - 1, y];
  } else {
    return [x + 1, y];
  }
}

function countPositions() {
  return mapHistory.reduce((total, row, y) => {
    return (
      total +
      row.reduce((t, cell) => {
        if (cell === 'X') {
          return t + 1;
        }
        return t;
      }, 0)
    );
  }, 0);
}
