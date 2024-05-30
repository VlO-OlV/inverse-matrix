function gaussJordan(matrix) {
    let n = matrix.length;
    
    // Create an identity matrix
    let identityMatrix = [];
    for (let i = 0; i < n; i++) {
        identityMatrix[i] = [];
        for (let j = 0; j < n; j++) {
            identityMatrix[i][j] = (i === j) ? 1 : 0;
        }
    }

    // Augment the matrix with the identity matrix
    for (let i = 0; i < n; i++) {
        matrix[i] = matrix[i].concat(identityMatrix[i]);
    }

    // Apply Gauss-Jordan Elimination
    for (let i = 0; i < n; i++) {
        // Make the diagonal contain all 1's
        let diagonalElement = matrix[i][i];
        if (diagonalElement === 0) {
            for (let k = i + 1; k < n; k++) {
                if (matrix[k][i] !== 0) {
                    // Swap rows
                    [matrix[i], matrix[k]] = [matrix[k], matrix[i]];
                    diagonalElement = matrix[i][i];
                    break;
                }
            }
        }

        for (let j = 0; j < 2 * n; j++) {
            matrix[i][j] /= diagonalElement;
        }

        // Make the other elements in the column 0
        for (let k = 0; k < n; k++) {
            if (k !== i) {
                let factor = matrix[k][i];
                for (let j = 0; j < 2 * n; j++) {
                    matrix[k][j] -= factor * matrix[i][j];
                }
            }
        }
    }

    // Extract the inverse matrix from the augmented matrix
    let inverseMatrix = [];
    for (let i = 0; i < n; i++) {
        inverseMatrix[i] = matrix[i].slice(n, 2 * n);
    }

    return inverseMatrix;
}

// Example usage:
let matrix = [
    [32, 9, -5],
    [-17, 11, 15],
    [8, -1, 3]
];

let inverse = gaussJordan(matrix);
console.log(inverse);