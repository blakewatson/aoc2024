import { readFileSync } from 'fs';

const data = readFileSync('03-input.txt', 'utf-8');

const pattern = /mul\(\d+,\d+\)/g;

const total = data.matchAll(pattern).reduce((total, matchArr) => {
  const match = matchArr[0];
  const result = match.slice(4, -1);
  const pair = result.split(',').map((_) => parseInt(_));
  total += pair[0] * pair[1];
  return total;
}, 0);

console.log(total);
