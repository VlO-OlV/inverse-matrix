import fs from 'node:fs'
import path from 'node:path'

export default class FileHandler {
    public readFile(path: string): number[][] {
        let input: string[];
        let matrix: number[][];
        try {
            input = fs.readFileSync(`${path}`, 'utf8').split('\n');
        } catch(error) {
            console.log(error);
            return [[]];
        }
        matrix = input.map((row) => row.split(' ').map((elem) => parseInt(elem)));
        return matrix;
    }

    public writeData(matrix: number[][]): string {
        const data: string = matrix.map((row) => row.map((elem) => elem.toString()).join(' ')).join('\n');
        const location = path.join(__dirname, "inversed_matrix_results/matrix.txt")
        try {
            fs.writeFileSync(`${location}`, data);
            return location;
        } catch (err) {
            console.error(err);
            return "";
        }
    }
}