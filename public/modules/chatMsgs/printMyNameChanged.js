function printMyNameChanged(newName, chatLog) {
	chatLog.insertAdjacentHTML(
		'beforeend',
		`<div>
			<li class="chat-msg bot">You have successfully changed your name to: <strong>${newName}</strong></li>
		</div>`
	);
}

export { printMyNameChanged };
