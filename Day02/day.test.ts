import { part1, part2 } from ".";

test("example 1", () => {
  const answer = part1(__dirname, "example.txt");
  expect(answer).toBe(150);
});

test("example 2", () => {
  const answer = part2(__dirname, "example.txt");
  expect(answer).toBe(900);
});