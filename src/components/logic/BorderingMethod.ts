import InverseMethod from "./InverseMethod";
import Matrix from "./Matrix";

export default class BorderingMethod extends InverseMethod {
    public solve(matrix: Matrix): [Matrix, number] {
        if (matrix.rows != matrix.columns) {
            return [new Matrix(0,0), 0];
        } else {
            let inverseValues: number[][] = matrix.values.slice(0, matrix.rows-1);
            for (let i: number = 0; i < matrix.rows-1; i++) {
                inverseValues[i] = inverseValues[i].slice(0, matrix.columns-1);
            }
            let matrixToInverse: Matrix = new Matrix(inverseValues);
            if (matrix.rows === 3) {
                matrixToInverse = this.inverseDoubleMatrix(matrixToInverse);
            } else {
                matrixToInverse = this.solve(matrixToInverse)[0];
                if (matrixToInverse.rows == 0) {
                    return [new Matrix(0,0), 0];
                }
            }

            let uValues: number[][] = [];

            for (let i: number = 0; i < matrix.rows-1; i++) {
                uValues.push([matrix.values[i][matrix.columns-1]]);
            }
            let u: Matrix = new Matrix(uValues);
            let v: Matrix = new Matrix([matrix.values[matrix.rows-1].slice(0, matrix.rows-1)]);
            let a: number = matrix.values[matrix.rows-1][matrix.columns-1];

            let alpha: number = a - v.multiply(matrixToInverse).multiply(u).values[0][0];
            if (parseInt(alpha.toFixed(5)) == 0) {
                return [new Matrix(0,0), 0];
            }
            let topLeft: Matrix = matrixToInverse.add(matrixToInverse.multiply(u).multiply(v).multiply(matrixToInverse).multiplyByConst(1/alpha));
            let topRight: Matrix = matrixToInverse.multiply(u).multiplyByConst(-1/alpha);
            let bottomLeft: Matrix = v.multiply(matrixToInverse).multiplyByConst(-1/alpha);
            let bottomRight: number = 1/alpha;

            let inversedMatrixValues: number[][] = [];
            for (let i: number = 0; i < topLeft.rows; i++) {
                inversedMatrixValues.push(topLeft.values[i].concat(topRight.values[i]));
            }
            inversedMatrixValues.push(bottomLeft.values[0].concat([bottomRight]));
            matrixToInverse = new Matrix(inversedMatrixValues);
            return [matrixToInverse, 0];
        }
    }

    private inverseDoubleMatrix(matrix: Matrix): Matrix {
        let [[a, b], [c, d]]: number[][] = matrix.values;
        let det: number = a * d - b * c;
        if (det === 0) {
            return new Matrix(0,0);
        } else {
            return new Matrix([[d / det, -b / det], [-c / det, a / det]]);
        }
    }
}