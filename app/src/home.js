

// let data = window.electronAPI.dataTable();
document.addEventListener('DOMContentLoaded', () => {
window.electron.dataTable();
// console.log('data', data);
    // const valueFromPreload = window.electron.getValueFromPreload();
    // const data =[]
    window.electron.handleCounter((event, value) => {
        console.log('value', value);
        // data = value;
        createTable(value);
    })
    // console.log('valueFromPreload', valueFromPreload);
// const data = [
//     { name: 'John', age: 30, city: 'New York' },
//     { name: 'Alice', age: 25, city: 'Los Angeles' },
//     { name: 'Bob', age: 35, city: 'Chicago' },
//     { name: 'Eve', age: 28, city: 'San Francisco' },
// ];




})
function createTable(data) {
    const tableContainer = document.getElementById('table-container');

    // Create a table element
    const table = document.createElement('table');

    // Create a table header row
    const headerRow = table.insertRow(0);

    // Create table headers based on the data keys
    for (const key in data[0]) {
        
        if (data[0].hasOwnProperty(key) && ['username','dateTime' ].includes(key)) {
            const th = document.createElement('th');
            th.textContent = key;
            console.log('key', key);
            headerRow.appendChild(th);
        }
    }

    // Create table rows and cells with data
    for (let i = 0; i < data.length; i++) {
        const row = table.insertRow(i + 1);

        for (const key in data[i]) {
            if (data[i].hasOwnProperty(key) && ['username', 'dateTime'].includes(key)) {
                const cell = row.insertCell();
                cell.textContent = data[i][key];
            }
        }
    }

    // Append the table to the container
    tableContainer.appendChild(table);
}