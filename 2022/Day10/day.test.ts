import { part1, part2 } from ".";
import { getTextFile } from "../utils/getInput";

const steps = {
  20: 420,
  60: 1140,
  100: 1800,
  140: 2940,
  180: 2880,
  220: 3960,
};

test("test day", () => {
  Object.keys(steps).forEach((step) => {
    const testAnswer = part1(__dirname, "example.txt", parseInt(step));
    expect(testAnswer).toBe(steps[step]);
  });

  // Only when successful
  const realAnswer = Object.keys(steps)
    .map((step) => part1(__dirname, "input.txt", parseInt(step)))
    .reduce((a, b) => a + b, 0);
  expect(realAnswer).not.toBe(0);
  console.log(`Part 1: ${realAnswer}`);

  const testAnswer2 = part2(__dirname, "example.txt");
  expect(testAnswer2).not.toBe(0);
  expect(testAnswer2).toBe(getTextFile(__dirname, "example-result.txt"));

  // Only when successful
  const realAnswer2 = part2(__dirname, "input.txt");
  expect(realAnswer2).not.toBe(0);
  console.log(`Part 2: \n${realAnswer2.replace(/\./g, " ")}`);
});
