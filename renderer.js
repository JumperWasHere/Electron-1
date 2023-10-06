// frontend js

// const { ipcRenderer } = require('electron');

// const axios = require('axios');

// const dataForm = document.getElementById('dataForm');
// const apiResponseDiv = document.getElementById('output');

const Username = document.getElementById('Username');
const Password = document.getElementById('password');

window.api.receiveFromD((data) => {
	console.log(`Received ${data} from main process`);
});

// Send a message to the main process
window.api.sendToA();
// dataForm.addEventListener('click', () => {
//     axios.post('http://test-demo.aemenersol.com/api/account/login',
//     {
//         username: Username,
//         password: Password
//       })
//       .then((response) => {
//         const responseData = response.data;
//         apiResponseDiv.textContent = `API Response: ${JSON.stringify(responseData)}`;
//       })
//       .catch((error) => {
//         apiResponseDiv.textContent = `API Error: ${error.message}`;
//       });
//   });
// const electron = require('electron');
// Importing the net Module from electron remote
// const net = electron.remote.net;
const dataForm = document.getElementById('dataForm');
// let get = document.getElementById('get');
// dataForm.addEventListener('click', () => {
// 	const request = net.request({
// 		method: 'GET',
// 		protocol: 'http:',
// 		hostname: 'httpbin.org',
// 		path: '/get',
// 		redirect: 'follow'
// 	});
// 	request.on('response', (response) => {
// 		console.log(`STATUS: ${response.statusCode}`);
// 		console.log(`HEADERS: ${JSON.stringify(response.headers)}`);

// 		response.on('data', (chunk) => {
// 			console.log(`BODY: ${chunk}`)
// 		});
// 	});
// 	request.on('finish', () => {
// 		console.log('Request is Finished')
// 	});
// 	request.on('abort', () => {
// 		console.log('Request is Aborted')
// 	});
// 	request.on('error', (error) => {
// 		console.log(`ERROR: ${JSON.stringify(error)}`)
// 	});
// 	request.on('close', (error) => {
// 		console.log('Last Transaction has occurred')
// 	});
// 	request.setHeader('Content-Type', 'application/json');
// 	request.end();
// });

// let post = document.getElementById('post');
dataForm.addEventListener('click', () => {
	let body = JSON.stringify({   
        username: Username,
        password: Password });
	const request = net.request({
		method: 'POST',
		protocol: 'http:',
		hostname: 'test-demo.aemenersol.com/api/account/login',
		path: '/post',
		redirect: 'follow'
	});
	request.on('response', (response) => {
		console.log(`STATUS: ${response.statusCode}`);
		console.log(`HEADERS: ${JSON.stringify(response.headers)}`);

		response.on('data', (chunk) => {
			console.log(`BODY: ${chunk}`)
		});
	});
	request.on('finish', () => {
		console.log('Request is Finished')
	});
	request.on('abort', () => {
		console.log('Request is Aborted')
	});
	request.on('error', (error) => {
		console.log(`ERROR: ${JSON.stringify(error)}`)
	});
	request.on('close', (error) => {
		console.log('Last Transaction has occurred')
	});
	request.setHeader('Content-Type', 'application/json');
	request.write(body, 'utf-8');
	request.end();
});
