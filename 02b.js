import data from './02-input.js';

const reports = data
  .split('\n')
  .map((line) => line.split(' ').map((_) => parseInt(_)));

const isSafeReport = (levels) => {
  const benchmarkSign = Math.sign(levels[0] - levels[1]);

  for (let i = 0; i < levels.length - 1; i++) {
    const delta = levels[i] - levels[i + 1];

    if (!delta || Math.sign(delta) !== benchmarkSign || Math.abs(delta) > 3) {
      return false;
    }
  }

  return true;
}

const safeReports = reports.filter((levels) => {
  let isSafe = isSafeReport(levels);

  if (isSafe) {
    return true;
  }

  for (let i = 0; i < levels.length; i++) {
    const isSafe = isSafeReport([...levels].toSpliced(i, 1));

    if (isSafe) {
      return true;
    }
  }

  return false;
});

console.log(safeReports.length);
