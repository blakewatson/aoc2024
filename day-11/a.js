const { readFileSync } = require('fs');

main();

function main() {
  let stones = readFileSync(__dirname + '/input.txt', 'utf-8').split(' ');

  for (let i = 0; i < 25; i++) {
    stones = stones.flatMap((stone) => {
      if (stone === '0') {
        return '1';
      }

      if (stone.length % 2 === 0) {
        const len = stone.length / 2;
        const stone2 = parseInt(stone.substring(len, stone.length)).toString();
        stone = stone.substring(0, len);
        return [stone, stone2];
      }

      return (parseInt(stone) * 2024).toString();
    });
  }

  console.log(`${stones.length} stones`);
}
