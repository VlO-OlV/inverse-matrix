import fs from 'node:fs'
import path from 'node:path'
import Matrix from './Matrix';
import InvalidDataException from './InvalidDataException';

export default class FileHandler {
    public readFile(location: string): Matrix {
        let input: string[];
        let matrix: number[][];
        try {
            input = fs.readFileSync(`${location}`, 'utf8').split('\n');
        } catch(error) {
            throw new InvalidDataException("This file doesn't exist!");
        }
        matrix = input.map((row) => row.split(' ').map((elem) => parseFloat(parseFloat(elem).toFixed(3))));
        return new Matrix(matrix);
    }

    public writeData(initialMatrix: Matrix, inversedMatrix: Matrix, method: number, difficulty: number): string {
        let data: string = "Initial matrix:\n\n";
        data += initialMatrix.values.map((row) => row.map((elem) => elem.toString()).join(' ')).join('\n');
        data += "\n\nInversed matrix:\n\n";
        data += inversedMatrix.values.map((row) => row.map((elem) => elem.toString()).join(' ')).join('\n');
        data += `\n\nAlgorithm: ${method == 1 ? "Jordan-Gauss method" : "Bordering method"}\nDifficulty: ${difficulty}`;
        const id: string = this.generateId();
        const location: string = path.resolve(__dirname, `../saved_matrixes/matrix_${id}.txt`);
        try {
            fs.writeFileSync(`${location}`, data);
            return location;
        } catch (err) {
            throw new InvalidDataException("This file doesn't exist!");
        }
    }

    private generateId(): string {
        const date: Date = new Date();
        const id: string = date.getDay().toString() + date.getMonth().toString() + date.getFullYear().toString() + "_" + date.getHours().toString() + date.getMinutes().toString() + date.getSeconds().toString();
        return id;
    }
}