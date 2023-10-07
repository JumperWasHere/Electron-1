const loginbtn = document.getElementById('login')
const Username = document.getElementById('Username')
const Password = document.getElementById('password')

loginbtn.addEventListener('click', async (event) => {
	event.preventDefault();
	if (Username.value === ''){

		document.getElementById("error-username").innerHTML = "Username is required";
		// return
	}
	if (Password.value === '') {

		document.getElementById("error-password").innerHTML = "Password is required";
		// return
	}
	if (Username.value === '' && Password.value === '' ){
		return
	}
	// const filePath = await window.electronAPI.openFile()
	// filePathElement.innerText = filePath
	const data = {
		username: Username.value,
		password: Password.value,
	};
	window.electron.login(JSON.stringify(data));
})