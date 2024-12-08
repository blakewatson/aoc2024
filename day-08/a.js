// @ts-check

const { readFileSync } = require('fs');

/** @typedef {[number, number]} Point */

/**
 * @typedef Pair
 * @property {[Point, Point]} points
 * @property {[Point, Point]} antinodes
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

  const combinations = Object.keys(antennas).reduce(
    /** @param {Pair[]} combos */
    (combos, key) => {
      combos = combos.concat(getCombinations(antennas[key]));
      return combos;
    },
    [],
  );

  const validAntinodes = combinations.reduce(
    /** @param {Point[]} nodes */
    (nodes, pair) => {
      for (let node of pair.antinodes) {
        if (data[node[1]]?.[node[0]]) {
          nodes.push(node);
        }
      }
      return nodes;
    },
    [],
  );

  console.log(dedupe(validAntinodes).length);
}

/** @param {Point[]} points */
function getCombinations(points) {
  return points.reduce(
    /** @param {Pair[]} combos */
    (combos, point, i) => {
      if (i === points.length - 1) {
        return combos;
      }

      points.slice(i + 1).forEach((p) => {
        /** @type {Pair} */
        const pair = {
          points: [point, p],
          antinodes: getAntinodes(point, p),
        };

        combos.push(pair);
      });

      return combos;
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
 * @param {Point} p1
 * @param {Point} p2
 * @returns {[Point, Point]}
 */
function getAntinodes(p1, p2) {
  const d = getDelta(p1, p2);

  /** @type {Point} */
  const n1 = [p2[0] + d[0], p2[1] + d[1]];
  /** @type {Point} */
  const n2 = [p1[0] - d[0], p1[1] - d[1]];

  return [n1, n2];
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
