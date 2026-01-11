import { contextBridge, ipcRenderer } from "electron";

/**
 * Preload script for Electron
 * Exposes safe APIs to the renderer process via contextBridge
 */

// Type definitions for exposed APIs
export interface ElectronAPI {
  platform: NodeJS.Platform;
  versions: {
    node: string;
    chrome: string;
    electron: string;
  };
  ipc: {
    send: (channel: string, ...args: unknown[]) => void;
    invoke: <T = unknown>(channel: string, ...args: unknown[]) => Promise<T>;
    on: (channel: string, listener: (...args: unknown[]) => void) => () => void;
  };
}

// Allowed IPC channels for security
const ALLOWED_SEND_CHANNELS = ["app:ready", "window:minimize", "window:close"];
const ALLOWED_INVOKE_CHANNELS = [
  "fs:read-file",
  "fs:write-file",
  "fs:exists",
  "dialog:open-file",
  "dialog:save-file",
];
const ALLOWED_RECEIVE_CHANNELS = ["app:update-available", "app:error"];

const electronAPI: ElectronAPI = {
  platform: process.platform,
  versions: {
    node: process.versions.node,
    chrome: process.versions.chrome,
    electron: process.versions.electron,
  },
  ipc: {
    send: (channel: string, ...args: unknown[]) => {
      if (ALLOWED_SEND_CHANNELS.includes(channel)) {
        ipcRenderer.send(channel, ...args);
      } else {
        console.warn(`IPC send blocked for channel: ${channel}`);
      }
    },
    invoke: <T = unknown>(channel: string, ...args: unknown[]): Promise<T> => {
      if (ALLOWED_INVOKE_CHANNELS.includes(channel)) {
        return ipcRenderer.invoke(channel, ...args);
      }
      console.warn(`IPC invoke blocked for channel: ${channel}`);
      return Promise.reject(new Error(`Channel not allowed: ${channel}`));
    },
    on: (channel: string, listener: (...args: unknown[]) => void) => {
      if (ALLOWED_RECEIVE_CHANNELS.includes(channel)) {
        const subscription = (
          _event: Electron.IpcRendererEvent,
          ...args: unknown[]
        ) => listener(...args);
        ipcRenderer.on(channel, subscription);
        return () => {
          ipcRenderer.removeListener(channel, subscription);
        };
      }
      console.warn(`IPC receive blocked for channel: ${channel}`);
      return () => {};
    },
  },
};

contextBridge.exposeInMainWorld("electron", electronAPI);

// Type augmentation for Window
declare global {
  interface Window {
    electron: ElectronAPI;
  }
}
