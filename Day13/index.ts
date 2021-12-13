import { getTextFile } from "../utils/getInput";

type Paper = string[][];

const getInput = (dirName: string, inputFile: string): [Paper, string[]] => {
  const file = getTextFile(dirName, inputFile);
  let [dots, folds] = file.split("\n\n");
  const [maxX, maxY] = dots.split("\n").reduce(
    ([accX, accY], dot) => {
      const [x, y] = dot.split(",");
      return [Math.max(accX, parseInt(x)), Math.max(accY, parseInt(y))];
    },
    [0, 0]
  );

  const paper: Paper = new Array(maxY + 1)
    .fill(null)
    .map(() => new Array(maxX + 1).fill("."));

  dots.split("\n").forEach((dot) => {
    const [x, y] = dot.split(",");
    paper[parseInt(y)][parseInt(x)] = "#";
  });

  return [paper, folds.split("\n")];
};

const paperToString = (paper: Paper): string => {
  return paper
    .map((row) => row.map((cell) => (cell === "." ? "  " : "██")).join(""))
    .join("\n");
};

const removeRows = (paper: Paper, from: number, to: number) => {
  paper.splice(from, to + 1);
  return paper;
};

const removeCols = (paper: Paper, from: number, to: number) => {
  paper.forEach((row) => row.splice(from, to + 1));
  return paper;
};

const fold = (paper: Paper, folds: string[]): Paper => {
  folds.forEach((fold) => {
    const [line, value] = fold.split("=");

    if (line.includes("x")) {
      for (let i in paper) {
        for (let j = +value + 1; j < paper[i].length; j++) {
          if (paper[i][j] === "#") {
            paper[i][j] = ".";
            paper[i][+value - (j - +value)] = "#";
          }
        }
      }

      paper = removeCols(paper, +value, paper[0].length - 1);
    } else {
      for (let i = +value + 1; i <= paper.length - 1; i++) {
        for (let j = 0; j < paper[i].length; j++) {
          if (paper[i][j] === "#") {
            paper[i][j] = ".";
            paper[+value - (i - +value)][j] = "#";
          }
        }
      }

      paper = removeRows(paper, +value, paper.length - 1);
    }
  });

  return paper;
};

export const part1 = (dirName: string, inputFile: string): number => {
  let [paper, folds] = getInput(dirName, inputFile);

  paper = fold(paper, folds.slice(0, 1));

  return paper.flat().filter((cell) => cell === "#").length;
};

export const part2 = (dirName: string, inputFile: string): number => {
  let [paper, folds] = getInput(dirName, inputFile);

  paper = fold(paper, folds);

  console.log(paperToString(paper));

  return paper.flat().filter((cell) => cell === "#").length;
};

export const run = () => {
  console.log("Part 1:", part1(__dirname, "input.txt"));
  console.log("Part 2:", part2(__dirname, "input.txt"));
};
