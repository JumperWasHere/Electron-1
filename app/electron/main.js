const { app, BrowserWindow,ipcMain  } = require('electron')
const path = require('node:path')
const PouchDB = require('pouchdb');
const axios = require('axios');
const db = new PouchDB('mydb');
// const bootstrap = require('bootstrap');
const createWindow = () => {
    // Create the browser window.
  const window = new BrowserWindow({
      width: 800,
      height: 600,
      show: false,
      webPreferences: {
        // nodeIntegration: true,
        contextIsolation: true,
        sandbox: true,
        preload: path.join(__dirname, 'preload.js'),
      }
    })
  // Event listeners on the window -> HTML will be visible without any white screen flicker.
  window.webContents.on("did-finish-load", () => {
    window.show();
    window.focus();
  });
    // and load the index.html of the app.
  window.loadFile('app/dist/index.html')
      // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  // db.put({
  //   _id: 'mydoc',
  //   title: 'My Document',
  //   content: 'Hello, PouchDB!',
  // });
  }
  // This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
  app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
      })

  })
  // Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })

//   axios.get('http://test-demo.aemenersol.com/api/dashboard').then(resp => {

//     console.log(resp.data);
// });
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.