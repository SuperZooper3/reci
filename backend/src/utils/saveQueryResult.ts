import * as fs from 'fs';

const resultPath = "sql/results/"

export function saveQueryResult(queryName: string, result: object[]) {
    try {
        fs.mkdirSync(resultPath, { recursive: true });

        const keys = Object.keys(result[0]);
        const headerLine = keys.join(",");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const contents = result.map((v: Record<string, any>) => {
            const values = [];
            for (const k of keys) {
                values.push(String(v[k]).replace(/\n/g," "));
            }
            console.log(values);
            return values.join(",");
        }).join("\n"); // ordering here might be sus
        const output = `${headerLine}\n${contents}\n`;
        const path = `${resultPath}${queryName}.out`;
        fs.writeFile(path, output, (err) => {
            if (err) {
                console.error('Error writing to file:',err);
            } else {
                console.log(`${path} written succesfully`);
            }
        });
    } catch (err) {
        console.error('Something went wrong when saving the query result', err)
    }
}
