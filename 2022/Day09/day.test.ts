import { part1and2 } from ".";

test("test day", () => {
  const testAnswer = part1and2(__dirname, "example.txt");
  expect(testAnswer).not.toBe(0);
  expect(testAnswer).toBe(13);

  // Only when successful
  const realAnswer = part1and2(__dirname, "input.txt");
  expect(realAnswer).not.toBe(0);
  console.log(`Part 1: ${realAnswer}`);

  const testAnswer2 = part1and2(__dirname, "example2.txt", 8);
  expect(testAnswer2).toBe(36);

  // Only when successful
  const realAnswer2 = part1and2(__dirname, "input.txt", 8);
  expect(realAnswer2).not.toBe(0);
  console.log(`Part 2: ${realAnswer2}`);
});
