import { part1, part2 } from ".";

test("test day", () => {
  const answer = part1(__dirname, "example.txt");
  expect(answer).toBe(4140);

  // Only when successful
  console.log(`Part 1: ${part1(__dirname, "input.txt")}`);

  const answer2 = part2(__dirname, "example.txt");
  expect(answer2).toBe(3993);

  // Only when successful
  console.log(`Part 2: ${part2(__dirname, "input.txt")}`);
});
