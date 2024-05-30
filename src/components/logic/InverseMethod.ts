import Matrix from "./Matrix";

export default abstract class InverseMethod {
    public abstract solve(matrix: Matrix): [Matrix, number];
}