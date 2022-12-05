import { getTextFile } from "../utils/getInput";

const initStacks = (stacksInit: string) => {
  const regex = /(\ {4}|[a-zA-Z])/g;

  const stacks: string[][] = [];
  stacksInit.split("\n").forEach((line) => {
    line.match(regex)?.forEach((match, stackId) => {
      if (match.trim() === "") return;

      if (!stacks[stackId + 1]) stacks[stackId + 1] = [];

      stacks[stackId + 1].push(match);
    });
  });

  return stacks;
};

export const part1And2 = (
  dirName: string,
  inputFile: string,
  liftMany = false
): string => {
  const [stacksInit, instructions] = getTextFile(dirName, inputFile).split(
    "\n\n"
  );

  const stacks = initStacks(stacksInit);

  const instructionRegex = /move (\d+) from (\d+) to (\d+)/;

  for (const instruction of instructions.split("\n")) {
    const [num, from, to] = instruction
      .match(instructionRegex)
      ?.slice(1) // Remove the full match
      .map((n) => parseInt(n));

    let lift = stacks[from].splice(0, num);
    if (!liftMany) lift = lift.reverse();
    stacks[to].unshift(...lift);
  }

  const message = stacks.map((stack) => stack[0]).join("");

  return message;
};
