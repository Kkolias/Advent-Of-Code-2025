// import inputRaw from "./input-mock";
import inputRaw from "./input";

function getBiggestNumberAndIndex(numberStr: string): {
  number: number;
  index: number;
} {
  const numberList: number[] = numberStr.split("").map((i) => Number(i));

  const index = numberList.indexOf(Math.max(...numberList));
  const number = Math.max(...numberList);

  return {
    index,
    number,
  };
}

function getMaxJoltageOfLine(numberStr: string): number {
//   console.log("CALCULATING ROW ------------");
  const numberStrWithoutLast = numberStr.slice(0, numberStr.length - 1);
  const { index, number } = getBiggestNumberAndIndex(numberStrWithoutLast);
//   console.log("FIRST:", number);

  const slicedStr = numberStr.slice(index + 1);

  const { number: secondNumber } = getBiggestNumberAndIndex(slicedStr);
//   console.log("SECOND:", secondNumber);

  return Number(`${number}${secondNumber}`);
}

function calculateMaxJoltage(inputRaw: string): number {
  const rows = inputRaw.split("\n")?.filter((i) => i);
  const rowValues = rows.map((row) => getMaxJoltageOfLine(row));
  return rowValues.reduce((a, b) => a + b, 0);
}

function main() {
  console.log("Advent Of Code 2025 Day 3 Part 1");
  const r = calculateMaxJoltage(inputRaw);
  console.log("MAX JOLTAGE:",r);
}

main();
