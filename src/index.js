require("v8-compile-cache");

const { app, BrowserWindow, globalShortcut, clipboard} = require('electron')
const Store = require('electron-store');

Store.initRenderer();

const settings = new Store();
if (settings.get('capFPS') === undefined) settings.set('capFPS', false)

if(!settings.get('capFPS')) {
    app.commandLine.appendSwitch('disable-frame-rate-limit');
    app.commandLine.appendSwitch('disable-gpu-vsync');
}


const createWindow  = () => {
    const win = new BrowserWindow({
        width : 1200,
        height: 800,
        title: `Venge Client`,
        backgroundColor: '#202020',
        webPreferences: {
            preload: __dirname + '/preload.js',
            nodeIntegration: false,
        }
    });
    win.removeMenu();

    if (settings.get('fullScreen') === undefined) settings.set('fullScreen', true);

    win.setFullScreen(settings.get('fullScreen'));

    globalShortcut.register('F6', () => win.loadURL('https://venge.io/'));
    globalShortcut.register('Escape', () => win.webContents.executeJavaScript('document.exitPointerLock()', true));
    globalShortcut.register('F7', () => win.webContents.toggleDevTools());


    win.loadURL('https://venge.io/')
}

app.whenReady().then(() => {
    createWindow()
    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
});