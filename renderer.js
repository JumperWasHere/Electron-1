const loginbtn = document.getElementById('login')
const Username = document.getElementById('Username')
const Password = document.getElementById('password')

loginbtn.addEventListener('click', async () => {
	console.log('render', Username.va);
	// const filePath = await window.electronAPI.openFile()
	// filePathElement.innerText = filePath
	const data = {
		username: Username.value,
		password: Password.value,
	};
	window.electron.login(JSON.stringify(data));
})