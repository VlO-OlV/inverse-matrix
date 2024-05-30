import { app, BrowserWindow, ipcMain } from 'electron';
import Matrix from './components/logic/Matrix';
import FileHandler from './components/logic/FileHandler';
import path from 'node:path';
import JordanGaussMethod from './components/logic/JordanGaussMethod';
import BorderingMethod from './components/logic/BorderingMethod';

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.loadFile(path.join(__dirname, 'index.html'));
    return win;
}

app.whenReady().then(() => {
    const win = createWindow();

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

    ipcMain.on('get-matrix', (event, matrix, matrixMethod) => {
        initialMatrix = new Matrix(matrix);
        [inversedMatrix, difficulty] = matrixMethod == 1 ? jordanGaussMethod.solve(initialMatrix) : borderingMethod.solve(initialMatrix);
        win.webContents.send('update-matrix', initialMatrix.values, inversedMatrix.values);
    });
    ipcMain.on('get-size', (event, size, matrixMethod) => {
        initialMatrix = new Matrix(size, size);
        [inversedMatrix, difficulty] = matrixMethod == 1 ? jordanGaussMethod.solve(initialMatrix) : borderingMethod.solve(initialMatrix);
        win.webContents.send('update-matrix', initialMatrix.values, inversedMatrix.values);
    });
    ipcMain.on('get-file', (event, path, matrixMethod) => {
        initialMatrix = new Matrix(fileHandler.readFile(path));
        [inversedMatrix, difficulty] = matrixMethod == 1 ? jordanGaussMethod.solve(initialMatrix) : borderingMethod.solve(initialMatrix);
        win.webContents.send('update-matrix', initialMatrix.values, inversedMatrix.values);
    });
    ipcMain.on('create-file', (event) => {
        fileHandler.writeData(inversedMatrix.values);
        win.webContents.send('ready-file', true);
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});