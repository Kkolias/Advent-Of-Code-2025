import input from "./input"
// import input from "./input-mock";
/* 
example:
..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.

result:
..xx.xx@x.
x@@.@.@.@@
@@@@@.x.@@
@.@@@@..@.
x@.@@@@.@x
.@@@@@@@.@
.@.@.@.@@@
x.@@@.@@@@
.@@@@@@@@.
x.x.@@@.x.
*/

export function getParsedGrid() {
  const grid = getParsedInput();

  const columnLength = grid[0].length - 1;
  const rowLength = grid.length - 1;

  const outputGrid = getParsedInput();
  let columnIndex = 0;
  let rowIndex = 0;
  while (rowIndex <= rowLength) {
    while (columnIndex <= columnLength) {
      if (grid[rowIndex][columnIndex] === "@") {
        const isPositionForkliftValid = getIsPositionForkliftValid(
          grid,
          rowIndex,
          columnIndex
        );
        // console.log({
        //   rowIndex,
        //   columnIndex,
        //   isPositionForkliftValid,
        // });
        if (isPositionForkliftValid) {
          outputGrid[rowIndex][columnIndex] = "x";
        }
      }

      columnIndex++;
    }
    columnIndex = 0;
    // console.log("ROW OUTPUT:", outputGrid[rowIndex]);
    // console.log("INPUT ROW:", grid[rowIndex]);
    rowIndex++;
  }
  // console.log("FIRST ROW OUTPUT:", outputGrid[0]);
  return outputGrid;
}

function getParsedInput(): string[][] {
  const lines = input.split("\n");
  return lines.map((i) => i.split(""));
}

function getNeighbourValuesOfPosition(
  grid: string[][],
  rowIndex: number, // row index
  columnIndex: number // column index
): string[] {
  const hasLeftNeighbours = columnIndex > 0;
  const hasRightNeighbours = columnIndex < grid[0].length - 1;
  const hasTopNeighbours = rowIndex > 0;
  const hasBottomNeighbous = rowIndex < grid.length - 1;

  // esim [
  // [., @, @], rowIndex 0
  // [@, @, .], rowIndex 1
  // [., ., @], rowIndex 2
  // ]

  //   console.log({
  //     hasLeftNeighbours,
  //     hasRightNeighbours,
  //     hasTopNeighbours,
  //     hasBottomNeighbous,
  //   });
  // left side
  let topLeft = null;
  let top = null;
  let topRight = null;
  let left = null;
  let right = null;
  let bottomleft = null;
  let bottom = null;
  let bottomRight = null;
  if (hasTopNeighbours) {
    if (hasLeftNeighbours) {
      topLeft = grid[rowIndex - 1][columnIndex - 1];
    }
    top = grid[rowIndex - 1][columnIndex];
    if (hasRightNeighbours) {
      topRight = grid[rowIndex - 1][columnIndex + 1];
    }
  }
  if (hasLeftNeighbours) {
    left = grid[rowIndex][columnIndex - 1];
  }
  if (hasRightNeighbours) {
    right = grid[rowIndex][columnIndex + 1];
  }
  if (hasBottomNeighbous) {
    if (hasLeftNeighbours) {
      bottomleft = grid[rowIndex + 1][columnIndex - 1];
    }
    bottom = grid[rowIndex + 1][columnIndex];
    if (hasRightNeighbours) {
      bottomRight = grid[rowIndex + 1][columnIndex + 1];
    }
  }

  //   console.log({
  //     topLeft,
  //     top,
  //     topRight,
  //     left,
  //     right,
  //     bottomleft,
  //     bottom,
  //     bottomRight,
  //   });
  return [
    topLeft,
    top,
    topRight,
    left,
    right,
    bottomleft,
    bottom,
    bottomRight,
  ].filter((i) => i !== null);
}

function getIsPositionForkliftValid(
  grid: string[][],
  rowIndex: number,
  columnIndex: number
): boolean {
  const neighbourValues = getNeighbourValuesOfPosition(
    grid,
    rowIndex,
    columnIndex
  );
  const rollAmount = neighbourValues.filter((i) => i === "@").length;
  return rollAmount < 4;
}

function getAnwser(parsedGrid: string[][]): number {
  const flatted = parsedGrid.flat();
  const xCount = flatted.filter((i) => i === "x").length;
  return xCount;
}

function main() {
  console.log("Advent Of Code 2025 Day 4 Part 1");
  //     const input = getParsedInput();
  //   const a = getIsPositionForkliftValid(input, 1, 0);
  //     console.log("ONKO", a);
  const r = getParsedGrid();
  //   return r;
  console.log(getAnwser(r));
  //   console.log(input);
}

main();
/* 
example:
..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.

*/
