import Matrix from "./components/logic/Matrix";
import JordanGaussMethod from "./components/logic/JordanGaussMethod";
import BorderingMethod from "./components/logic/BorderingMethod";

let matrixValues: number[][] = [
    [88, 24, -17, -28, -70, -50, 3],
    [4, -1, 85, 34, -45, 63, -80],
    [36, -36, -32, -78, 63, -17, 8],
    [13, -48, -93, -15, 10, -32, -75],
    [100, -13, -75, -20, -79, -29, 1],
    [42, 60, 65, 20, 53, 98, 98],
    [93, -101, 66, 40, 19, -71, -45]
];

let matrix: Matrix = new Matrix([[1, 2, 3],[4, 5, 6],[7, 8, 9]]);
let method: BorderingMethod = new BorderingMethod();
let result: Matrix = method.solve(matrix)[0];
console.log(result.values);