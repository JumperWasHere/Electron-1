const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')
const axios = require('axios');
const apiUrl = 'http://test-demo.aemenersol.com/api/account/login';
const PouchDB = require('pouchdb');
const db = new PouchDB('authdb');
const moment = require('moment');
const now = moment();
const remoteDBURL = 'http://127.0.0.1:5984/authdb';
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
app.whenReady().then( async() => {
  createWindow();
  
  ipcMain.on("user:login", (event, data) => {
    openHome()
return

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
  // createWindow()
 await ipcMain.on("request-datatable", async (event) => {

    // let data =  await showTodos();
    let data;
   await db.allDocs({ include_docs: true, descending: true }, async function (err, doc) {
      // console.log(doc.rows);
      if (err) {
      }
      data = doc.rows;
      console.log('-------------------after show db');
      // redrawTodosUI(doc.rows);
    });
   let fetchData = data.map(item => item.doc);
  //  console.log('request-datatable', data);
  //  console.log('fetchData', fetchData);

    // event.reply("login-failed", responseData);
   mainWindow.webContents.send('data-pouchdb', fetchData);

  })
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  replicateDb();

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
     dateTime: now
   };
   db.put(document)
    .then((response) => {
      console.log('Document saved:', response);
    })
    .catch((error) => {
      console.error('Error saving document:', error);
    });
}
async function showTodos() {
let data;
 await  db.allDocs({ include_docs: true, descending: true }, async function (err, doc) {
    console.log(doc.rows);
    if (err){
      return []
    }
   console.log(' doc.rows---------------------');
   return data = doc.rows;
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
function replicateDb(){
  // Replicate data from local to remote
  db.replicate.to(remoteDBURL,{
    auth: {
      username: 'admin',
      password: 'admin',
    },
  })
    .on('complete', () => {
      console.log('Replication to remote database completed.');
    })
    .on('error', (err) => {
      console.error('Replication error:', err);
    });

  // Replicate data from remote to local (bidirectional sync)
  db.replicate.from(remoteDBURL,{
    auth: {
      username: 'admin',
      password: 'admin',
    },
  })
    .on('complete', () => {
      console.log('Replication from remote database completed.');
    })
    .on('error', (err) => {
      console.error('Replication error:', err);
    });
}