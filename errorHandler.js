function generateErrorHandler(textToAdd) {
	return function (err)
	{
		console.error(textToAdd,err);
	}
}