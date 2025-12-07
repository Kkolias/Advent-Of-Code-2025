import input from "./input";
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

export function getParsedGrid(repeatTillStable = false): string[][] {
  const grid = getParsedInput();

  const columnLength = grid[0].length - 1;
  const rowLength = grid.length - 1;

  let outputGrid = getParsedInput();
  let columnIndex = 0;
  let rowIndex = 0;

  let changesMade = true;
  while ((changesMade = true)) {
    changesMade = false;
    while (rowIndex <= rowLength) {
      while (columnIndex <= columnLength) {
        if ([...outputGrid][rowIndex][columnIndex] === "@") {
          const isPositionForkliftValid = getIsPositionForkliftValid(
            [...outputGrid],
            rowIndex,
            columnIndex
          );

          if (isPositionForkliftValid) {
            outputGrid[rowIndex][columnIndex] = "x";
            changesMade = true;
          }
        }

        columnIndex++;
      }
      columnIndex = 0;

      rowIndex++;
    }
    if (!repeatTillStable) {
      return outputGrid;
    }
    if (!changesMade) {
      // console.log("GRID AFTER FULL ROUND", outputGrid);
      const replacedGrid = replaceXWithDots(outputGrid);
      return replacedGrid;
    }
    const replacedGrid = replaceXWithDots(outputGrid);
    outputGrid = replacedGrid;
    // console.log("GRID AFTER FULL ROUND", outputGrid);
    rowIndex = 0;
  }
  return outputGrid;
}

function replaceXWithDots(grid: string[][]): string[][] {
  return grid.map((row) => row.map((cell: string) => cell.replace("x", ".")));
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

  //   console.log({
  //     hasLeftNeighbours,
  //     hasRightNeighbours,
  //     hasTopNeighbours,
  //     hasBottomNeighbous,
  //   });
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

function getAnswer2(originalGrid: string[][], newGrid: string[][]): number {
  const originalFlat = originalGrid.flat();
  const newFlat = newGrid.flat();

  const originalAtCount = originalFlat.filter((i) => i === "@").length;
  const newAtCount = newFlat.filter((i) => i === "@").length;

  return originalAtCount - newAtCount;
}

function main() {
  console.log("Advent Of Code 2025 Day 4");
  //     const input = getParsedInput();
  //   const a = getIsPositionForkliftValid(input, 1, 0);
  //     console.log("ONKO", a);
  const r = getParsedGrid();
  console.log("Part 1:", getAnwser(r));
  console.log("---------------");

  const originalGrid = getParsedInput();
  const r2 = getParsedGrid(true);
  console.log("Part 2:", getAnswer2(originalGrid, r2));
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
