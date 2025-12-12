import input from "./input";
// import input from "./input-mock";

function parseInput(): string[] {
  return input.split("\n")?.filter((i) => i);
}

function processRowss(input: string[]): string[] {
  let totalSplits = 0;
  let currentRowIndex = 0;

  let laserIndexes: number[] = [
    input[0].split("").findIndex((char) => char === "S"),
  ];

  for (let row of input) {
    if (currentRowIndex === 0) {
      currentRowIndex++;
      continue;
    }

    const rowChars = row.split("");

    if (currentRowIndex % 2 === 0) {
      // parilliset rivit on ^ rivejä
      const newIndexes: number[] = laserIndexes;
      const splittingCharIndexes = rowChars
        .map((char, index) => {
          if (char === "^") {
            return index;
          }
          return -1;
        })
        .filter((x) => x !== -1);

      rowChars.forEach((char, index) => {
        if (char === "^" && laserIndexes.includes(index)) {
          const previousIndex = index - 1;
          const nextIndex = index + 1;

          newIndexes.push(previousIndex);
          newIndexes.push(nextIndex);
          totalSplits++;
        }
      });
      laserIndexes = [...new Set(newIndexes)].filter(
        (ind) => !splittingCharIndexes.includes(ind)
      );
    }
    // parittomat on tyhjiä mihin tulee beam |
    const replacedChars = rowChars.map((char, index) => {
      if (laserIndexes.includes(index) && char !== "^") {
        return "|";
      }
      return char;
    });
    input[currentRowIndex] = replacedChars.join("");

    currentRowIndex++;
  }
  console.log("TOTAL SPLITS: ", totalSplits);
  return input;
}

function day7() {
  const inputRows = parseInput();
  const processedRows = processRowss(inputRows);
  console.log(processedRows.join("\n"));
}

day7();
