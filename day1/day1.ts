import { day1Part2 } from "./day1-part2";
import inputRaw from "./input";
// import inputRaw from './input-mock'

const START_DIAL = 50;

const MIN_DIAL = 0;
const MAX_DIAL = 99;

function parseInputList() {
  const inputStrList = inputRaw
    .split("\n")
    .map((line) => line.trim())
    ?.filter((i) => i);
  const inputNumList = inputStrList.map((line) => {
    const prefixStr = line.slice(0, 1);
    const numberStr = line.slice(1);

    const multiplier = prefixStr === "L" ? -1 : 1;

    const number = parseInt(numberStr);

    return multiplier * number;
  });
  return inputNumList;
}

function day1() {
  console.log("Day 1 of Advent of Code 2025");
  const inputNumList = parseInputList()

  let zeroHit = 0;
  let currVal = START_DIAL;

  inputNumList.forEach((value) => {
    const leftOver = value % 100;
    let newValue = currVal + leftOver;

    if (newValue > MAX_DIAL) {
      newValue = newValue - 100;
    } else if (newValue < MIN_DIAL) {
      newValue = 100 + newValue;
    }

    if (newValue === 0) zeroHit++;

    currVal = newValue;
  });
  console.log("Zero hit: ", zeroHit);
}

day1();
day1Part2()
