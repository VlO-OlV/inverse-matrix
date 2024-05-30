export default class Matrix {
    private _values: number[][];
    private _rows: number;
    private _columns: number;

    public get values() {
        return this._values;
    }

    public setValue(row: number, column: number, newValue: number) {
        if (row >= 0 && row <= this._rows && column >= 0 && column <= this._columns) {
            this._values[row][column] = newValue;
        } else {

        }
    }

    public get rows() {
        return this._rows;
    }

    public get columns() {
        return this._columns;
    }

    constructor (rows: number, columns: number);
    constructor (matrix: number[][]);
    constructor (firstParam?: number[][] | number, secondParam?: number) {
        if (firstParam instanceof Array) {
            this._values = firstParam;
            this._rows = firstParam.length;
            this._columns = firstParam[0].length;
        } else {
            let generatedValues: number[][] = this.generateMatrix(firstParam ?? Math.ceil(Math.random() * 10), secondParam ?? Math.ceil(Math.random() * 10));
            this._values = generatedValues;
            this._rows = firstParam as number;
            this._columns = secondParam as number;
        }
    }

    private generateMatrix(rows: number, columns: number): number[][] {
        let matrix: number[][] = [];
        for (let i: number = 0; i < rows; i++) {
            let row: number[] = [];
            for (let j: number = 0; j < columns; j++) {
                row.push(Math.floor(Math.random() * 101 * Math.pow(-1, Math.ceil(Math.random() * 2))));
            }
            matrix.push(row);
        }
        return matrix;
    }

    public add(matrixToAdd: Matrix): Matrix {
        if (matrixToAdd.rows != this._rows || matrixToAdd.columns != this._columns) {
            return new Matrix(0, 0);
        } else {
            let resultMatrix: Matrix = new Matrix(this._rows, this._columns);
            for (let i: number = 0; i < this._rows; i++) {
                for (let j: number = 0; j < this._columns; j++) {
                    let newValue: number = this._values[i][j] + matrixToAdd.values[i][j];
                    resultMatrix.setValue(i, j, newValue);
                }
            }
            return resultMatrix;
        }
    }

    public substract(matrixToSub: Matrix): Matrix {
        if (matrixToSub.rows != this._rows || matrixToSub.columns != this._columns) {
            return new Matrix(0, 0);
        } else {
            let resultMatrix: Matrix = new Matrix(this._rows, this._columns);
            for (let i: number = 0; i < this._rows; i++) {
                for (let j: number = 0; j < this._columns; j++) {
                    let newValue: number = this._values[i][j] - matrixToSub.values[i][j];
                    resultMatrix.setValue(i, j, newValue);
                }
            }
            return resultMatrix;
        }
    }

    public multiply(matrixToMul: Matrix): Matrix {
        if (matrixToMul.rows != this._columns) {
            return new Matrix(0, 0);
        } else {
            let resultMatrix: Matrix = new Matrix(this._rows, matrixToMul.columns);
            for (let i: number = 0; i < this._rows; i++) {
                for (let j: number = 0; j < matrixToMul.columns; j++) {
                    let newValue: number = 0;
                    for (let k: number = 0; k < this._columns; k++) {
                        newValue += this._values[i][k] * matrixToMul.values[k][j];
                    }
                    resultMatrix.setValue(i, j, newValue);
                }
            }
            return resultMatrix;
        }
    }

    public multiplyByConst(number: number): Matrix {
        let resultMatrix: Matrix = new Matrix(this._rows, this._columns);
        for (let i: number = 0; i < this._rows; i++) {
            for (let j: number = 0; j < this._columns; j++) {
                resultMatrix.setValue(i, j, this._values[i][j] * number);
            }
        }
        return resultMatrix;
    }

    public swapRows(firstRow: number, secondRow: number): void {
        [this._values[firstRow], this._values[secondRow]] = [this._values[secondRow], this._values[firstRow]];
    }
}