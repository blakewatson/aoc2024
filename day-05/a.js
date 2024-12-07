const { readFileSync } = require('fs');

const data = readFileSync(`${__dirname}/input.txt`, 'utf-8');

const dataParts = data.split('\n\n');
const rules = dataParts[0]
  .split('\n')
  .map((r) => r.split('|').map((p) => parseInt(p)));
const pages = dataParts[1]
  .split('\n')
  .map((p) => p.split(',').map((p) => parseInt(p)));

const middleNumbers = [];

loop: for (let page of pages) {
  for (let [r1, r2] of rules) {
    if (!page.includes(r1) || !page.includes(r2)) {
      continue;
    }

    const idx1 = page.indexOf(r1);
    const idx2 = page.indexOf(r2);

    if (idx1 > idx2) {
      continue loop;
    }
  }

  middleNumbers.push(page.at(Math.round(page.length / 2) - 1));
}

console.log(middleNumbers.reduce((acc, n) => acc + n));
