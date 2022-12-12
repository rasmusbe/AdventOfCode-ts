import { getGridSize, getScore, parseInput, part1, part2 } from ".";

test("test day", () => {
  const testAnswer = part1(__dirname, "example.txt");
  expect(testAnswer).not.toBe(0);

  expect(testAnswer).toBe(21);

  // Only when successful
  const realAnswer = part1(__dirname, "input.txt");
  expect(realAnswer).not.toBe(0);
  console.log(`Part 1: ${realAnswer}`);

  const exampleTrees = parseInput(__dirname, "example.txt");
  const exampleGridSize = getGridSize(exampleTrees);

  expect(getScore(7, exampleTrees, exampleGridSize)).toBe(4);
  expect(getScore(17, exampleTrees, exampleGridSize)).toBe(8);

  expect(part2(__dirname, "example.txt")).toBe(8);

  // Only when successful
  const realAnswer2 = part2(__dirname, "input.txt");
  expect(realAnswer2).not.toBe(0);
  expect(realAnswer2).toBeGreaterThan(10692);
  console.log(`Part 2: ${realAnswer2}`);
});
