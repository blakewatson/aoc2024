const { readFileSync } = require('fs');

const data = readFileSync(`${__dirname}/input.txt`, 'utf-8');

const map = data.split('\n').map((r) => r.split(''));

const positions = map.reduce((total, row, y) => {
  return row.reduce((t, cell, x) => {
    const simMap = map.map((r) => r.map((c) => c));

    if (simMap[y][x] === '^') {
      return t;
    }

    simMap[y][x] = '#';

    if (doesMapCauseLoop(simMap)) {
      return t + 1;
    }
    return t;
  }, total);
}, 0);

console.log(positions);

function doesMapCauseLoop(map) {
  const obstructions = [];

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
    const [x2, y2] = getNextPosition(x, y, dir);

    if (!map[y2]?.[x2]) {
      done = true;
      continue;
    }

    if (map[y2][x2] === '#') {
      const isRepeatPosition = obstructions.find(
        (obs) => obs[0] === x2 && obs[1] === y2 && obs[2] === dir,
      );

      if (isRepeatPosition) {
        return true;
      }

      obstructions.push([x2, y2, dir]);
      dir = turn(dir);
      continue;
    }

    xy = [x2, y2];
  }

  return false; // doesn’t loop
}

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
