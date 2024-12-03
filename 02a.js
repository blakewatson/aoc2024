import data from './02-input.js';

const reports = data
  .split('\n')
  .map((line) => line.split(' ').map((_) => parseInt(_)));

const safeReports = reports.filter((levels) => {
  const benchmarkSign = Math.sign(levels[0] - levels[1]);

  for (let i = 0; i < levels.length - 1; i++) {
    const delta = levels[i] - levels[i + 1];

    if (!delta || Math.sign(delta) !== benchmarkSign || Math.abs(delta) > 3) {
      return false;
    }
  }

  return true;
});

console.log(safeReports.length);
