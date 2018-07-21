function getLevelHeaderOffset(ROM, pointer) {
	return littleBytesToBigEndian(ROM[pointer], ROM[pointer+1]);
}

function getLevelHeaderAddress(ROM, pointer) {
	return rom.levelHeaderPointerBegin+getLevelHeaderOffset(ROM, pointer);
}

var levelHeaderFieldOffset = {
	solidityPointer: 0,
	floorWidth: 1,
	floorHeight: 3,
	levelXOffset: 5,
	unknown1: 7,
	levelWidth: 8,
	levelYOffset: 9,
	extendHeight: 11,
	levelHeight: 12,
	startX: 13,
	startY: 14,
	floorLayout: 15,
	floorSize: 17,
	blockMapping: 19,
	levelArt: 21,
	unknown2: 23,
	spriteArt: 24,
	initialPalette: 26,
	cycleSpeed: 27,
	colorCycles: 28,
	cyclePalette: 29,
	objectLayout: 30,
	ScrollingAndRingHUDFlags: 32,
	underwaterFlag: 33,
	timeHUDAndLightningFlags: 34,
	unknown3: 35,
	music: 36
};

function LevelHeader(ROM, address) {
	// Indicates what solidity data to use. The location of this data and its format is undocumented 
	this.solidityPointer = ROM[address];
	
	// Number of blocks wide / high the Floor Layout is. Levels can share the same 
	// Floor Layout (such as the special stages), and the specific level can occupy 
	// a subset of the Floor Layout. The LX / LY / LW / LH values specify the offset 
	// and size of the level within the Floor Layout 
	this.floorWidth = littleBytesToBigEndian(ROM[address+1], ROM[address+2]);

	// Left-hand offset position of the level in the Floor Layout (see "FW" above), 
	// in pixels, i.e. where, horizontally, the left hand side of the level is. 
	// There is always effectively 8 added to this value due to the hidden scrolling 
	// zone on the left side of the screen 
	this.floorHeight = littleBytesToBigEndian(ROM[address+3], ROM[address+4]);

	// Left-hand offset position of the level in the Floor Layout (see "FW" above), 
	// in pixels, i.e. where, horizontally, the left hand side of the level is. 
	// There is always effectively 8 added to this value due to the hidden 
	// scrolling zone on the left side of the screen 
	this.levelXOffset = littleBytesToBigEndian(ROM[address+5], ROM[address+6])

	// The 8th byte in the header appears to be some kind of flag-bits. 
	// Only Green Hill Act 1 & 2 use it, and changing the value appears 
	// to make no discernible difference to the level 
	this.unknown1 = ROM[address+7];

	// Although named "Level Width", it is actually a little more complicated than that. 
	// This value sets the right hand limit of the level, and everything thereafter is cropped out. 
	// The value is multiplied by 8 and 14 is added on top (the minimum width of a 
	// Floor Layout is apparently 14 blocks) to determine the right-most limit (in blocks) 
	this.levelWidth = ROM[address+8];

	// Top offset position of the level in the Floor Layout (see "FH" above), in pixels, 
	// i.e. where, vertically, the top of the level is 
	this.levelYOffset = littleBytesToBigEndian(ROM[address+9], ROM[address+10]);

	// Due to the nature of the bottom of the level being at "6+(LH×8)" blocks this may not align desirably. 
	// This is notable in Green Hill Act 1 in which the level height is 2 blocks short of the Floor Layout and 
	// causes Sonic to die when hitting the jump ramp as it is now touching the bottom of the level. 
	// The Extend Height value adds a number of pixels to the height of the level to compensate, 
	// ideally this should be in multiples of 20 (hex), 32 (decimal) 
	this.extendHeight = ROM[address+11];

	// This value sets the bottom-most limit of the level, and everything thereafter is cropped out. 
	// The value is multiplied by 8 and 6 is added on top (the minimum height of a Floor Layout 
	// is apparently 6 blocks — one screen height) to determine the bottom-most limit (in blocks) 
	this.levelHeight = ROM[address+12];

	// Position, in blocks, where the player starts 
	this.startX = ROM[address+13];
	this.startY = ROM[address+14];

	// How many bytes away from $14000 the Floor Layout is located 
	this.floorLayout = littleBytesToBigEndian(ROM[address+15], ROM[address+16]);

	// Length, in bytes, of the compressed Floor Layout data 
	this.floorSize = littleBytesToBigEndian(ROM[address+17], ROM[address+18]);

	// How many bytes away from $10000 the mappings for this level are located 
	this.blockMapping = littleBytesToBigEndian(ROM[address+19], ROM[address+20]);

	// How many bytes away from $30000 the level art is located 
	this.levelArt = littleBytesToBigEndian(ROM[address+21], ROM[address+22]);

	this.unknown2 = ROM[address+23];

	// How many bytes away from $24000 is the sprite art located 
	this.spriteArt = littleBytesToBigEndian(ROM[address+24], ROM[address+25]);

	// Indicates the number of the initial palette pointer to use, in the pointer order of appearance 
	this.initialPalette = ROM[address+26];

	// Determines the speed of the palette cycle. 0 = no cycle, 1 = change every frame, 2 = change every second frame, and so on 
	this.cycleSpeed = ROM[address+27];

	// Indicates the number of color cycles for the level palette 
	this.colorCycles = ROM[address+28];

	// Indicates the number of the cyclic palette pointer to use, in the pointer order of appearance 
	this.cyclePalette = ROM[address+29];

	// How many bytes away from $15580 the Object layout is located 
	this.objectLayout = littleBytesToBigEndian(ROM[address+30], ROM[address+31]);

	// Bit flags that control how the level scrolls and the presence of the ring count in the HUD.
	this.ScrollingAndRingHUDFlags = ROM[address+32];

	// Controls the under-water effect (slow movement / water colour / drowning) in Labyrinth (80 is on, 00 is off). 
	// The presence of Object $40 in the Object Layout sets the water height at its Y-level 
	this.underwaterFlag = ROM[address+33];

	// Bit flags that control the presence of the time counter in the HUD, and the use of the lightning effect
	this.timeHUDAndLightningFlags = ROM[address+34];

	this.unknown3 = ROM[address+35];

	// Indicates the number of the music pointer to use
	this.music = ROM[address+36];

	this.toString = function() {
		return "" + 
			"solidityPointer: 0x" + this.solidityPointer.toString(16) + "\n" + 
			"floorWidth: 0x" + this.floorWidth.toString(16) + "\n" + 
			"floorHeight: 0x" + this.floorHeight.toString(16) + "\n" + 
			"levelXOffset: 0x" + this.levelXOffset.toString(16) + "\n" + 
			"levelWidth: 0x" + this.levelWidth.toString(16) + "\n" + 
			"levelYOffset: 0x" + this.levelYOffset.toString(16) + "\n" + 
			"extendHeight: 0x" + this.extendHeight.toString(16) + "\n" + 
			"levelHeight: 0x" + this.levelHeight.toString(16) + "\n" + 
			"startX: 0x" + this.startX.toString(16) + "\n" + 
			"startY: 0x" + this.startY.toString(16) + "\n" + 
			"floorLayout: 0x" + this.floorLayout.toString(16) + "\n" + 
			"floorSize: 0x" + this.floorSize.toString(16) + "\n" + 
			"blockMapping: 0x" + this.blockMapping.toString(16) + "\n" + 
			"levelArt: 0x" + this.levelArt.toString(16) + "\n" + 
			"spriteArt: 0x" + this.spriteArt.toString(16) + "\n" + 
			"initialPalette: 0x" + this.initialPalette.toString(16) + "\n" + 
			"cycleSpeed: 0x" + this.cycleSpeed.toString(16) + "\n" + 
			"colorCycles: 0x" + this.colorCycles.toString(16) + "\n" + 
			"cyclePalette: 0x" + this.cyclePalette.toString(16) + "\n" + 
			"objectLayout: 0x" + this.objectLayout.toString(16) + "\n" + 
			"ScrollingAndRingHUDFlags: 0x" + this.ScrollingAndRingHUDFlags.toString(16) + "\n" + 
			"underwaterFlag: 0x" + this.underwaterFlag.toString(16) + "\n" + 
			"timeHUDAndLightningFlags: 0x" + this.timeHUDAndLightningFlags.toString(16) + "\n" + 
			"music: 0x" + this.music.toString(16);
	}

	this.write = function(ROM, address) {
		ROM[address] = this.solidityPointer;

		var bytes = bigToLittleBytesEndian(this.floorWidth);
		ROM[address+1] = bytes[0]; 
		ROM[address+2] = bytes[1];

		bytes = bigToLittleBytesEndian(this.floorHeight);
		ROM[address+3] = bytes[0]; 
		ROM[address+4] = bytes[1];

		bytes = bigToLittleBytesEndian(this.levelXOffset);
		ROM[address+5] = bytes[0]; 
		ROM[address+6] = bytes[1];

		ROM[address+7] = this.unknown1;

		ROM[address+8] = this.levelWidth;

		bytes = bigToLittleBytesEndian(this.levelYOffset);
		ROM[address+9] = bytes[0]; 
		ROM[address+10] = bytes[1];

		ROM[address+11] = this.extendHeight;

		ROM[address+12] = this.levelHeight;

		ROM[address+13] = this.startX;

		ROM[address+14] = this.startY;

		bytes = bigToLittleBytesEndian(this.floorLayout);
		ROM[address+15] = bytes[0]; 
		ROM[address+16] = bytes[1];

		bytes = bigToLittleBytesEndian(this.floorSize);
		ROM[address+17] = bytes[0]; 
		ROM[address+18] = bytes[1];

		bytes = bigToLittleBytesEndian(this.blockMapping);
		ROM[address+19] = bytes[0]; 
		ROM[address+20] = bytes[1];

		bytes = bigToLittleBytesEndian(this.levelArt);
		ROM[address+21] = bytes[0]; 
		ROM[address+22] = bytes[1];

		ROM[address+23] = this.unknown2;

		bytes = bigToLittleBytesEndian(this.spriteArt);
		ROM[address+24] = bytes[0]; 
		ROM[address+25] = bytes[1];

		ROM[address+26] = this.initialPalette;

		ROM[address+27] = this.cycleSpeed;

		ROM[address+28] = this.colorCycles;

		ROM[address+29] = this.cyclePalette;

		bytes = bigToLittleBytesEndian(this.objectLayout);
		ROM[address+30] = bytes[0]; 
		ROM[address+31] = bytes[1];

		ROM[address+32] = this.ScrollingAndRingHUDFlags;

		ROM[address+33] = this.underwaterFlag;

		ROM[address+34] = this.timeHUDAndLightningFlags;

		ROM[address+35] = this.unknown3;

		ROM[address+36] = this.music;
	}
}