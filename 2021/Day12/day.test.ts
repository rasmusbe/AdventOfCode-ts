import { part1, part2 } from ".";

test("test day", () => {
  const answer1_1 = part1(__dirname, "example1.txt");
  expect(answer1_1).toBe(10);
  const answer1_2 = part1(__dirname, "example2.txt");
  expect(answer1_2).toBe(19);
  const answer1_3 = part1(__dirname, "example3.txt");
  expect(answer1_3).toBe(226);

  // Only when successful
  console.log(`Part 1: ${part1(__dirname, "input.txt")}`);

  const answer2_1 = part2(__dirname, "example1.txt");
  expect(answer2_1).toBe(36);
  const answer2_2 = part2(__dirname, "example2.txt");
  expect(answer2_2).toBe(103);
  const answer2_3 = part2(__dirname, "example3.txt");
  expect(answer2_3).toBe(3509);

  // Only when successful
  console.log(`Part 2: ${part2(__dirname, "input.txt")}`);
});
