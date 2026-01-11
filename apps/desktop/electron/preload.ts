import { contextBridge, ipcRenderer } from "electron";

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("electronAPI", {
  // App info
  getVersion: () => ipcRenderer.invoke("app:getVersion"),
  getPlatform: () => ipcRenderer.invoke("app:getPlatform"),

  // File system operations (to be implemented)
  readFile: (filePath: string) => ipcRenderer.invoke("fs:readFile", filePath),
  writeFile: (filePath: string, data: string) =>
    ipcRenderer.invoke("fs:writeFile", filePath, data),
  selectFile: (options?: object) => ipcRenderer.invoke("dialog:selectFile", options),
  selectDirectory: (options?: object) =>
    ipcRenderer.invoke("dialog:selectDirectory", options),

  // Window controls
  minimize: () => ipcRenderer.send("window:minimize"),
  maximize: () => ipcRenderer.send("window:maximize"),
  close: () => ipcRenderer.send("window:close"),

  // Event listeners
  onMenuAction: (callback: (action: string) => void) => {
    ipcRenderer.on("menu:action", (_, action) => callback(action));
  },
});

// Type declaration for the exposed API
declare global {
  interface Window {
    electronAPI: {
      getVersion: () => Promise<string>;
      getPlatform: () => Promise<NodeJS.Platform>;
      readFile: (filePath: string) => Promise<string>;
      writeFile: (filePath: string, data: string) => Promise<void>;
      selectFile: (options?: object) => Promise<string | null>;
      selectDirectory: (options?: object) => Promise<string | null>;
      minimize: () => void;
      maximize: () => void;
      close: () => void;
      onMenuAction: (callback: (action: string) => void) => void;
    };
  }
}
