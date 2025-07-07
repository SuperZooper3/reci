import * as fs from 'fs';
import { QueryResultWithDuration } from './query.js';

const resultPath = "sql/results/"

export function saveQueryResult(queryName: string, result: QueryResultWithDuration) {
    try {
        fs.mkdirSync(resultPath, { recursive: true });

        let output = '';

        if (!result || result.rows.length === 0) {
            output = 'Query returned no results\n';
        }
        else {
            const keys = Object.keys(result.rows[0]);
            const headerLine = keys.join(",");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const contents = result.rows.map((v: Record<string, any>) => {
                const values = [];
                for (const k of keys) {
                    values.push(String(v[k]).replace(/\n/g," "));
                }
                return values.join(",");
            }).join("\n"); // ordering here might be sus
            output = `${headerLine}\n${contents}\n`;
        }

        const path = `${resultPath}${queryName}.out`;
        fs.writeFile(path, output, (err) => {
            if (err) {
                console.error('Error writing to file:',err);
            } else {
                console.log(`${path} written succesfully`);
            }
        });

        const logLine = `${new Date().toISOString()}, ${result.duration} ms, ${result.rowCount} rows\n`;
        const logPath = `${resultPath}${queryName}.log`;

        fs.appendFileSync(logPath, logLine);
    } catch (err) {
        console.error('Something went wrong when saving the query result', err)
    }
}
