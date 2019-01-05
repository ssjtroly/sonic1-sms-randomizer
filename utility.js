function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

function littleToBigEndian(byte1, byte2) {
	return (byte2 << 8) | byte1;
}

function bigToLittleEndian(num) {
	var top = num & 0xFF;
	var bottom = (num & 0xFF00) >>> 8;

	return [ top, bottom ];
}

function eraseArrayElement(arr, index) {
	//var first = arr.slice(0, index);
	//var second = arr.slice(index+1);
	//arr = first.concat(second);

	arr.splice(index);
}