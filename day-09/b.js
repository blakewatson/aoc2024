const { readFileSync } = require('fs');

main();

function main() {
  const map = readFileSync(__dirname + '/input.txt', 'utf-8');
  let { disk, dotCount } = importMap(map);
  // let compacted = [...disk];
  let idCountdown = disk.at(-1).id || disk.at(-2).id;
  // console.log(disk);

  for (let i = disk.length - 1; i >= 0; i--) {
    // console.log(`${i} checking ${idCountdown}`);
    // console.log(diskAString(disk));

    if (disk[i].id === null) {
      continue;
    }

    const file = disk[i];
    const id = disk[i].id;
    const idx = getNextFreeSpace(file.size, disk, i);

    if (idx !== false) {
      const sizeAfterInsert = insertFileIntoSpace(file, disk, idx);

      // if the space had left over size, insert a new item in the disk
      if (sizeAfterInsert) {
        disk.splice(idx + 1, 0, { id: null, size: sizeAfterInsert });
        i++; // increment the counter since we added an element
      }
    }

    idCountdown--;
  }

  const blocks = disk.flatMap((item) =>
    [...Array(item.size).keys()].map((i) => ({ id: item.id, size: item.size })),
  );
  // console.log(blocks);
  // console.log(diskAString(disk));

  let checksum = 0;

  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].id === null) {
      continue;
    }

    checksum += parseInt(blocks[i].id) * i;
  }

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
      disk.push({ size: val, id: null });
      isFile = !isFile;
      continue;
    }

    disk.push({ size: val, id });

    id++;
    isFile = !isFile;
  }

  return { disk, dotCount };
}

function getNextFreeSpace(size, disk, stopAtIndex) {
  for (let i = 0; i < stopAtIndex; i++) {
    if (disk[i].id === null && disk[i].size >= size) {
      return i;
    }
  }
  // console.log('free space not found');
  return false;
}

// returns 0 if perfect fit, otherwise returns number of remainder size of space
function insertFileIntoSpace(file, disk, i) {
  const space = disk[i];

  if (space.size === file.size) {
    space.id = file.id;
    file.id = null;
    return 0;
  }

  if (space.size > file.size) {
    const diff = space.size - file.size;
    space.size = file.size;
    space.id = file.id;
    file.id = null;
    return diff;
  }
}

// unnecessary helper function for visualization
function diskAString(disk) {
  let str = '';

  for (let space of disk) {
    str += `${space.id ?? '.'}`.repeat(space.size);
  }

  return str;
}
