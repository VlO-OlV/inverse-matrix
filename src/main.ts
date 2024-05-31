import { app, BrowserWindow, ipcMain } from 'electron';
import Matrix from './classes/Matrix';
import FileHandler from './classes/FileHandler';
import path from 'node:path';
import JordanGaussMethod from './classes/JordanGaussMethod';
import BorderingMethod from './classes/BorderingMethod';
import InvalidDataException from './classes/InvalidDataException';
import MatrixValidator from './classes/MatrixValidator';

const createWindow = () => {
    const win: BrowserWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.loadFile(path.join(__dirname, './view/index.html'));
    return win;
}

app.whenReady().then(() => {
    const win: BrowserWindow = createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });

    let fileHandler: FileHandler = new FileHandler();
    let jordanGaussMethod: JordanGaussMethod = new JordanGaussMethod();
    let borderingMethod: BorderingMethod = new BorderingMethod();

    let initialMatrix: Matrix;
    let inversedMatrix: Matrix;
    let difficulty: number;
    let method: number;

    ipcMain.on('get-matrix', (event, matrix, matrixMethod) => {
        initialMatrix = new Matrix(matrix);
        method = matrixMethod;
        try {
            new MatrixValidator(initialMatrix).validate();
            [inversedMatrix, difficulty] = matrixMethod == 1 ? jordanGaussMethod.inverse(initialMatrix) : borderingMethod.inverse(initialMatrix);
            win.webContents.send('update-matrix', initialMatrix.values, inversedMatrix.values, difficulty);
        } catch (error) {
            win.webContents.send('error', error instanceof InvalidDataException ? error.message : "Error!");
        }
    });

    ipcMain.on('get-size', (event, size, matrixMethod) => {
        initialMatrix = new Matrix(size, size);
        method = matrixMethod;
        try {
            [inversedMatrix, difficulty] = matrixMethod == 1 ? jordanGaussMethod.inverse(initialMatrix) : borderingMethod.inverse(initialMatrix);
            win.webContents.send('update-matrix', initialMatrix.values, inversedMatrix.values, difficulty);
        } catch (error) {
            win.webContents.send('error', error instanceof InvalidDataException ? error.message : "Error!");
        }
    });

    ipcMain.on('get-file', (event, location, matrixMethod) => {
        method = matrixMethod;
        try {
            initialMatrix = fileHandler.readFile(location);
            new MatrixValidator(initialMatrix).validate();
            [inversedMatrix, difficulty] = matrixMethod == 1 ? jordanGaussMethod.inverse(initialMatrix) : borderingMethod.inverse(initialMatrix);
            win.webContents.send('update-matrix', initialMatrix.values, inversedMatrix.values, difficulty);
        } catch(error) {
            win.webContents.send('error', error instanceof InvalidDataException ? error.message : "Error!");
        }
    });

    ipcMain.on('create-file', (event) => {
        try {
            const location = fileHandler.writeData(initialMatrix, inversedMatrix, method, difficulty);
            win.webContents.send('ready-file', location);
        } catch(error) {
            win.webContents.send('error', error instanceof InvalidDataException ? error.message : "Error!");
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});