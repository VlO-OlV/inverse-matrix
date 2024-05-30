function multiplyMatrices(A, B) {
    const rowsA = A.length, colsA = A[0].length;
    const rowsB = B.length, colsB = B[0].length;
    if (colsA !== rowsB) throw new Error("Matrices are not compatible for multiplication.");

    let C = Array(rowsA).fill(null).map(() => Array(colsB).fill(0));
    for (let i = 0; i < rowsA; i++) {
        for (let j = 0; j < colsB; j++) {
            for (let k = 0; k < colsA; k++) {
                C[i][j] += A[i][k] * B[k][j];
            }
        }
    }
    return C;
}

// Helper function to subtract two matrices
function subtractMatrices(A, B) {
    const rows = A.length, cols = A[0].length;
    let C = Array(rows).fill(null).map(() => Array(cols).fill(0));
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            C[i][j] = A[i][j] - B[i][j];
        }
    }
    return C;
}

function addMatrices(A, B) {
    const rows = A.length, cols = A[0].length;
    let C = Array(rows).fill(null).map(() => Array(cols).fill(0));
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            C[i][j] = A[i][j] + B[i][j];
        }
    }
    return C;
}

function multiplyByConstant(M, number) {
    let C = M.slice(0);
    for (let i = 0; i < C.length; i++) {
        for (let j = 0; j < C[0].length; j++) {
            C[i][j] *= number;
        }
    }
    return C;
}

function inverse2x2(M) {
    const [[a, b], [c, d]] = M;
    const det = a * d - b * c;
    if (det === 0) throw new Error("Matrix is not invertible.");

    const invDet = 1 / det;
    return [
        [d * invDet, -b * invDet],
        [-c * invDet, a * invDet]
    ];
}

function inverseMatrix(M) {
    let inverse = M.slice(0, M.length-1).map((row) => row.slice(0, row.length-1));
    if (M.length == 3) {
        inverse = inverse2x2(inverse);
    } else {
        inverse = inverseMatrix(inverse);
    }
    let u = [];
    let v = [M[M.length-1].slice(0, M.length-1)];
    let a = M[M.length-1][M.length-1];

    for (let i = 0; i < M.length-1; i++) {
        u.push([M[i][M.length-1]]);
    }

    let alpha = a - multiplyMatrices(multiplyMatrices(v, inverse), u)[0][0];
    let topLeft = addMatrices(inverse, multiplyByConstant(multiplyMatrices(multiplyMatrices(multiplyMatrices(inverse, u), v), inverse), 1/alpha));
    //console.log(multiplyByConstant(multiplyMatrices(multiplyMatrices(multiplyMatrices(inverse, u), v), inverse), 1/alpha));
    //console.log(topLeft);
    const topRight = multiplyByConstant(multiplyMatrices(inverse, u), -1/alpha);
    //console.log(topRight);
    const bottomLeft = multiplyByConstant(multiplyMatrices(v, inverse), -1/alpha);
    //console.log(bottomLeft);
    const bottomRight = 1/alpha;
    //console.log(bottomRight);

    for (let i = 0; i < topLeft.length; i++) {
        topLeft[i] = topLeft[i].concat(topRight[i]);
    }
    topLeft.push(bottomLeft[0].concat([bottomRight]));
    return topLeft;
}

let matrix = [
    [32, 9, -5],
    [-17, 11, 15],
    [8, -1, 3]
];

let a = [[1], [2], [3]];
let b = [[4, 5, 6]];

let d = 13;

console.log(inverseMatrix(matrix));