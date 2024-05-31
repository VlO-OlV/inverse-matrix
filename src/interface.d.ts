export interface IElectronAPI {
    onUpdateMatrix: (callback: CallableFunction) => Promise<void>,
    onReadyFile: (callback: CallableFunction) => Promise<void>,
    onError: (callback: CallableFunction) => Promise<void>,
    createFile: () => Promise<void>,
    getMatrix: (matrix: number[][], matrixMethod: number) => Promise<void>,
    getSize: (size: number, matrixMethod: number) => Promise<void>,
    getFile: (path: string, matrixMethod: number) => Promise<void>,
}
  
declare global {
    interface Window {
        electronAPI: IElectronAPI
    }
}