var downloadURL = function(data, fileName) {
	var a;
	a = document.createElement('a');
	a.href = data;
	a.download = fileName;
	document.body.appendChild(a);
	a.style = 'display: none';
	a.click();
	a.remove();
};

var downloadBlob = function(data, fileName, mimeType) {
	var blob, url;
	blob = new Blob([data], {
	type: mimeType
	});
	url = window.URL.createObjectURL(blob);
	downloadURL(url, fileName);
};