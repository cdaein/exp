// hide the modal by default
function createPermissionModal() {
	// create elements
	const modalContainerDiv = document.createElement('div');
	modalContainerDiv.classList.add('permission-modal-container');
	const descP = document.createElement('p');
	descP.textContent = "For full experience, please allow access to motion sensors on your device.";
	const buttonContainerDiv = document.createElement('div');
	buttonContainerDiv.classList.add('button-container');
	const cancelButton = document.createElement('button');
	cancelButton.id = 'button-cancel';
	cancelButton.textContent = 'Cancel';
	const allowButton = document.createElement('button');
	allowButton.id = 'button-allow';
	allowButton.textContent = 'Allow';
	
	// organize them inside out
	buttonContainerDiv.appendChild(cancelButton);
	buttonContainerDiv.appendChild(allowButton);
	modalContainerDiv.appendChild(descP);
	modalContainerDiv.appendChild(buttonContainerDiv);
	modalContainerDiv.style.display = 'none';
	document.body.appendChild(modalContainerDiv);
}