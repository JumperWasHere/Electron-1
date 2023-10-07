const { contextBridge, ipcRenderer } = require('electron')
console.log("load preload.js");
const dataTable = [];
contextBridge.exposeInMainWorld('electron', {
  login: (data) => ipcRenderer.send("user:login", data),
  dataTable: () => ipcRenderer.send("request-datatable"),
  handleCounter: (callback) => ipcRenderer.on('data-pouchdb', callback)

  // dataTable: (data) => ipcRenderer.on("data-pouchdb", data),
  // openFile: () => ipcRenderer.invoke('dialog:openFile')
})
// ipcRenderer.on('asynchronous-reply', (_event, arg) => {
//   console.log(arg) // prints "pong" in the DevTools console
// })
// ipcRenderer.send('asynchronous-message', 'ping')
ipcRenderer.on("login-failed", (event, message) => {
  // console.log('message', message);
  // document.getElementById("error-message").innerHTML = message.message;
});
// ipcRenderer.on("data-pouchdb", (event, message) => {
//   console.log('message --data-pouchdb', message);
//   dataTable = message;
//   // document.getElementById("dataTable").innerHTML = "try and error";
 
// });






