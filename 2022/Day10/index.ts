import { getTextFileLines } from "../utils/getInput";

export const part1 = (
  dirName: string,
  inputFile: string,
  cycles: number
): number => {
  const input = getTextFileLines(dirName, inputFile);

  let X = 1;
  let cycle = 1;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === "noop") {
      cycle++;
    } else {
      cycle += 2;

      const modify = parseInt(input[i].split(" ")[1]);

      if (cycle <= cycles) {
        X += modify;
      }
    }

    if (cycle > cycles) {
      break;
    }
  }
  return X * cycles;
};

export const part2 = (dirName: string, inputFile: string): string => {
  const instructions = getTextFileLines(dirName, inputFile).map((line) =>
    line.split(" ")
  );

  const CRT: string[] = [];
  let cycle = 0;
  let X = 1;
  let sprite: [number, number, number];
  let line: string[] = [];

  function checkLine() {
    sprite = [X - 1, X, X + 1];
    if (sprite.includes(cycle)) {
      line.push("#");
    } else {
      line.push(".");
    }
    cycle++;
    if (cycle % 40 === 0) {
      // console.log(line);
      CRT.push(line.join(""));
      line = [];
      X += 40;
    }
  }

  for (let i = 0; i < instructions.length; i++) {
    let action = instructions[i][0];
    let value = parseInt(instructions[i][1]);
    if (action === "noop") {
      checkLine();
    }
    if (action === "addx") {
      checkLine();
      checkLine();
      X += value;
    }
  }
  return CRT.join("\n");
};
