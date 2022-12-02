import { getTextFileLines } from "../utils/getInput";

const moves = ["A", "B", "C"];

// A beats C, B beats A, C beats B
const winsAgainst = (move: string, invert = false): string =>
  moves[(moves.indexOf(move) + (invert ? 1 : 2)) % 3];

// Convert X, Y, Z to A, B, C
const playerMove = (mePlayer: string): string =>
  String.fromCharCode(mePlayer.charCodeAt(0) - 23);

const getScore = (opPlayer: string, mePlayer: string): number => {
  // A is charcode 65 so we subtract 64 to get 1 point
  let score = mePlayer.charCodeAt(0) - 64;

  if (opPlayer === mePlayer) {
    // Draw
    score += 3;
  } else if (winsAgainst(mePlayer) === opPlayer) {
    // Win
    score += 6;
  } else {
    // Lose
  }

  return score;
};

export const part1 = (dirName: string, inputFile: string): number => {
  const input = getTextFileLines(dirName, inputFile);

  return input.reduce((accScore, round) => {
    const [opPlayer, mePlayer] = round.split(" ");
    return accScore + getScore(opPlayer, playerMove(mePlayer));
  }, 0);
};

export const part2 = (dirName: string, inputFile: string): number => {
  const input = getTextFileLines(dirName, inputFile);

  return input.reduce((accScore, round) => {
    const [opPlayer, instruction] = round.split(" ");
    let mePlayer: string;

    switch (instruction) {
      case "X":
        // Lose by opponent winning
        mePlayer = winsAgainst(opPlayer);
        break;
      case "Y":
        // Draw by playing same move
        mePlayer = opPlayer;
        break;
      case "Z":
        // Win by opponent losing
        mePlayer = winsAgainst(opPlayer, true);
        break;
    }

    return accScore + getScore(opPlayer, mePlayer);
  }, 0);
};
