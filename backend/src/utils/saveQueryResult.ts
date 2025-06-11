import * as fs from 'fs';

const resultPath = "/sql/results/"

export function saveQueryResult(queryName: string, result: object[]) {
    const headerLine = Object.keys(result[0]).join(",");
    const contents = result.map((v) => {Object.values(v).join(",")}).join("\n"); // the ordering may be sus here
    const output = `${headerLine}\n${contents}\n`;
    const path = `${resultPath}${queryName}.out`;
    fs.writeFile(path, output, (err) => {
        if (err) {
            console.error('Error writing to file:',err);
        } else {
            console.log(`${path} written succesfully`);
        }
    });
}
