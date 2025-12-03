// import inputRaw from "./input-mock";
import inputRaw from "./input";
import { isNumberInvalidId, isNumberInvalidV2 } from "./isNumberInvalidId";

function getInvalidListWithValidationFunction(isInvalidFunction: Function) {
  const listRaw = inputRaw.split(",");

  const fromToList: { from: number; to: number }[] = listRaw.map((i) => {
    const splitted = i.split("-");
    return {
      from: Number(splitted[0]),
      to: Number(splitted[1]),
    };
  });

  const listOfinvalidIdLists = fromToList.map(({ from, to }) =>
    getInvalidIdsOfRange(from, to, isInvalidFunction)
  );
  const invalidIdLists = listOfinvalidIdLists.flat();
  const summaryOfIds = getSummaryOfInvalidIds(invalidIdLists);

  return summaryOfIds;
}

function getInvalidIdsOfRange(
  from: number,
  to: number,
  isInvalidFunction: Function
) {
  let invalidIds: number[] = [];

  let curVal = from;
  while (curVal <= to) {
    const isCurrentInvalid = isInvalidFunction(String(curVal));
    if (isCurrentInvalid) {
      invalidIds.push(curVal);
    }

    curVal++;
  }
  return invalidIds;
}

function getSummaryOfInvalidIds(idList: number[]): number {
  return idList.reduce((acc, curr) => acc + curr, 0);
}

function main() {
  console.log("Advent of Code 2025 Day 2");
  console.time("executeTimePart1");
  const r1 = getInvalidListWithValidationFunction(isNumberInvalidId);
  console.log("ANSWER PART 1:", r1);
  console.timeEnd("executeTimePart1");

  console.time("executeTimePart2");
  const r2 = getInvalidListWithValidationFunction(isNumberInvalidV2);
  console.log("ANSWER PART 2:", r2);
  console.timeEnd("executeTimePart2");
}

main();
