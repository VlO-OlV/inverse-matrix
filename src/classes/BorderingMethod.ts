import InvalidDataException from "./InvalidDataException";
import InverseMethod from "./InverseMethod";
import Matrix from "./Matrix";

export default class BorderingMethod extends InverseMethod {

    public inverse(matrix: Matrix): [Matrix, number] {
        if (matrix.rows != matrix.columns) {
            throw new InvalidDataException("Matrix must be square!");
        } else {
            if (matrix.rows === 2) {
                return [this.inverseDoubleMatrix(matrix), 4];
            }
            let difficulty: number = (matrix.rows-1)*(matrix.rows-1);
            let insideMatrixValues: number[][] = matrix.values.slice(0, matrix.rows-1);

            for (let i: number = 0; i < matrix.rows-1; i++) {
                insideMatrixValues[i] = insideMatrixValues[i].slice(0, matrix.columns-1);
            }

            let matrixToInverse: Matrix = new Matrix(insideMatrixValues);

            if (matrix.rows === 3) {
                matrixToInverse = this.inverseDoubleMatrix(matrixToInverse);
                difficulty += 4;
            } else {
                let nestedDifficulty: number;
                [matrixToInverse, nestedDifficulty] = this.inverse(matrixToInverse);
                difficulty += nestedDifficulty;
            }

            let uValues: number[][] = [];

            for (let i: number = 0; i < matrix.rows-1; i++) {
                uValues.push([matrix.values[i][matrix.columns-1]]);
                difficulty++;
            }

            let u: Matrix = new Matrix(uValues);
            let v: Matrix = new Matrix([matrix.values[matrix.rows-1].slice(0, matrix.rows-1)]);
            let a: number = matrix.values[matrix.rows-1][matrix.columns-1];

            difficulty += matrix.rows-1;

            let alpha: number = a - v.multiply(matrixToInverse).multiply(u).values[0][0];
            if (parseInt(alpha.toFixed(5)) == 0) {
                throw new InvalidDataException("The matrix is degenerate!");
            }
            difficulty += v.rows * matrixToInverse.columns + 1;

            let topLeft: Matrix = matrixToInverse.add(matrixToInverse.multiply(u).multiply(v).multiply(matrixToInverse).multiplyByConst(1/alpha));
            difficulty += 4 * Math.pow(matrixToInverse.rows, 2) + Math.pow(matrixToInverse.rows, 3);
            let topRight: Matrix = matrixToInverse.multiply(u).multiplyByConst(-1/alpha);
            let bottomLeft: Matrix = v.multiply(matrixToInverse).multiplyByConst(-1/alpha);
            difficulty += 2 * (Math.pow(matrixToInverse.rows, 2) + matrixToInverse.rows);
            let bottomRight: number = 1/alpha; 

            let inversedMatrixValues: number[][] = [];
            for (let i: number = 0; i < topLeft.rows; i++) {
                inversedMatrixValues.push(topLeft.values[i].concat(topRight.values[i]));
            }
            inversedMatrixValues.push(bottomLeft.values[0].concat([bottomRight]));
            difficulty += Math.pow(inversedMatrixValues.length, 2);

            matrixToInverse = new Matrix(inversedMatrixValues);
            return [matrixToInverse, difficulty];
        }
    }

    private inverseDoubleMatrix(matrix: Matrix): Matrix {
        let [[a, b], [c, d]]: number[][] = matrix.values;
        let det: number = a * d - b * c;
        if (det === 0) {
            throw new InvalidDataException("The matrix is degenerate!");
        } else {
            return new Matrix([[d / det, -b / det], [-c / det, a / det]]);
        }
    }
}