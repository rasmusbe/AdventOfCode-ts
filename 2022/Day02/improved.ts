import { getTextFileLines } from "../utils/getInput";

export const part1 = (dirName: string, inputFile: string): number => {
  const input = getTextFileLines(dirName, inputFile);

  return input.reduce((accScore, round) => {
    const [opPlayer, mePlayer] = round.split(" ");

    const opPos = "ABC".indexOf(opPlayer);
    const mePos = "XYZ".indexOf(mePlayer);

    let score = mePos + 1;

    switch ((mePos - opPos) % 3) {
      case 0:
        score += 3;
        break;
      case 1:
        score += 6;
        break;
    }

    return accScore + score;
  }, 0);
};

export const part2 = (dirName: string, inputFile: string): number => {
  const input = getTextFileLines(dirName, inputFile);

  return input.reduce((accScore, round) => {
    const [opPlayer, instruction] = round.split(" ");

    const opPos = "ABC".indexOf(opPlayer);

    let score = 0;

    switch (instruction) {
      case "X":
        score += ((opPos - 1) % 3) + 1;
        break;
      case "Y":
        score += opPos + 1;
        score += 3;
        break;
      case "Z":
        score += ((opPos + 1) % 3) + 1;
        score += 6;
        break;
    }

    return accScore + score;
  }, 0);
};
