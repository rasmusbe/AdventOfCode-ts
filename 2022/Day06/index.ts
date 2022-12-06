export const part1and2 = (dataString: string, reqUnique: number): number => {
  const dataChars = dataString.split("");

  const markerStart = dataChars.findIndex(
    (_char, charPos) =>
      new Set(dataChars.slice(charPos, charPos + reqUnique)).size === reqUnique
  );

  return markerStart + reqUnique;
};
