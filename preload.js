//controller
// All the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const PouchDB = require('pouchdb');
const db = new PouchDB('mydb');
const axios = require('axios');

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const dependency of ['chrome', 'node', 'electron']) {
      replaceText(`${dependency}-version`, process.versions[dependency])
    }


    // callApi()



    
    // const PouchDB = require('pouchdb');
    // const db = new PouchDB('mydb');


    // const dataForm = document.getElementById('dataForm');
    // const Username = document.getElementById('Username');
    // const Password = document.getElementById('password');
    // const outputDiv = document.getElementById('output');

    // const fetchDataButton = document.getElementById('fetchData');
    // const outputDiv = document.getElementById('output');

    // fetchDataButton.addEventListener('click', async () => {
    //   try {
    //     const doc = await db.get('mydoc');
    //     outputDiv.textContent = `Title: ${doc.title}, Content: ${doc.content}`;
    //   } catch (error) {
    //     outputDiv.textContent = 'Document not found.';
    //   }
    // });
    // dataForm.addEventListener('submit', async (event) => {
    //     event.preventDefault();
    //     const username = Username.value;
    //     const password = Password.value;
    //     try {
    //         let data ={
    //             // _id: new Date().toISOString(),
    //             username: username,
    //             password:password
    //         }


    //         console.log(' data',data);
    //         // Save the data to PouchDB
    //         // const response = await db.post({ data });
    
    //         // Display success message
    //     //     outputDiv.textContent = `Data saved with ID: ${response.id}`;
    //     //     await db.close()
    //     //             .then(() => {
    //     //                 console.log('Database closed.');
    //     //             })
    //     //             .catch((error) => {
    //     //                 console.error('Error closing the database:', error);
    //     //             });
    //       } catch (error) {
    //         // Handle error
    //         // outputDiv.textContent = 'Error saving data to PouchDB';
    //         console.error(error);
    //       }
    
    //       // Clear the input field
    //     //   Username.value = '';
    // })
  })


  function callApi(){
    const dataForm = document.getElementById('dataForm');
const apiResponseDiv = document.getElementById('output');

const Username = document.getElementById('Username');
const Password = document.getElementById('password');
dataForm.addEventListener('click', () => {
    axios.post('http://test-demo.aemenersol.com/api/account/login',
    {
        username: Username,
        password: Password
      })
      .then((response) => {
        const responseData = response.data;
        apiResponseDiv.textContent = `API Response: ${JSON.stringify(responseData)}`;
      })
      .catch((error) => {
        apiResponseDiv.textContent = `API Error: ${error.message}`;
      });
  });
// console.log('runnn');

  }


    

  