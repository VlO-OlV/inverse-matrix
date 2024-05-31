import { contextBridge, ipcRenderer } from "electron/renderer"

contextBridge.exposeInMainWorld('electronAPI', {
  onUpdateMatrix: (callback: CallableFunction) => ipcRenderer.on('update-matrix', (_event, initialMatrix: number[][], inversedMatrix: number[][], difficulty: number) => callback(initialMatrix, inversedMatrix, difficulty)),
  onReadyFile: (callback: CallableFunction) => ipcRenderer.on('ready-file', (_event, location: string) => callback(location)),
  onError: (callback: CallableFunction) => ipcRenderer.on('error', (_event, message: string) => callback(message)),
  createFile: () => ipcRenderer.send('create-file'),
  getMatrix: (matrix: number[][], matrixMethod: number) => ipcRenderer.send('get-matrix', matrix, matrixMethod),
  getSize: (size: number, matrixMethod: number) => ipcRenderer.send('get-size', size, matrixMethod),
  getFile: (location: string, matrixMethod: number) => ipcRenderer.send('get-file', location, matrixMethod),
});