import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";

let mainWindow: BrowserWindow | null = null;

const isDev = process.env.NODE_ENV === "development" || !app.isPackaged;

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
    titleBarStyle: "hiddenInset",
    trafficLightPosition: { x: 15, y: 10 },
    show: false,
  });

  mainWindow.once("ready-to-show", () => {
    mainWindow?.show();
  });

  if (isDev) {
    // In development, load from Vite dev server (desktop-ui runs on 5174)
    await mainWindow.loadURL("http://localhost:5174");
    mainWindow.webContents.openDevTools();
  } else {
    // In production, load from built files
    const rendererPath = path.join(
      process.resourcesPath,
      "renderer",
      "index.html"
    );
    await mainWindow.loadFile(rendererPath);
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// IPC Handlers
ipcMain.handle("app:getVersion", () => {
  return app.getVersion();
});

ipcMain.handle("app:getPlatform", () => {
  return process.platform;
});

// App lifecycle
app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Security: Prevent new window creation
app.on("web-contents-created", (_, contents) => {
  contents.setWindowOpenHandler(() => {
    return { action: "deny" };
  });
});
