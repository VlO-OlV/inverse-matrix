import InverseMethod from "./InverseMethod";
import Matrix from "./Matrix";

export default class JordanGaussMethod extends InverseMethod {
    public solve(matrix: Matrix): [Matrix, number] {
        if (matrix.rows != matrix.columns) {
            return [new Matrix(0,0), 0];
        } else {
            let augmentedMatrix: Matrix = this.getAugmentedMatrix(matrix);

            for (let i: number = 0; i < augmentedMatrix.rows; i++) {
                let diagonalElement: number = augmentedMatrix.values[i][i];
                if (diagonalElement === 0) {
                    for (let k: number = i + 1; k < augmentedMatrix.rows; k++) {
                        if (augmentedMatrix.values[k][i] !== 0) {
                            augmentedMatrix.swapRows(i, k);
                            diagonalElement = augmentedMatrix.values[i][i];
                            break;
                        }
                    }
                }
        
                for (let j: number = 0; j < augmentedMatrix.columns; j++) {
                    let newValue: number = augmentedMatrix.values[i][j] / diagonalElement;
                    augmentedMatrix.setValue(i, j, newValue);
                }
        
                for (let k: number = 0; k < augmentedMatrix.rows; k++) {
                    if (k !== i) {
                        let factor: number = augmentedMatrix.values[k][i];
                        for (let j: number = 0; j < augmentedMatrix.columns; j++) {
                            let newValue: number = augmentedMatrix.values[k][j] - factor * augmentedMatrix.values[i][j];
                            augmentedMatrix.setValue(k, j, newValue);
                        }
                    }
                }
            }

            let inversedMatrix: Matrix = this.extractInverseMatrix(augmentedMatrix);
            return [inversedMatrix, 0];
        }
    }

    private getIdentityMatrix(matrix: Matrix): Matrix {
        let matrixSize: number = matrix.rows;
        let identityMatrix: Matrix = new Matrix(matrixSize, matrixSize);
        for (let i: number = 0; i < matrixSize; i++) {
            for (let j: number = 0; j < matrixSize; j++) {
                identityMatrix.setValue(i, j, (i == j) ? 1 : 0);
            }
        }
        return identityMatrix;
    }

    private getAugmentedMatrix(matrix: Matrix): Matrix {
        let identityMatrix: Matrix = this.getIdentityMatrix(matrix);
        let augmentedMatrixValues: number[][] = [];
        for (let i: number = 0; i < matrix.rows; i++) {
            augmentedMatrixValues.push(matrix.values[i].concat(identityMatrix.values[i]));
        }
        return new Matrix(augmentedMatrixValues);
    }

    private extractInverseMatrix(augmentedMatrix: Matrix): Matrix {
        let inverseMatrixValues: number[][] = [];
        for (let i: number = 0; i < augmentedMatrix.rows; i++) {
            inverseMatrixValues.push(augmentedMatrix.values[i].slice(augmentedMatrix.rows));
        }
        return new Matrix(inverseMatrixValues);
    }
}