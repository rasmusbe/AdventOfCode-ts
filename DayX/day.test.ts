import { part1, part2 } from ".";

test("example 1", () => {
  const answer = part1(__dirname, "example.txt");
  expect(answer).toBe(0);

  // Only when successful
  console.log(`Part 1: ${part1(__dirname, "input.txt")}`);
});

// test("example 2", () => {
//   const answer = part2(__dirname, "example.txt");
//   expect(answer).toBe("5");

//   // Only when successful
//   console.log(`Part 2: ${part2(__dirname, "input.txt")}`);
// });