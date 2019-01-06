var randomizer = {
	onRandomize: function() {
		if (ui.seedInput == null || ui.seedInput.value === null || ui.seedInput.value === "") {
			alert("No seed was specified.");
			return;
		}

		if (rom.file === null) {
			alert("No ROM file was seleted.");
			return;
		}

		var isShuffleLevelOrderChecked = ui.shuffleLevelOrderCheck.checked;
		var isShuffleLevelActsChecked = ui.shuffleLevelActsCheck.checked;
		var isShuffleBonusChecked = ui.shuffleBonusCheck.checked;
		var isRemoveAutoscrollersChecked = ui.removeAutoscrollersCheck.checked;
		var isRandomizeEnemiesChecked = ui.randomizeEnemiesCheck.checked;
		var isRandomizeMonitorsChecked = ui.randomizeMonitorsCheck.checked;
		var isShuffleSfxChecked = ui.shuffleSfxCheck.checked;
		var isShuffleMusicChecked = ui.shuffleMusicCheck.checked;
		var isRandomizeSonicsColorsChecked = ui.randomizeSonicsColorsCheck.checked;
		var isRandomizePalettesChecked = ui.randomizePalettesCheck.checked;
		var isRandomizePaletteColorsChecked = ui.randomizePaletteColorsCheck.checked;

		if (!isShuffleLevelOrderChecked && 
			!isShuffleLevelActsChecked &&
			!isShuffleBonusChecked && 
			!isRemoveAutoscrollersChecked && 
			!isRandomizeEnemiesChecked &&
			!isRandomizeMonitorsChecked &&
			!isShuffleSfxChecked && 
			!isShuffleMusicChecked &&
			!isRandomizeSonicsColorsChecked &&
			!isRandomizePalettesChecked &&
			!isRandomizePaletteColorsChecked) 
		{
			alert("Nothing to randomize.");
			return;
		}

		Math.seedrandom(ui.seedInput.value);

		var ROM = rom.file.slice(0);
		
		if (isRemoveAutoscrollersChecked) {
			randomizer.removeAutoscrollers(ROM);
		}

		if (isShuffleLevelOrderChecked) {
			randomizer.shuffleLevelOrder(ROM);
		}

		if (isShuffleLevelActsChecked) {
			randomizer.shuffleLevelActs(ROM);
		}

		if (isShuffleBonusChecked) {
			randomizer.shuffleBonuses(ROM);
		}

		if (isShuffleBonusChecked) {
			randomizer.shuffleBonuses(ROM);
		}

		if (isRandomizeEnemiesChecked) {
			randomizer.randomizeEnemies(ROM);
		}

		if (isRandomizeMonitorsChecked) {
			randomizer.randomizeMonitors(ROM);
		}

		if (isShuffleSfxChecked) {
			randomizer.shuffleSfx(ROM);
		}

		if (isShuffleMusicChecked) {
			randomizer.shuffleMusic(ROM);
		}

		if (isRandomizeSonicsColorsChecked) {
			randomizer.randomizeSonicsColors(ROM);
		}

		if (isRandomizePalettesChecked) {
			randomizer.randomizePalettes(ROM);
		}

		if (isRandomizePaletteColorsChecked) {
			randomizer.randomizePaletteColors(ROM);
		}

	///*
		downloadBlob(
			ROM, 
			ui.selectedFileNameOutput + "-" + ui.seedInput.value + ui.selectedFileExtOutput, 
			"application/" + ui.selectedFileExtOutput
		);
	//*/

		//console.log(ROM);
	},

	// shuffle level header pointers (this is causing graphics issues with robotnik/boss projectiles)
	shuffleLevelOrder: function(ROM) {
		var levelHeaderPointers = rom.levelHeaderPointers;

		var levelHeaderPointerPool = [];
		for (let i = 0; i < levelHeaderPointers.length; i+=3) {
			// copy every 3rd level header pointer
			var lhPtr = levelHeaderPointers[i];
			levelHeaderPointerPool.push(lhPtr);
		}

		for (let i = 0; i < levelHeaderPointers.length; i+=3) {
			//var index = i*3;

			var poolIndex = getRandomInt(levelHeaderPointerPool.length);

			// act 1
			ROM[levelHeaderPointers[i]] = rom.file[levelHeaderPointerPool[poolIndex]];
			ROM[levelHeaderPointers[i]+1] = rom.file[levelHeaderPointerPool[poolIndex]+1];

			// act 2
			ROM[levelHeaderPointers[i]+2] = rom.file[levelHeaderPointerPool[poolIndex]+2];
			ROM[levelHeaderPointers[i]+3] = rom.file[levelHeaderPointerPool[poolIndex]+3];

			// act 3
			ROM[levelHeaderPointers[i]+4] = rom.file[levelHeaderPointerPool[poolIndex]+4];
			ROM[levelHeaderPointers[i]+5] = rom.file[levelHeaderPointerPool[poolIndex]+5];

			levelHeaderPointerPool.splice(poolIndex, 1);
		}
	},

	shuffleLevelActs: function(ROM) {
		var levelHeaderPointers = rom.levelHeaderPointers;

		for (let i = 0; i < levelHeaderPointers.length; i+=3) {
			var index = i*3;

			var act1Ptr = [ ROM[levelHeaderPointers[index]], ROM[levelHeaderPointers[index]+1] ];
			var act2Ptr = [ ROM[levelHeaderPointers[index]+2], ROM[levelHeaderPointers[index]+3] ];

			var r = getRandomInt(2);
			if (r === 0) {
				// act 1 becomes act 2
				ROM[levelHeaderPointers[index]] = act2Ptr[0];
				ROM[levelHeaderPointers[index]+1] = act2Ptr[1];

				// act 2 becomes act 1
				ROM[levelHeaderPointers[index]+2] = act1Ptr[0];
				ROM[levelHeaderPointers[index]+3] = act1Ptr[1];
			}
		}
	},

	shuffleBonuses: function(ROM) {
		var bonusPointerPool = rom.bonusHeaderPointers.slice(0);
		var bonusPointers = rom.bonusHeaderPointers;

		for (var i = 0; i < bonusPointers.length; i++) {
			var poolIndex = getRandomInt(bonusPointerPool.length);

			ROM[bonusPointers[i]] = rom.file[bonusPointerPool[poolIndex]];
			ROM[bonusPointers[i]+1] = rom.file[bonusPointerPool[poolIndex]+1];

			eraseArrayElement(bonusPointerPool, poolIndex);
		}
	},

	removeAutoscrollers: function(ROM) {
		var levelHeaderPointers = rom.levelHeaderPointers;
		for (let i = 0; i < levelHeaderPointers.length; i+=3) {
			//console.log("level " + (Math.floor(i/3)+1));

			var act1LHAddr = getLevelHeaderAddress(ROM, levelHeaderPointers[i]);
			var act2LHAddr = getLevelHeaderAddress(ROM, levelHeaderPointers[i+1]);

			var act1Header = new LevelHeader(ROM, act1LHAddr);
			var act2Header = new LevelHeader(ROM, act2LHAddr);

			if ((act1Header.scrollingAndRingHUDFlags & ScrollingAndRingHUDFlags.AutoRightScroll) === ScrollingAndRingHUDFlags.AutoRightScroll) {
				act1Header.scrollingAndRingHUDFlags = act1Header.scrollingAndRingHUDFlags ^ ScrollingAndRingHUDFlags.AutoRightScroll;
			}
			if ((act2Header.scrollingAndRingHUDFlags & ScrollingAndRingHUDFlags.AutoRightScroll) === ScrollingAndRingHUDFlags.AutoRightScroll) {
				act2Header.scrollingAndRingHUDFlags = act2Header.scrollingAndRingHUDFlags ^ ScrollingAndRingHUDFlags.AutoRightScroll;
			}

			act1Header.write(ROM, act1LHAddr);
			act2Header.write(ROM, act2LHAddr);
		}
	},

	randomizeEnemies: function(ROM) {
		for (let i = 0; i < rom.levelHeaderPointers.length; i++) {
			var headerObject = new LevelHeader(ROM, getLevelHeaderAddress(rom.file, rom.levelHeaderPointers[i]));
			var objectLayoutAddress = getObjectLayoutAddress(headerObject.objectLayout);
			var objectCount = rom.file[objectLayoutAddress];

			for (let j = 0; j < objectCount; j++) {
				var offset = 1+(j*3); // 1 byte offset for count plus 3 bytes for each object entry

				var objectIndex = rom.file[objectLayoutAddress+offset];
				//var objectX = rom.file[objectLayoutAddress+offset+1];
				//var objectY = rom.file[objectLayoutAddress+offset+2];

				if (rom.badnikIDs.includes(objectIndex)) {
					var newObjectIndex = rom.badnikIDs[getRandomInt(rom.badnikIDs.length)];
					ROM[objectLayoutAddress+offset] = newObjectIndex;	
				}
			}
		}
	},

	randomizeMonitors: function(ROM) {
		for (let i = 0; i < rom.levelHeaderPointers.length; i++) {
			var lhAddr = getLevelHeaderAddress(ROM, rom.levelHeaderPointers[i]);
			var levelHeader = new LevelHeader(ROM, lhAddr);
			var olAddr = getObjectLayoutAddress(levelHeader.objectLayout);
			var objectCount = rom.file[olAddr];

			for (let j = 0; j < objectCount; j++) {
				var offset = 1+(j*3); // 1 byte offset for count plus 3 bytes for each object entry

				var objectIndex = rom.file[olAddr+offset];
				//var objectX = rom.file[objectLayoutAddress+offset+1];
				//var objectY = rom.file[objectLayoutAddress+offset+2];

				if (rom.monitorIDs.includes(objectIndex)) {
					ROM[olAddr+offset] = rom.monitorIDs[getRandomInt(rom.monitorIDs.length)];
				}
			}
		}
	},

	shuffleSfx: function(ROM) {
		var sfxPointerPool = rom.sfxPointers.slice(0);
		var sfxPointers = rom.sfxPointers;

		for (let i = 0; i < sfxPointers.length; i++) {
			var poolIndex = getRandomInt(sfxPointerPool.length);

			ROM[sfxPointers[i]] = rom.file[sfxPointerPool[poolIndex]];
			ROM[sfxPointers[i]+1] = rom.file[sfxPointerPool[poolIndex]+1];

			sfxPointerPool.splice(poolIndex, 1);
		}

		var jinglePointersPool = rom.jinglePointers.slice(0);
		var jinglePointers = rom.jinglePointers;

		for (let i = 0; i < jinglePointers.length; i++) {
			var poolIndex = getRandomInt(jinglePointersPool.length);

			ROM[jinglePointers[i]] = rom.file[jinglePointersPool[poolIndex]];
			ROM[jinglePointers[i]+1] = rom.file[jinglePointersPool[poolIndex]+1];

			jinglePointersPool.splice(poolIndex, 1);
		}
	},

	shuffleMusic: function(ROM) {
		var musicPool = [
			0x0,
			0x1,
			0x2,
			0x3,
			0x4,
			0x5,
			//0xA,
			0xB,
			0xC,
			0xD,
			0xE
		];

		for (var i = 0; i < rom.levelHeaderPointers.length; i++) {
			var levelHeaderAddress = getLevelHeaderAddress(rom.file, rom.levelHeaderPointers[i]);
			var music = rom.file[levelHeaderAddress+LevelHeaderFieldOffset.music];
			//console.log("level " + i + " music: " + music);
			if (musicPool.includes(music)) {
				var newMusicIndex = getRandomInt(musicPool.length);
				var newMusic = musicPool[newMusicIndex];
				ROM[levelHeaderAddress+LevelHeaderFieldOffset.music] = newMusic;

				eraseArrayElement(musicPool, newMusicIndex);
				//console.log("    new music: " + newMusic);
			}
		}
	},

	randomizePalettes: function(ROM) {
		var levelHeaderPointers = rom.levelHeaderPointers;

		for (let i = 0; i < levelHeaderPointers.length; i+=3) {
			//console.log("level " + (Math.floor(i/3)+1));

			var act1LHAddr = getLevelHeaderAddress(ROM, levelHeaderPointers[i]);
			var act2LHAddr = getLevelHeaderAddress(ROM, levelHeaderPointers[i+1]);
			var act3LHAddr = getLevelHeaderAddress(ROM, levelHeaderPointers[i+2]);

			var act1Header = new LevelHeader(ROM, act1LHAddr);
			var act2Header = new LevelHeader(ROM, act2LHAddr);
			var act3Header = new LevelHeader(ROM, act3LHAddr);

			act1Header.initialPalette = getRandomInt(8);
			act1Header.cycleSpeed = 0;
			act1Header.colorCycles = 0;
			act1Header.cyclePalette = act1Header.initialPalette;

			act2Header.initialPalette = getRandomInt(8);
			act2Header.cycleSpeed = 0;
			act2Header.colorCycles = 0;
			act2Header.cyclePalette = act2Header.initialPalette;

			act3Header.initialPalette = getRandomInt(8);
			act3Header.cycleSpeed = 0;
			act3Header.colorCycles = 0;
			act3Header.cyclePalette = act3Header.initialPalette;

			act1Header.write(ROM, act1LHAddr);
			act2Header.write(ROM, act2LHAddr);
			act3Header.write(ROM, act3LHAddr);
		}
	},

	randomizeSonicsColors: function(ROM) {
		var palettePointers = rom.palettePointers;

		var sonicColor3 = getRandomInt(0x3F);
		var sonicColor2 = getRandomInt(0x3F);
		var sonicColor1 = getRandomInt(0x3F);

		//var sonicColor1 = sonicColorBase + ((getRandomInt(2) == 0) ? 0 : 8) + ((getRandomInt(2) == 0) ? 0 : 16);
		//var sonicColor2 = sonicColorBase + ((getRandomInt(2) == 0) ? 16 : 24) + ((getRandomInt(2) == 0) ? 0 : 16);

		// 16 - sonic shadow
		// 18 - sonic highligh
		// 19 - sonic patches

		for (var i = 0; i < palettePointers.length; i++) {
			var paletteAddr = palettePointers[i][0];
			ROM[paletteAddr+16] = sonicColor1;
			ROM[paletteAddr+17] = sonicColor2;
			ROM[paletteAddr+18] = sonicColor3;
		}

		var levelHeaderPointers = rom.levelHeaderPointers;

		for (let i = 0; i < levelHeaderPointers.length; i+=3) {
			//console.log("level " + (Math.floor(i/3)+1));

			var act1LHAddr = getLevelHeaderAddress(ROM, levelHeaderPointers[i]);
			var act2LHAddr = getLevelHeaderAddress(ROM, levelHeaderPointers[i+1]);
			var act3LHAddr = getLevelHeaderAddress(ROM, levelHeaderPointers[i+2]);

			var act1Header = new LevelHeader(ROM, act1LHAddr);
			var act2Header = new LevelHeader(ROM, act2LHAddr);
			var act3Header = new LevelHeader(ROM, act3LHAddr);

			//act1Header.initialPalette = getRandomInt(8);
			//act1Header.cycleSpeed = 0;
			act1Header.colorCycles = 0;
			//act1Header.cyclePalette = act1Header.initialPalette;

			//act2Header.initialPalette = getRandomInt(8);
			//act2Header.cycleSpeed = 0;
			act2Header.colorCycles = 0;
			//act2Header.cyclePalette = act2Header.initialPalette;

			//act3Header.initialPalette = getRandomInt(8);
			//act3Header.cycleSpeed = 0;
			act3Header.colorCycles = 0;
			//act3Header.cyclePalette = act3Header.initialPalette;

			act1Header.write(ROM, act1LHAddr);
			act2Header.write(ROM, act2LHAddr);
			act3Header.write(ROM, act3LHAddr);
		}
	},

	randomizePaletteColors: function(ROM) {
		var palettePointers = rom.palettePointers;

		for (var i = 0; i < palettePointers.length; i++) {
			var paletteAddr = palettePointers[i][0];
			var paletteLen = palettePointers[i][1];

			var usedColors = [];
			for (var j = 0; j < paletteLen; j++) {
				var c = rom.file[paletteAddr+j];
				if (!usedColors.includes(c)) {
					usedColors.push(c);
				}
			}

			var usedColorsPool = usedColors.slice(0);
			var remappedColors = {};
			for (var j = 0; j < usedColors.length; j++) {
				var c = usedColors[j];
				var randomUsedColorPoolIndex = getRandomInt(usedColorsPool.length);

				remappedColors[c.toString()] = usedColorsPool[randomUsedColorPoolIndex];
				usedColorsPool.splice(randomUsedColorPoolIndex, 1);
			}

			for (var j = 0; j < paletteLen; j++) {
				var c = rom.file[paletteAddr+j];
				
				var newc = remappedColors[c.toString()];

				ROM[paletteAddr+j] = newc;
			}
		}
	},
}