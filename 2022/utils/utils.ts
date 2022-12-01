export const windows = <T>(xs: T[], size: number) =>
  xs.slice(0, -size + 1).map((_, i) => xs.slice(i, i + size));

  export const cartesian = (l1: number[], l2: number[]): number[][] =>
    l1.flatMap(x => l2.map(y => [x, y]));