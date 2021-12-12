import { getTextFileLines } from "../utils/getInput";

class Octopus {
  energyLevel: number;
  row: number;
  col: number;
  lastFlash: number;

  constructor(row: number, col: number, energyLevel: number) {
    this.row = row;
    this.col = col;
    this.energyLevel = energyLevel;
  }

  flash(step: number) {
    this.lastFlash = step;
    this.energyLevel = -1;
  }
}

class Grid {
  grid: Octopus[][];

  constructor(grid: Octopus[][]) {
    this.grid = grid;
  }

  getNeighbors(row: number, col: number): Octopus[] {
    let neighbors = [];

    if (row > 0) {
      neighbors.push(
        ...this.grid[row - 1].slice(
          Math.max(0, col - 1),
          Math.min(this.grid[row].length, col + 2)
        )
      );
    }

    neighbors.push(
      ...this.grid[row]
        .slice(Math.max(0, col - 1), Math.min(this.grid[row].length, col + 2))
        .filter((octopus) => octopus.row !== row || octopus.col !== col)
    );

    if (row < this.grid.length - 1) {
      neighbors.push(
        ...this.grid[row + 1].slice(
          Math.max(0, col - 1),
          Math.min(this.grid[row].length, col + 2)
        )
      );
    }

    return neighbors;
  }

  getFlashes(step: number): number {
    let flashes = 0;

    let flashing = this.grid
      .flat()
      .filter((octopus) => octopus.energyLevel >= 9);

    while (flashing.length) {
      flashing.forEach((octopus) => {
        octopus.flash(step);

        this.getNeighbors(octopus.row, octopus.col)
          .filter((octopus) => octopus.lastFlash !== step)
          .forEach((neighbor) => {
            neighbor.energyLevel++;
          });

        flashes++;
      });

      flashing = this.grid.flat().filter((octopus) => octopus.energyLevel >= 9);
    }

    this.grid.flat().forEach((octopus) => octopus.energyLevel++);

    return flashes;
  }

  getLevelsAfterStep(step: number): number[] {
    this.getFlashes(step);

    return this.grid.flat().map((octopus) => octopus.energyLevel);
  }

  toString(): string {
    return this.grid
      .map((row) => row.map((octopus) => octopus.energyLevel).join(""))
      .join(" ");
  }
}

export const part1 = (dirName: string, inputFile: string): number => {
  const input = getTextFileLines(dirName, inputFile).map((line, row) =>
    line.split("").map((x, col) => new Octopus(row, col, parseInt(x)))
  );
  const grid = new Grid(input);

  let flashes = 0;

  for (let step = 0; step < 100; step++) {
    flashes += grid.getFlashes(step);
  }

  return flashes;
};

export const part2 = (dirName: string, inputFile: string): number => {
  const input = getTextFileLines(dirName, inputFile).map((line, row) =>
    line.split("").map((x, col) => new Octopus(row, col, parseInt(x)))
  );
  const grid = new Grid(input);

  let step = 0;

  while (grid.getLevelsAfterStep(step).some((level) => level > 0)) {
    step++;
  }

  return step + 1;
};

export const run = () => {
  console.log("Part 1:", part1(__dirname, "input.txt"));
  console.log("Part 2:", part2(__dirname, "input.txt"));
};
