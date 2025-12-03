export function isNumberInvalidId(numberStr: string): boolean {
  const strLength = numberStr.length;

  if (strLength % 2 !== 0) {
    return false;
  }

  const halfPoint = strLength / 2;

  const firstHalf = numberStr.slice(0, halfPoint);
  const lastHalf = numberStr.slice(halfPoint);

  return firstHalf === lastHalf;
}

export function isNumberInvalidV2(numberStr: string): boolean {
  const strLength = numberStr.length;
  if (strLength === 1) return false;

  // if(strLength % 2 !== 0) {
  //     const splitted =
  // }

  let divider = 1;
  while (true) {
    const regex = new RegExp(`.{1,${divider}}`, "g");
    const list: string[] | null = numberStr.match(regex);
    // console.log("LIST", list);
    if (!list) return false;
    const firstValue = list[0];
    const everyItemSame = list?.every((i) => i === firstValue);
    if (everyItemSame) return true;

    const nextDivider = getNextDivier(divider, strLength);
    if (nextDivider === null) return false;
    divider = nextDivider;
  }
}

function getNextDivier(curDivider: number, strLength: number): number | null {
  const nextDivider = curDivider + 1;
  if (nextDivider >= strLength) return null;
  if (strLength % nextDivider === 0) return nextDivider;
  return getNextDivier(nextDivider, strLength);
}
