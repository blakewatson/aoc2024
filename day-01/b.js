const { readFileSync } = require('fs');

const data = readFileSync(`${__dirname}/input.txt`, 'utf-8');

const listA = [];
const listB = [];

data.split('\n').forEach((line) => {
  const ids = line.split('   ');
  listA.push(parseInt(ids[0]));
  listB.push(parseInt(ids[1]));
});

listA.sort();
listB.sort();

const similarityScore = listA.reduce((score, idA, i) => {
  const count = listB.filter((_) => _ == idA).length;
  return (score += idA * count);
}, 0);

console.log(similarityScore);
