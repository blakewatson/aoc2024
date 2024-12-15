// @ts-check

/** @typedef {[number, number]} Point */

/** @typedef {Object.<number, Array.<number>>} PointsDict */

const { readFileSync } = require('fs');

main();

function main() {
  /** @type {number[][]} */
  const map = readFileSync(__dirname + '/input.txt', 'utf-8')
    .split('\n')
    .map((row) => row.split('').map((c) => parseInt(c)));

  let score = 0;

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === 0) {
        score += findPaths([x, y], map);
      }
    }
  }

  console.log('total score', score);
}

/**
 * @param {Point} xy
 * @param {number[][]} map
 * @returns {number}
 */
function findPaths(xy, map) {
  const [x, y] = xy;

  /** @type {Point[]} */
  let currentPath = [xy];

  /** @type {PointsDict} */
  const visited = {};

  let score = 0;

  while (true) {
    // @ts-ignore
    const [curX, curY] = currentPath.at(-1);
    const prevXy = currentPath.at(-2) ?? null;
    const next = findNextAvailableSpace([curX, curY], map, visited, prevXy);

    // if no next space, and we're at the trailhead, break loop
    if (!next && curX === x && curY === y) {
      // console.log('stopped at trailhead', score);
      break;
    }

    // if next space is 9, update visited, increment score
    if (next && map[next[1]][next[0]] === 9) {
      updateVisited(visited, next);
      score++;
      // console.log('Found a nine at', next);
      continue;
    }

    // if no next space and not at trailhead, backtrack one space
    if (!next && (curX !== x || curY !== y)) {
      currentPath.pop();
      // console.log('Backtracking to', currentPath.at(-1));
      continue;
    }

    // if next space is not 9, update visited and path
    if (next && map[next[1]][next[0]] < 9) {
      updateVisited(visited, next);
      currentPath.push(next);
      // console.log('Moving to', next);
      continue;
    }
  }

  return score;
}

/**
 * @param {Point} xy
 * @param {number[][]} map
 * @param {PointsDict} visited
 * @param {Point | null} prevXy
 * @returns {Point | false}
 */
function findNextAvailableSpace(xy, map, visited, prevXy = null) {
  const [x, y] = xy;
  const cuurentPointVal = map[y][x];

  let pointsToCheck = [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ];

  if (prevXy) {
    const [prevX, prevY] = prevXy;
    pointsToCheck = pointsToCheck.filter(
      ([x, y]) => x !== prevX || y !== prevY,
    );
  }

  for (let i = 0; i < pointsToCheck.length; i++) {
    const [x, y] = pointsToCheck[i];
    const val = map[y]?.[x];

    if (!val) {
      continue;
    }

    if (val !== cuurentPointVal + 1) {
      continue;
    }

    if (visited[y]?.some((vx) => vx === x)) {
      continue;
    }

    return [x, y];
  }

  return false;
}

/**
 * Update visited dict by reference
 * @param {PointsDict} visited
 * @param {Point} xy
 */
function updateVisited(visited, [x, y]) {
  if (!visited[y]) {
    visited[y] = [x];
    return;
  }

  visited[y].push(x);
}
