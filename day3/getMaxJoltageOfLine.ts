export function getMaxJoltageOfLine(numberStr: string): number {
  //   console.log("CALCULATING ROW ------------");
  const numberStrWithoutLast = numberStr.slice(0, numberStr.length - 1);
  const { index, number } = getBiggestNumberAndIndex(numberStrWithoutLast);
  //   console.log("FIRST:", number);

  const slicedStr = numberStr.slice(index + 1);

  const { number: secondNumber } = getBiggestNumberAndIndex(slicedStr);
  //   console.log("SECOND:", secondNumber);

  return Number(`${number}${secondNumber}`);
}

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


// ei toimi vielä oikein
export function getMaxJoltageOfLineV2(numberStr: string) {
  const numberList: number[] = numberStr.split("").map((i) => Number(i));

  const sortedList = [...numberList].sort((a, b) => b - a);

  const firstTwelve = sortedList.slice(0, 12);

  const numbersInOrder: number[] = [];
  console.log(numberList);
  numberList.forEach((value) => {
    const timesInFirstTwelve = firstTwelve.filter((i) => i === value).length;
    const addedCount = numbersInOrder.filter((i) => i === value).length;

    const amountToBeAdded = timesInFirstTwelve - addedCount;
    console.log(value, amountToBeAdded);

    if (amountToBeAdded === 1) {
      numbersInOrder.push(value);
    }
    if (amountToBeAdded > 1) {
      const availableNumbers = getAvailableNumbers(numbersInOrder, firstTwelve);

      const isGreaterValueLater = availableNumbers.some((i) => {
        const indexOfIInNumberList = numberList.indexOf(i);
        const indexOfValueInNumberList = numberList.indexOf(value);
        return i > value && indexOfIInNumberList > indexOfValueInNumberList;
      });
      

      if (isGreaterValueLater) {
        // skip adding this value now
      } else {
        numbersInOrder.push(value);
      }
    }
  });

  const totalStr = numbersInOrder.join("");
  return Number(totalStr);
}

function getAvailableNumbers(numbersInOrder: number[], allNumbers: number[]) {
  const availableNumbers: number[] = [];
  allNumbers.forEach((value) => {
    const timesInOrder = numbersInOrder.filter((i) => i === value).length;
    const timesInAll = allNumbers.filter((i) => i === value).length;
    const timesAdded = availableNumbers.filter((i) => i === value).length;
    if (timesInOrder + timesAdded < timesInAll) {
      availableNumbers.push(value);
    }
  });
  return availableNumbers;
}
