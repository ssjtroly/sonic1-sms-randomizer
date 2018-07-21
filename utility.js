function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

function littleBytesToBigEndian(byte1, byte2) {
	return byte1 | (byte2 << 8);
}

function bigToLittleBytesEndian(num) {
	return [ num & 0x0F, num & 0xF0 ];
}

function eraseArrayElement(arr, index) {
	var first = arr.slice(0, index);
	var second = arr.slice(index+1);
	arr = first.concat(second);
}