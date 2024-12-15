// @ts-check

/** @typedef {{[x:string]: number}} NumsMap */

const { readFileSync } = require('fs');

main();

function main() {
  const data = readFileSync(__dirname + '/input.txt', 'utf-8')
    .split(' ')
    .map((_) => _);

  /** @type {NumsMap} */
  let numsMap = groupNums(data);
  const totalCycles = 75;
  let total = 0;

  for (let i = 0; i < totalCycles; i++) {
    numsMap = processNumsMap({ ...numsMap });
  }

  for (let key in numsMap) {
    total += numsMap[key];
  }

  console.log(`${total} stones`);
}

/**
 * @param {NumsMap} numsMap
 */
function processNumsMap(numsMap) {
  /** @type {NumsMap} */
  const newMap = {};

  const entries = Object.entries(numsMap);

  for (let [num, count] of entries) {
    if (!numsMap[num]) {
      continue;
    }

    const result = processNum(num);

    for (let val of result) {
      if (!newMap[val]) {
        newMap[val] = 0;
      }
      newMap[val] += count;
    }
  }

  return newMap;
}

/**
 * @param {string} num
 * @returns {string[]}
 */
function processNum(num) {
  if (num === '0') {
    return ['1'];
  }

  if (num.length % 2 === 0) {
    const len = num.length / 2;
    const num2 = parseInt(num.substring(len, num.length)).toString();
    num = num.substring(0, len);
    return [num, num2];
  }

  return [(parseInt(num) * 2024).toString()];
}

/**
 * @param {string[]} nums
 * @returns {NumsMap}
 */
function groupNums(nums) {
  /** @type {NumsMap} */
  const groups = {};

  for (let i = 0; i < nums.length; i++) {
    if (!groups[nums[i]]) {
      groups[nums[i]] = 1;
      continue;
    }
    groups[nums[i]]++;
  }

  return groups;
}
