import input from "./input";
//  import input from './input-mock'

function getParsedInput(): {
  rangeList: { start: number; end: number }[];
  idList: number[];
} {
  const splitted = input.split("\n").filter((i) => i);

  const rangeStrList = splitted.filter((i) => i.includes("-"));
  const idStrList = splitted.filter((i) => !i.includes("-"));

  const idList = idStrList.map(Number);

  const rangeList: { start: number; end: number }[] = rangeStrList.map(
    (rangeStr) => {
      const [startStr, endStr] = rangeStr.split("-");
      return { start: Number(startStr), end: Number(endStr) };
    }
  );

  return {
    idList,
    rangeList,
  };
}

function getAnswer1(
  rangeList: { start: number; end: number }[],
  idList: number[]
): number[] {
  const validList: number[] = [];

  idList.forEach((id) => {
    let isValid = false;
    for (let i = 0; i < rangeList.length; i++) {
      const range = rangeList[i];
      if (id >= range.start && id <= range.end) {
        isValid = true;
        break;
      }
    }
    if (isValid) {
      validList.push(id);
    }
  });
  return validList;
}

function getNotOverlappingRanges(
    rangeList: { start: number; end: number }[]
): { start: number; end: number }[] {
    const sortedRanges = rangeList.sort((a, b) => a.start - b.start);
    const mergedRanges: { start: number; end: number }[] = [];

    for (const currentRange of sortedRanges) {
        if (mergedRanges.length === 0) {
            mergedRanges.push(currentRange);
        } else {
            const lastMergedRange = mergedRanges[mergedRanges.length - 1];
            if (currentRange.start <= lastMergedRange.end) {
                lastMergedRange.end = Math.max(lastMergedRange.end, currentRange.end);
            } else {
                mergedRanges.push(currentRange);
            }
        }
    }
    return mergedRanges;
}

function getAnswer2(
    notOverlappingRanges: { start: number; end: number }[]
): number {
    let coveredCount = 0;
    for (const range of notOverlappingRanges) {
        coveredCount += (range.end - range.start + 1);
    }
    return coveredCount;
}

function main() {
  console.log("Advent of Code 2025 - Day 5");
  console.time("part1ExecuteTime");
  console.log("Part 1:");
  const parsedInput = getParsedInput();
//   console.log(parsedInput);
  const validList = getAnswer1(parsedInput.rangeList, parsedInput.idList);
  console.log("Answer", validList.length);
  console.timeEnd("part1ExecuteTime");

    console.time("part2ExecuteTime");
    console.log("---------------");
    console.log("Part 2:");
    const nonOverlappingRanges = getNotOverlappingRanges(parsedInput.rangeList);
    // console.log("Non-overlapping Ranges:", nonOverlappingRanges);
    const answer2 = getAnswer2(nonOverlappingRanges);
    console.log("Answer", answer2);
    console.timeEnd("part2ExecuteTime");
}

main();
