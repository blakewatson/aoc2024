const { readFileSync } = require('fs');

const data = readFileSync(`${__dirname}/test.txt`, 'utf-8');

const dataParts = data.split('\n\n');
const rules = dataParts[0]
  .split('\n')
  .map((r) => r.split('|').map((p) => parseInt(p)));
const updates = dataParts[1]
  .split('\n')
  .map((p) => p.split(',').map((p) => parseInt(p)));

let invalidUpdates = updates.filter((pages) => {
  for (let [r1, r2] of rules) {
    if (!pages.includes(r1) || !pages.includes(r2)) {
      continue;
    }

    const idx1 = pages.indexOf(r1);
    const idx2 = pages.indexOf(r2);

    if (idx1 > idx2) {
      return true;
    }
  }
  return false;
});

invalidUpdates = invalidUpdates.map((pages) => {
  pages.sort((a, b) => {
    const relevantRules = rules.filter((r) => r.includes(a) && r.includes(b));

    if (!relevantRules.length) {
      return 0;
    }

    return a === relevantRules[0] ? -1 : 1;
  });

  return pages;
});

const output = invalidUpdates.reduce(
  (acc, pages) => acc + pages.at(Math.round(pages.length / 2) - 1),
  0,
);

console.log(output);
