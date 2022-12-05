import { part1And2 } from ".";

test("test day", () => {
  const answer = part1And2(__dirname, "example.txt");
  expect(answer).toBe("CMZ");

  // Only when successful
  const realAnswer = part1And2(__dirname, "input.txt");
  expect(realAnswer).not.toBe("RFSFSPZLD");
  console.log(`Part 1: ${realAnswer}`);

  const testAnswer2 = part1And2(__dirname, "example.txt", true);
  expect(testAnswer2).toBe("MCD");

  // Only when successful
  const realAnswer2 = part1And2(__dirname, "input.txt", true);
  expect(realAnswer2).not.toBe(0);
  console.log(`Part 2: ${realAnswer2}`);
});
