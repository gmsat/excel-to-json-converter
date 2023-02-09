const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

function createWindow () {
  const win = new BrowserWindow({
    width: 1600,
    height: 900,
    titleBarStyle: "hiddenInset",
    autoHideMenuBar: true,
    webPreferences: {
      // preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      sandbox: true,
      contextIsolation: true,
      scrollBounce: true,
      devTools: false
    }
  });

  if (isDev) {
    win.loadURL('http://localhost:3000');
  } else {
    win.loadURL(path.join(__dirname, 'public/index.html'));
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  });
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
