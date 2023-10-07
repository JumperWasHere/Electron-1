const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  login: (data) => ipcRenderer.send("user:login", data),
  openFile: () => ipcRenderer.invoke('dialog:openFile')
})
// ipcRenderer.on('asynchronous-reply', (_event, arg) => {
//   console.log(arg) // prints "pong" in the DevTools console
// })
// ipcRenderer.send('asynchronous-message', 'ping')
ipcRenderer.on("login-failed", (event, message) => {
  // console.log('message', message);
  // document.getElementById("error-message").innerHTML = message.message;
});