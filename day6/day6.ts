import input from "./input";
// import input from "./input-mock";




function parseLines(lines: string[][]): string[][] {
    let output: string[][] = []
    let columnIndex = 0;
    let rowIndex = 0;
    while(columnIndex < lines[0].length) {
        let column: string[] = []
        rowIndex = 0;
        while(rowIndex < lines.length) {
            column.push(lines[rowIndex][columnIndex]);
            rowIndex++;
        }
        output.push(column);
        columnIndex++;
    }
    return output;
}

function calculateList(list: string[]): number {
    const symbol = list.pop();
    let numbers = list.map(x => Number(x)).filter(x => !isNaN(x));
    if(symbol === "+") {
        return numbers.reduce((a, b) => a + b, 0);
    } else if(symbol === "*") {
        return numbers.reduce((a, b) => a * b, 1);
    }
    return 0;
}

function calculateColumns(columns: string[][]): number {
    const results: number[] = columns.map(column => calculateList(column));
    return results.reduce((a, b) => a + b, 0);
}


function main() {
    const lines = input.split("\n").map(line => line.trim().split(" ").filter(x => x !== ""));
    const columns = parseLines(lines);
    const result = calculateColumns(columns);
    console.log(result)
}

main()