// import inputRaw from "./input-mock";
import { getMaxJoltageOfLine, getMaxJoltageOfLineV2 } from "./getMaxJoltageOfLine";
import inputRaw from "./input";

function calculateMaxJoltage(inputRaw: string): number {
  const rows = inputRaw.split("\n")?.filter((i) => i);
  const rowValues = rows.map((row) => getMaxJoltageOfLine(row));
  return rowValues.reduce((a, b) => a + b, 0);
}

function main() {
  console.log("Advent Of Code 2025 Day 3 Part 1");
  const r1 = calculateMaxJoltage(inputRaw);
  console.log("MAX JOLTAGE:", r1);

  console.log("Part 2 --------")
  const r2 = getMaxJoltageOfLineV2('234234234234278')
  console.log(r2)
}

main();
