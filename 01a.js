import data from './01-input.js';

const listA = [];
const listB = [];

data.split('\n').forEach((line) => {
  const ids = line.split('   ');
  listA.push(parseInt(ids[0]));
  listB.push(parseInt(ids[1]));
});

listA.sort();
listB.sort();

const totalDistance = listA.reduce(
  (total, idA, i) => (total += Math.abs(idA - listB[i])),
  0,
);

console.log(totalDistance);
