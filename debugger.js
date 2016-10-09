function generateDebugger(textToAdd,object) {
	return function ()
	{
		console.debug(textToAdd,object);
	}
}

function debug(textToAdd,object) {
		console.debug(textToAdd,object);
}