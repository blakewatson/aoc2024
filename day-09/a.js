const { readFileSync } = require('fs');

main();

function main() {
  const map = readFileSync(__dirname + '/input.txt', 'utf-8');
  let { disk, dotCount } = importMap(map);
  let compacted = [...disk];

  for (let i = disk.length - 1; i >= 0; i--) {
    if (dotCount === 0) {
      break;
    }

    if (disk[i] === '.') {
      dotCount--;
      continue;
    }

    const id = disk[i];
    compacted = insertIdAtNextFreeSpace(id, compacted);
    compacted[i] = '.';
    dotCount--;
  }

  const checksum = compacted
    .filter((_) => _ !== '.')
    .reduce((acc, val, i) => acc + parseInt(val) * i, 0);

  console.log(checksum);
}

function importMap(map) {
  let id = 0;
  let disk = [];
  let isFile = true;
  let dotCount = 0;

  for (let i = 0; i < map.length; i++) {
    const val = parseInt(map[i]);

    if (!isFile) {
      for (let j = 0; j < val; j++) {
        dotCount++;
        disk.push('.');
      }
      isFile = !isFile;
      continue;
    }

    for (let j = 0; j < val; j++) {
      disk.push(id);
    }

    id++;
    isFile = !isFile;
  }

  return { disk, dotCount };
}

function insertIdAtNextFreeSpace(id, compacted) {
  for (let i = 0; i < compacted.length; i++) {
    if (compacted[i] === '.') {
      compacted[i] = id;
      return compacted;
    }
  }
}
