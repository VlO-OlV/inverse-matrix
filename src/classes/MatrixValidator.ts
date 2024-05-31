import InvalidDataException from "./InvalidDataException";
import Matrix from "./Matrix";

export default class MatrixValidator {

    private matrix: Matrix;

    public constructor(matrix: Matrix) {
        this.matrix = matrix;
    }

    public validate(): void {
        for (let i: number = 0; i < this.matrix.rows; i++) {
            for (let j: number = 0; j < this.matrix.columns; j++) {
                let valueToValidate: number = this.matrix.values[i][j];
                if (!isFinite(valueToValidate) || isNaN(valueToValidate) || valueToValidate < -1000 || valueToValidate > 1000) {
                    throw new InvalidDataException("Invalid matrix input!");
                }
            }
        }
    }
}