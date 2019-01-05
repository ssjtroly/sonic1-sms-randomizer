function getLevelHeaderOffset(ROM, pointer) {
	return (ROM[pointer+1] << 8) | ROM[pointer];
}

function getLevelHeaderAddress(ROM, pointer) {
	return rom.levelHeaderPointerBegin+getLevelHeaderOffset(ROM, pointer);
}

var LevelHeaderFieldOffset = {
	SolidityPointer: 0,
	FloorWidth: 1,
	FloorHeight: 3,
	LevelXOffset: 5,
	Unknown1: 7,
	LevelWidth: 8,
	LevelYOffset: 9,
	ExtendHeight: 11,
	LevelHeight: 12,
	StartX: 13,
	StartY: 14,
	FloorLayout: 15,
	FloorSize: 17,
	BlockMapping: 19,
	LevelArt: 21,
	Unknown2: 23,
	SpriteArt: 24,
	InitialPalette: 26,
	CycleSpeed: 27,
	ColorCycles: 28,
	CyclePalette: 29,
	ObjectLayout: 30,
	ScrollingAndRingHUDFlags: 32,
	UnderwaterFlag: 33,
	TimeHUDAndLightningFlags: 34,
	Unknown3: 35,
	Music: 36
};

var ScrollingAndRingHUDFlags = {
	Invalid: 0x01,			// Sonic immediately dies, the game hangs and doesn't reload the level; purpose unknown
	DemoPlay: 0x02, 		// The demo play data controls Sonic
	ShowRings: 0x04, 		// Shows ring count in HUD and rings are displayed. When this value is not included no rings are visible, 
					 		//     even though the sparkle effect occurs when you collect them
	AutoRightScroll: 0x08,  // The level automatically scrolls to the right (ala Bridge Act 2)
	PauseUpScroll: 0x10, 	// After a pause, the level automatically scrolls upwards! If you get caught at the bottom of the screen, you die
	SmoothScroll: 0x20, 	// The screen scrolls smoothly, allowing you to get ahead of it
	OscilateScroll: 0x40, 	// Slow up and down wave effect (ala Sky Base Act 2)
	NoDownScroll: 0x80, 	// Screen does not scroll down (ala Jungle Act 2). If you get caught at the bottom of the screen, you die
};

var TimeHUDAndLightning = {
	SpecialStage: 0x01, 	 // Centers the time display when on a special stage. Outside of the special stage causes the game to switch to the special stage
    LightningEffect: 0x02, 	 // Uses the lightning effect. This overrides the level's own palette
    Unknown1: 0x04, 		 // No effect?
    Unknown2: 0x08, 		 // No effect?
    UnderwaterPalette: 0x10, // Use the boss underwater palette (ala Labyrinth Act 3)
    DisplayTime: 0x20, 		 // Displays the time
    LockScroll: 0x40, 		 // Locks the screen, no scrolling occurs
    Unknown3: 0x80 			 // No effect?
};

function LevelHeader(ROM, address) {
	// Indicates what solidity data to use. The location of this data and its format is undocumented 
	this.solidityPointer = ROM[address];
	
	// Number of blocks wide / high the Floor Layout is. Levels can share the same 
	// Floor Layout (such as the special stages), and the specific level can occupy 
	// a subset of the Floor Layout. The LX / LY / LW / LH values specify the offset 
	// and size of the level within the Floor Layout 
	this.floorWidth = littleToBigEndian(ROM[address+1], ROM[address+2]);

	// Left-hand offset position of the level in the Floor Layout (see "FW" above), 
	// in pixels, i.e. where, horizontally, the left hand side of the level is. 
	// There is always effectively 8 added to this value due to the hidden scrolling 
	// zone on the left side of the screen 
	this.floorHeight = littleToBigEndian(ROM[address+3], ROM[address+4]);

	// Left-hand offset position of the level in the Floor Layout (see "FW" above), 
	// in pixels, i.e. where, horizontally, the left hand side of the level is. 
	// There is always effectively 8 added to this value due to the hidden 
	// scrolling zone on the left side of the screen 
	this.levelXOffset = littleToBigEndian(ROM[address+5], ROM[address+6])

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
	this.levelYOffset = littleToBigEndian(ROM[address+9], ROM[address+10]);

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
	this.floorLayout = littleToBigEndian(ROM[address+15], ROM[address+16]);

	// Length, in bytes, of the compressed Floor Layout data 
	this.floorSize = littleToBigEndian(ROM[address+17], ROM[address+18]);

	// How many bytes away from $10000 the mappings for this level are located 
	this.blockMapping = littleToBigEndian(ROM[address+19], ROM[address+20]);

	// How many bytes away from $30000 the level art is located 
	this.levelArt = littleToBigEndian(ROM[address+21], ROM[address+22]);

	this.unknown2 = ROM[address+23];

	// How many bytes away from $24000 is the sprite art located 
	this.spriteArt = littleToBigEndian(ROM[address+24], ROM[address+25]);

	// Indicates the number of the initial palette pointer to use, in the pointer order of appearance 
	this.initialPalette = ROM[address+26];

	// Determines the speed of the palette cycle. 0 = no cycle, 1 = change every frame, 2 = change every second frame, and so on 
	this.cycleSpeed = ROM[address+27];

	// Indicates the number of color cycles for the level palette 
	this.colorCycles = ROM[address+28];

	// Indicates the number of the cyclic palette pointer to use, in the pointer order of appearance 
	this.cyclePalette = ROM[address+29];

	// How many bytes away from $15580 the Object layout is located 
	this.objectLayout = littleToBigEndian(ROM[address+30], ROM[address+31]);

	// Bit flags that control how the level scrolls and the presence of the ring count in the HUD.
	this.scrollingAndRingHUDFlags = ROM[address+32];

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
			"ScrollingAndRingHUDFlags: 0x" + this.scrollingAndRingHUDFlags.toString(16) + "\n" + 
			"underwaterFlag: 0x" + this.underwaterFlag.toString(16) + "\n" + 
			"timeHUDAndLightningFlags: 0x" + this.timeHUDAndLightningFlags.toString(16) + "\n" + 
			"music: 0x" + this.music.toString(16);
	}

	this.write = function(ROM, address) {
		ROM[address] = this.solidityPointer;

		var bytes = bigToLittleEndian(this.floorWidth);
		ROM[address+1] = bytes[0];
		ROM[address+2] = bytes[1];

		bytes = bigToLittleEndian(this.floorHeight);
		ROM[address+3] = bytes[0]; 
		ROM[address+4] = bytes[1];

		bytes = bigToLittleEndian(this.levelXOffset);
		ROM[address+5] = bytes[0]; 
		ROM[address+6] = bytes[1];

		ROM[address+7] = this.unknown1;

		ROM[address+8] = this.levelWidth;

		bytes = bigToLittleEndian(this.levelYOffset);
		ROM[address+9] = bytes[0]; 
		ROM[address+10] = bytes[1];

		ROM[address+11] = this.extendHeight;

		ROM[address+12] = this.levelHeight;

		ROM[address+13] = this.startX;

		ROM[address+14] = this.startY;

		bytes = bigToLittleEndian(this.floorLayout);
		ROM[address+15] = bytes[0]; 
		ROM[address+16] = bytes[1];

		bytes = bigToLittleEndian(this.floorSize);
		ROM[address+17] = bytes[0]; 
		ROM[address+18] = bytes[1];

		bytes = bigToLittleEndian(this.blockMapping);
		ROM[address+19] = bytes[0]; 
		ROM[address+20] = bytes[1];

		bytes = bigToLittleEndian(this.levelArt);
		ROM[address+21] = bytes[0]; 
		ROM[address+22] = bytes[1];

		ROM[address+23] = this.unknown2;

		bytes = bigToLittleEndian(this.spriteArt);
		ROM[address+24] = bytes[0]; 
		ROM[address+25] = bytes[1];

		ROM[address+26] = this.initialPalette;

		ROM[address+27] = this.cycleSpeed;

		ROM[address+28] = this.colorCycles;

		ROM[address+29] = this.cyclePalette;

		bytes = bigToLittleEndian(this.objectLayout);
		ROM[address+30] = bytes[0]; 
		ROM[address+31] = bytes[1];

		ROM[address+32] = this.scrollingAndRingHUDFlags;

		ROM[address+33] = this.underwaterFlag;

		ROM[address+34] = this.timeHUDAndLightningFlags;

		ROM[address+35] = this.unknown3;

		ROM[address+36] = this.music;
	}
}