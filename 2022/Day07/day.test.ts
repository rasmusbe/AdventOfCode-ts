import { part1, part2 } from ".";

test("test day", () => {
  const testAnswer = part1(__dirname, "example.txt");
  expect(testAnswer).toBe(95437);

  // Only when successful
  const realAnswer = part1(__dirname, "input.txt");
  expect(realAnswer).not.toBe(0);
  expect(realAnswer).toBeGreaterThan(889223);
  console.log(`Part 1: ${realAnswer}`);

  const testAnswer2 = part2(__dirname, "example.txt");
  expect(testAnswer).not.toBe(0);
  expect(testAnswer2).toBe(24933642);

  // Only when successful
  const realAnswer2 = part2(__dirname, "input.txt");
  expect(realAnswer2).not.toBe(0);
  console.log(`Part 2: ${realAnswer2}`);
});
