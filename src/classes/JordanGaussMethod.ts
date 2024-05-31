import InvalidDataException from "./InvalidDataException";
import InverseMethod from "./InverseMethod";
import Matrix from "./Matrix";

export default class JordanGaussMethod extends InverseMethod {
    
    public inverse(matrix: Matrix): [Matrix, number] {
        if (matrix.rows != matrix.columns) {
            throw new InvalidDataException("Matrix must be square!");
        } else {
            let [augmentedMatrix, difficulty]: [Matrix, number] = this.getAugmentedMatrix(matrix);

            for (let i: number = 0; i < augmentedMatrix.rows; i++) {
                let diagonalElement: number = augmentedMatrix.values[i][i];
                if (diagonalElement === 0) {
                    for (let k: number = i + 1; k < augmentedMatrix.rows; k++) {
                        difficulty++;
                        if (augmentedMatrix.values[k][i] !== 0) {
                            difficulty++;
                            augmentedMatrix.swapRows(i, k);
                            diagonalElement = augmentedMatrix.values[i][i];
                            break;
                        }
                    }
                }
        
                for (let j: number = 0; j < augmentedMatrix.columns; j++) {
                    difficulty++;
                    let newValue: number = augmentedMatrix.values[i][j] / diagonalElement;
                    augmentedMatrix.setValue(i, j, newValue);
                }
        
                for (let k: number = 0; k < augmentedMatrix.rows; k++) {
                    if (k !== i) {
                        let factor: number = augmentedMatrix.values[k][i];
                        for (let j: number = 0; j < augmentedMatrix.columns; j++) {
                            difficulty++;
                            let newValue: number = augmentedMatrix.values[k][j] - factor * augmentedMatrix.values[i][j];
                            augmentedMatrix.setValue(k, j, newValue);
                        }
                    }
                }
            }

            let [inversedMatrix, extractionDifficulty]: [Matrix, number] = this.extractInversedMatrix(augmentedMatrix);
            if (!isFinite(Math.abs(inversedMatrix.values[0][0]))) {
                throw new InvalidDataException("The matrix is degenerate!");
            }
            difficulty += extractionDifficulty;
            return [inversedMatrix, difficulty];
        }
    }

    private getIdentityMatrix(matrix: Matrix): [Matrix, number] {
        let matrixSize: number = matrix.rows;
        let identityMatrix: Matrix = new Matrix(matrixSize, matrixSize);
        let difficulty: number = 0;
        for (let i: number = 0; i < matrixSize; i++) {
            for (let j: number = 0; j < matrixSize; j++) {
                difficulty++;
                identityMatrix.setValue(i, j, (i == j) ? 1 : 0);
            }
        }
        return [identityMatrix, difficulty];
    }

    private getAugmentedMatrix(matrix: Matrix): [Matrix, number] {
        let [identityMatrix, difficulty]: [Matrix, number] = this.getIdentityMatrix(matrix);
        let augmentedMatrixValues: number[][] = [];
        for (let i: number = 0; i < matrix.rows; i++) {
            augmentedMatrixValues.push(matrix.values[i].concat(identityMatrix.values[i]));
        }
        difficulty += matrix.rows*matrix.rows*2;
        return [new Matrix(augmentedMatrixValues), difficulty];
    }

    private extractInversedMatrix(augmentedMatrix: Matrix): [Matrix, number] {
        let inverseMatrixValues: number[][] = [];
        let difficulty: number = 0;
        for (let i: number = 0; i < augmentedMatrix.rows; i++) {
            inverseMatrixValues.push(augmentedMatrix.values[i].slice(augmentedMatrix.rows));
        }
        difficulty += augmentedMatrix.rows*augmentedMatrix.rows;
        return [new Matrix(inverseMatrixValues), difficulty];
    }
}