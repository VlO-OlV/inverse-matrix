import Matrix from "./Matrix";

export default abstract class InverseMethod {

    public abstract inverse(matrix: Matrix): [Matrix, number];
    
}