const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')
const axios = require('axios');
const apiUrl = 'http://test-demo.aemenersol.com/api/account/login';
const PouchDB = require('pouchdb');
const db = new PouchDB('AuthDb');
let mainWindow;
function createWindow() {
   mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })


  // mainWindow.loadFile('index.html')
  openHome()
}
function handleSetTitle(event, title) {
  console.log('func from main.js');
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  win.setTitle(title)
}
function handleMessage(event, title){
  console.log('func from main.js', title);

}
async function handleFileOpen() {
  console.log('func from main.js');

  // const { canceled, filePaths } = await dialog.showOpenDialog()
  // if (!canceled) {
  //   return filePaths[0]
  // }
}
app.whenReady().then( () => {
  createWindow();
  ipcMain.on("user:login", (event, data) => {

    console.log('login main.js', JSON.parse(data));
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: apiUrl,
      headers: {
        'Content-Type': 'application/json',
        // 'Cookie': '.AspNetCore.Identity.Application=CfDJ8Kci65wTckpIno-__NGTkT5rTEiFienE_qyQmGSpWrOeYw04AE4CyzsioIlPXTHnxot0NHQ-hmC1NbGiWoAc5QIHOQcEiONSN91pGnmY5BdjHImf-Slk6BrfA2L3TnXPRhyLZHYvKOeEj9-O7Y2FG7tYdaeD4krXx0zPItkKqzSOqG3NAwayieQqQ2z8QVvZd9B-3-8ElZSfOnQFcpEjRyJLcy1-bS-MgUhcNpyk93_-1bpzIYSzxhQGZFzHCXRinvajV7EKU_78WGdLiSEEDVNUPG4Fr4u1V1i_hintAXbRVOvHAc_BhfWnIRwXk6bpAe3BFl5vfQWPn9SxnvmmFcprsHDxuGER1ZZfv3aPWUHqTKCv60VBcOXmjuxwlHxOjK-L7LBzB2doFzupNlWltYPaJT_tt6wzGOdGMyPO6hVKpp1Q98X8stABkCGxCKakehloSFz89aqurARnBKoHXjXPLp5bE-qRYjpAxJyCD67Al2exf5T1yAiAuIDfjoHl-TuaAc2U5iNjWjjIiT14WVMq9TFGLCaxAPpxp0swbru_hKu0KbIbmXod4NqvujEuBLM--v1lphafCmTlOVpnVheihAjwJyC1jGrQIUcizZEJPR6C5w7fMDjFRy5qtiryHl-g9iBL13PQU0DWemwiEr_th1eb9lotpnNRTQ8IcKDWhKdHifK7oUaxgh71QzMs3w'
      },
      data: data
    };
     axios.request(config)
      .then(async(response) => {
        console.log(JSON.stringify(response.data));
        // if (response.data != null) {
          // event.reply("login-failed");
        //   return;
        // }
        storeData(JSON.parse(data), response.data);
        openHome()
      })
      .catch((error) => {
        // console.log('errrr--------------',error);
        const responseData = {
          message: "Wrong Auth",
        };
        event.reply("login-failed", responseData);
        openMessageBox()
      });
  })
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  // showTodos()

})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
 function storeData(data,token){
   const document = {
     _id: new Date().toISOString(),  // Provide a unique ID
     username: data.username,
     password: data.password,
     token: token,
   };
   db.put(document)
    .then((response) => {
      console.log('Document saved:', response);
    })
    .catch((error) => {
      console.error('Error saving document:', error);
    });
}
function showTodos() {
  db.allDocs({ include_docs: true, descending: true }, function (err, doc) {
    console.log(doc.rows);
    // redrawTodosUI(doc.rows);
  });
}
function openHome() {
  mainWindow.loadFile("./app/src/home.html");
}

function openMessageBox(){
  const options = {
    type: 'error',
    buttons: ['Ok'],
    defaultId: 0,
    title: 'Fail',
    message: 'Login Fail',
    detail: 'Please Insert Correct Username and Password',
    // checkboxLabel: 'Remember my answer',
    // checkboxChecked: true,
  };

  dialog.showMessageBox(null, options, (response, checkboxChecked) => {
    console.log(response);
    console.log(checkboxChecked);
  });
}