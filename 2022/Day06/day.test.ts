import { readFileSync } from "fs-extra";
import { part1and2 } from ".";

const example1 = {
  mjqjpqmgbljsphdztnvjfqwrcgsmlb: 7,
  bvwbjplbgvbhsrlpgdmjqwftvncz: 5,
  nppdvjthqldpwncqszvftbrmjlhg: 6,
  nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg: 10,
  zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw: 11,
};

const example2 = {
  mjqjpqmgbljsphdztnvjfqwrcgsmlb: 19,
  bvwbjplbgvbhsrlpgdmjqwftvncz: 23,
  nppdvjthqldpwncqszvftbrmjlhg: 23,
  nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg: 29,
  zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw: 26,
};

test("test day", () => {
  for (const [key, value] of Object.entries(example1)) {
    const testAnswer = part1and2(key, 4);
    expect(testAnswer).toBe(value);
  }

  // Only when successful
  const realAnswer = part1and2(
    readFileSync(__dirname + "/input.txt", "utf8"),
    4
  );
  expect(realAnswer).not.toBe(0);
  console.log(`Part 1: ${realAnswer}`);

  // Part 2:
  for (const [key, value] of Object.entries(example2)) {
    const testAnswer = part1and2(key, 14);
    expect(testAnswer).toBe(value);
  }

  // Only when successful
  const realAnswer2 = part1and2(
    readFileSync(__dirname + "/input.txt", "utf8"),
    14
  );
  expect(realAnswer2).not.toBe(0);
  console.log(`Part 2: ${realAnswer2}`);
});
