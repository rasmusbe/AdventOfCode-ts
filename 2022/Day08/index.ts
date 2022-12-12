import { getTextFile } from "../utils/getInput";

export const part1 = (dirName: string, inputFile: string): number => {
  const input = parseInput(dirName, inputFile);
  const gridSize = getGridSize(input);

  const visibleTrees = input.reduce((acc, tree, index) => {
    const treeRow = Math.floor(index / gridSize);
    const treeCol = index % gridSize;

    // From left
    const leftTrees = input.slice(treeRow * gridSize, index);
    if (
      treeCol === 0 ||
      leftTrees.find((leftTree) => leftTree >= tree) === undefined
    ) {
      acc.push(tree);
      return acc;
    }

    // From right
    const rightTrees = input.slice(index + 1, (treeRow + 1) * gridSize);
    if (
      treeCol === gridSize - 1 ||
      rightTrees.find((rightTree) => rightTree >= tree) === undefined
    ) {
      acc.push(tree);
      return acc;
    }

    // From top
    const topTrees = input
      .slice(0, index)
      .filter((_topTree, topIndex) => topIndex % gridSize === treeCol);
    if (
      treeCol === 0 ||
      topTrees.find((topTree) => topTree >= tree) === undefined
    ) {
      acc.push(tree);
      return acc;
    }

    // From bottom
    const bottomTrees = input
      .slice(index + 1)
      .filter(
        (_bottomTree, bottomIndex) =>
          (bottomIndex + treeCol + 1) % gridSize === treeCol
      );
    if (
      treeCol === gridSize - 1 ||
      bottomTrees.find((bottomTree) => bottomTree >= tree) === undefined
    ) {
      acc.push(tree);
      return acc;
    }
    return acc;
  }, [] as number[]);

  return visibleTrees.length;
};

export const parseInput = (dirName: string, inputFile: string): number[] =>
  getTextFile(dirName, inputFile)
    .split("")
    .map((char) => parseInt(char, 10))
    .filter((char) => char >= 0);

export const getGridSize = (input: number[]): number => Math.sqrt(input.length);

const findScenic = (rows: number[][], cols: number[][]) => {
  let highest = 0;

  for (let r = 1; r < rows.length - 1; r++) {
    for (let c = 1; c < cols.length - 1; c++) {
      let tree = rows[r][c],
        score = 1,
        dirscore = 0;

      // Up
      for (let y = r - 1; y >= 0; y--) {
        dirscore++;
        if (rows[y][c] >= tree) break;
      }
      score *= dirscore;

      // Left
      dirscore = 0;
      for (let x = c - 1; x >= 0; x--) {
        dirscore++;
        if (rows[r][x] >= tree) break;
      }
      score *= dirscore;

      // Down
      dirscore = 0;
      for (let y = r + 1; y < cols.length; y++) {
        dirscore++;
        if (rows[y][c] >= tree) break;
      }
      score *= dirscore;

      // Right
      dirscore = 0;
      for (let x = c + 1; x < rows.length; x++) {
        dirscore++;
        if (rows[r][x] >= tree) break;
      }
      score *= dirscore;

      if (score > highest) highest = score;
    }
  }

  return highest;
};

export const getScore = (
  treeIndex: number,
  input: number[],
  gridSize: number
): number => {
  const treeRow = Math.floor(treeIndex / gridSize);
  const treeCol = treeIndex % gridSize;
  const treeHeight = input[treeIndex];

  const leftTrees = input.slice(treeRow * gridSize, treeIndex).reverse();
  const rightTrees = input.slice(treeIndex + 1, (treeRow + 1) * gridSize);
  const topTrees = input
    .slice(0, treeIndex)
    .filter((_topTree, topIndex) => topIndex % gridSize === treeCol)
    .reverse();
  const bottomTrees = input
    .slice(treeIndex + 1)
    .filter(
      (_bottomTree, bottomIndex) =>
        (bottomIndex + treeCol + 1) % gridSize === treeCol
    );

  if (
    !leftTrees.length ||
    !rightTrees.length ||
    !topTrees.length ||
    !bottomTrees.length
  )
    return 0;

  const score = [topTrees, leftTrees, rightTrees, bottomTrees].reduce(
    (acc, trees) => {
      let numTrees = 0;

      for (let i = 0; i < trees.length; i++) {
        numTrees++;
        if (trees[i] >= treeHeight) break;
      }

      acc *= numTrees;
      return acc;
    },
    1
  );

  return score;
};

export const part2 = (dirName: string, inputFile: string): number => {
  const input = parseInput(dirName, inputFile);

  const gridSize = getGridSize(input);

  let maxScore = 0;
  for (let treeIndex = 0; treeIndex < input.length - 1; treeIndex++) {
    const score = getScore(treeIndex, input, gridSize);
    if (score > maxScore) {
      maxScore = score;
    }
  }

  return maxScore;
};
