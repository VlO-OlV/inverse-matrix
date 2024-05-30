import { contextBridge, ipcRenderer } from "electron/renderer"

contextBridge.exposeInMainWorld('electronAPI', {
  onUpdateMatrix: (callback: CallableFunction) => ipcRenderer.on('update-matrix', (_event, initialMatrix: number[][], inversedMatrix: number[][]) => callback(initialMatrix, inversedMatrix)),
  onReadyFile: (callback: CallableFunction) => ipcRenderer.on('ready-file', (_event, isReady: boolean) => callback(isReady)),
  createFile: () => ipcRenderer.send('create-file'),
  getMatrix: (matrix: number[][], matrixMethod: number) => ipcRenderer.send('get-matrix', matrix, matrixMethod),
  getSize: (size: number, matrixMethod: number) => ipcRenderer.send('get-size', size, matrixMethod),
  getFile: (path: string, matrixMethod: number) => ipcRenderer.send('get-file', path, matrixMethod),
});