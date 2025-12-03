import inputRaw from "./input";
// import inputRaw from '../day1/input-mock'

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

export function day1Part2() {
  console.log("Day 1 PART 2 of Advent of Code 2025");
  const inputNumList = parseInputList();

  let zeroHit = 0;
  let currVal = START_DIAL;

  inputNumList.forEach((value) => {
    const leftOver = value % 100;
    let newValue = currVal + leftOver;

    const fullHundreds = Math.abs(value - leftOver);
    let zeroHitTimesDuringRotation = fullHundreds / 100;

    if (newValue > MAX_DIAL) {
      if (newValue !== 100) zeroHitTimesDuringRotation++;
      newValue = newValue - 100;
    } else if (newValue < MIN_DIAL) {
      if (newValue !== 0 && currVal !== 0) zeroHitTimesDuringRotation++;
      newValue = 100 + newValue;
    }

    let zerosHitThisLoop = 0;
    if (newValue === 0) zerosHitThisLoop++;
    // if(newValue !== 0) {
    zerosHitThisLoop += zeroHitTimesDuringRotation;
    // }
    zeroHit += zerosHitThisLoop;

    if (zerosHitThisLoop < 0) {
      throw Error("zeros hit cannot be negative");
    }
    currVal = newValue;
  });
  console.log("Zero hit: ", zeroHit);
}
