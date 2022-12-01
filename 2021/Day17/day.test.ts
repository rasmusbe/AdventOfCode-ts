import { part1 } from ".";

test("test day", () => {
  const [example1, example2] = part1(__dirname, "example.txt");
  expect(example1).toBe(45);

  const [result1, result2] = part1(__dirname, "input.txt");
  console.log("Part 1:", result1);

  expect(example2).toBe(112);
  console.log("Part 2:", result2);
});