// @ts-check

const { readFileSync } = require('fs');

/** @typedef {[number, number]} Point */

/**
 * @typedef Pair
 * @property {[Point, Point]} points
 * @property {Point[]} antinodes
 */

main();

function main() {
  const data = readFileSync(__dirname + '/input.txt', 'utf-8')
    .split('\n')
    .map((row) => row.split(''));

  /** @type {{ [key: string]: Point[] }} */
  const antennas = data.reduce((obj, row, y) => {
    return row.reduce((obj, cell, x) => {
      if (cell !== '.') {
        obj[cell] = Array.isArray(obj[cell])
          ? [...obj[cell], [x, y]]
          : [[x, y]];
      }
      return obj;
    }, obj);
  }, {});

  const antinodes = Object.keys(antennas).reduce(
    /** @param {Point[]} combos */
    (combos, key) => {
      combos = combos.concat(getCombinations(data, antennas[key]));
      return combos;
    },
    [],
  );

  console.log(dedupe(antinodes).length);
}

/**
 * @param {string[][]} data
 * @param {Point[]} points
 * @returns {Point[]}
 */
function getCombinations(data, points) {
  return points.reduce(
    /** @param {Point[]} nodes */
    (nodes, point, i) => {
      if (i === points.length - 1) {
        return nodes;
      }

      points
        .slice(i + 1)
        .forEach((p) => nodes.push(...getAntinodes(data, point, p)));

      return nodes;
    },
    [],
  );
}

/**
 * @param {Point} p1
 * @param {Point} p2
 * @returns {Point}
 */
function getDelta(p1, p2) {
  const a = p2[0] - p1[0];
  const b = p2[1] - p1[1];
  return [a, b];
}

/**
 * @param {string[][]} data
 * @param {Point} p1
 * @param {Point} p2
 * @returns {Point[]}
 */
function getAntinodes(data, p1, p2) {
  const d = getDelta(p1, p2);
  /** @type {Point[]} */
  const nodes = [];

  nodes.push(p1, p2);

  /** @type {Point} */
  let point = [p2[0] + d[0], p2[1] + d[1]];

  while (data[point[1]]?.[point[0]]) {
    nodes.push(point);
    point = [point[0] + d[0], point[1] + d[1]];
  }

  point = [p1[0] - d[0], p1[1] - d[1]];

  while (data[point[1]]?.[point[0]]) {
    nodes.push(point);
    point = [point[0] - d[0], point[1] - d[1]];
  }

  return nodes;
}

/**
 * @param {Point[]} points
 * @returns {Point[]}
 */
function dedupe(points) {
  const strings = points.map((p) => p.join());
  const unique = Array.from(new Set(strings));
  /** @ts-ignore */
  return unique.map((p) => p.split(',').map((_) => parseInt(_)));
}

/**
 * Unnecessary helper function for visualization.
 * @param {string[][]} data
 * @param {Point[]} points
 */
function plot(data, points) {
  const newData = data.map((r) => r.map((c) => c));

  points.forEach(([x, y]) => {
    if (newData[y]?.[x] && newData[y][x] === '.') {
      newData[y][x] = '#';
    }
  });

  console.log(newData.map((r) => r.join('')).join('\n'));
}
