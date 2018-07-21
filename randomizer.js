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

		var isShuffleLevelsChecked = ui.shuffleLevelsCheck.checked;
		var isShuffleBonusChecked = ui.shuffleBonusCheck.checked;
		var isRandomizeEnemiesChecked = ui.randomizeEnemiesCheck.checked;
		var isRandomizeMonitorsChecked = ui.randomizeMonitorsCheck.checked;
		var isShuffleSfxChecked = ui.shuffleSfxCheck.checked;
		var isShuffleMusicChecked = ui.shuffleMusicCheck.checked;
		var isShufflePaletteColorsChecked = ui.shufflePaletteColorsCheck.checked;

		if (!isShuffleLevelsChecked && 
			!isShuffleBonusChecked && 
			!isRandomizeEnemiesChecked &&
			!isRandomizeMonitorsChecked &&
			!isShuffleSfxChecked && 
			!isShuffleMusicChecked &&
			!isShufflePaletteColorsChecked) 
		{
			alert("Nothing to randomize.");
			return;
		}

		Math.seedrandom(ui.seedInput.value);

		var ROM = rom.file.slice(0);
		
		if (isShuffleLevelsChecked) {
			randomizer.shuffleLevels(ROM);
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

		if (isShufflePaletteColorsChecked) {
			randomizer.shufflePaletteColors(ROM);
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

	shuffleLevels: function(ROM) {
		var levelHeaderPointerPool = rom.levelHeaderPointers.slice(0);
		var levelHeaderPointers = rom.levelHeaderPointers;

		var levelHeaderPointersBegin = levelHeaderPointers[0];

		for (var i = 0; i < levelHeaderPointers.length; i++) {
			var poolIndex = getRandomInt(levelHeaderPointers.length);

			// shuffle level header pointers (this is causing graphics issues with robotnik/boss projectiles)
			ROM[levelHeaderPointers[i]] = rom.file[levelHeaderPointerPool[poolIndex]];
			ROM[levelHeaderPointers[i]+1] = rom.file[levelHeaderPointerPool[poolIndex]+1];

			eraseArrayElement(levelHeaderPointerPool, poolIndex);
			//var first = levelHeaderPointerPool.slice(0, poolIndex);
			//var second = levelHeaderPointerPool.slice(poolIndex+1);
			//levelHeaderPointerPool = first.concat(second);
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
			//var first = bonusPointerPool.slice(0, poolIndex);
			//var second = bonusPointerPool.slice(poolIndex+1);
			//bonusPointerPool = first.concat(second);
		}
	},

	randomizeEnemies: function(ROM) {
		for (var i = 0; i < rom.levelHeaderPointers.length; i++) {
			var headerObject = new LevelHeader(ROM, getLevelHeaderAddress(rom.file, rom.levelHeaderPointers[i]));
			var objectLayoutAddress = getObjectLayoutAddress(headerObject.objectLayout);
			var objectCount = rom.file[objectLayoutAddress];

			//console.log("level: " + i);

			//var originalEnemies = [];
			var occuringEnemies = [];
			for (var j = 0; j < objectCount; j++) {
				var offset = 1+(j*3); // 1 byte offset for count plus 3 bytes for each object entry

				var objectIndex = rom.file[objectLayoutAddress+offset];
				//var objectX = rom.file[objectLayoutAddress+offset+1];
				//var objectY = rom.file[objectLayoutAddress+offset+2];

				if (rom.badnikIDs.includes(objectIndex)) {
					var newObjectIndex = rom.badnikIDs[getRandomInt(rom.badnikIDs.length)];
					//originalEnemies.push(objectIndex);
					occuringEnemies.push(newObjectIndex);
					ROM[objectLayoutAddress+offset] = newObjectIndex;	
				}
			}

			//console.log("    new enemies included...");
			//for (var j = 0; j < occuringEnemies.length; j++) {
				//console.log("        " + originalEnemies[j] + " replaced with " + occuringEnemies[j]);
			//}
		}
	},

	randomizeMonitors: function(ROM) {
		for (var i = 0; i < rom.levelHeaderPointers.length; i++) {
			var headerObject = new LevelHeader(ROM, getLevelHeaderAddress(rom.file, rom.levelHeaderPointers[i]));
			var objectLayoutAddress = getObjectLayoutAddress(headerObject.objectLayout);
			var objectCount = rom.file[objectLayoutAddress];

			for (var j = 0; j < objectCount; j++) {
				var offset = 1+(j*3); // 1 byte offset for count plus 3 bytes for each object entry

				var objectIndex = rom.file[objectLayoutAddress+offset];
				//var objectX = rom.file[objectLayoutAddress+offset+1];
				//var objectY = rom.file[objectLayoutAddress+offset+2];

				if (rom.monitorIDs.includes(objectIndex)) {
					ROM[objectLayoutAddress+offset] = rom.monitorIDs[getRandomInt(rom.monitorIDs.length)];
				}
			}
		}
	},

	shuffleSfx: function(ROM) {
		var sfxPointerPool = rom.sfxPointers.slice(0);
		var sfxPointers = rom.sfxPointers;

		for (var i = 0; i < sfxPointers.length; i++) {
			var poolIndex = getRandomInt(sfxPointerPool.length);

			ROM[sfxPointers[i]] = rom.file[sfxPointerPool[poolIndex]];
			ROM[sfxPointers[i]+1] = rom.file[sfxPointerPool[poolIndex]+1];

			eraseArrayElement(sfxPointerPool, poolIndex);
			//var first = sfxPointerPool.slice(0, poolIndex);
			//var second = sfxPointerPool.slice(poolIndex+1);
			//sfxPointerPool = first.concat(second);
		}
	},

	shuffleMusic_OLD: function(ROM) {
		var musicPointerPool = rom.musicPointers.slice(0);
		var musicPointers = rom.musicPointers;

		for (var i = 0; i < musicPointers.length; i++) {
			var poolIndex = getRandomInt(musicPointerPool.length);

			ROM[musicPointers[i]] = rom.file[musicPointerPool[poolIndex]];
			ROM[musicPointers[i]+1] = rom.file[musicPointerPool[poolIndex]+1];

			eraseArrayElement(musicPointerPool, poolIndex);
			//var first = musicPointerPool.slice(0, poolIndex);
			//var second = musicPointerPool.slice(poolIndex+1);
			//musicPointerPool = first.concat(second);
		}

		var musicDataPointer = rom.musicDataPointers;
		var musicDataPointers = [];

		for (var i = 0; i < 21; i++) {
			var offset = musicDataPointer+(i*2);
			musicDataPointers.push([rom.file[offset], rom.file[offset+1]]);
		}
		var musicDataPointersPool = musicDataPointers.slice(0);

		for (var i = 0; i < musicDataPointers.length; i++) {
			var offset = musicDataPointer+(i*2);
			var poolIndex = getRandomInt(musicDataPointersPool.length);

			ROM[offset] = musicDataPointersPool[poolIndex][0];
			ROM[offset+1] = musicDataPointersPool[poolIndex][1];

			eraseArrayElement(musicDataPointersPool, poolIndex);
			//var first = musicDataPointersPool.slice(0, poolIndex);
			//var second = musicDataPointersPool.slice(poolIndex+1);
			//musicDataPointersPool = first.concat(second);
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
			0xA,
			0xB,
			0xC,
			0xD,
			0xE
		];

		for (var i = 0; i < rom.levelHeaderPointers.length; i++) {
			var levelHeaderAddress = getLevelHeaderAddress(rom.file, rom.levelHeaderPointers[i]);
			var music = rom.file[levelHeaderAddress+levelHeaderFieldOffset.music];
			//console.log("level " + i + " music: " + music);
			if (musicPool.includes(music)) {
				var newMusicIndex = getRandomInt(musicPool.length);
				var newMusic = musicPool[newMusicIndex];
				if (newMusicIndex != 0xA) {

				}
				ROM[levelHeaderAddress+levelHeaderFieldOffset.music] = newMusic;
				//console.log("    new music: " + newMusic);
			}
		}
	},

	shufflePaletteColors: function(ROM) {
		var palettePointers = rom.palettePointers;

		for (var i = 0; i < palettePointers.length; i++) {
			var paletteAddr = palettePointers[i][0];
			var paletteLen = palettePointers[i][1];

			var colorPool = [];
			for (var j = 0; j < paletteLen; j++) {
				var color = rom.file[paletteAddr+j];
				colorPool.push(color);
			}

			for (var j = 0; j < paletteLen; j++) {
				var poolIndex = getRandomInt(colorPool.length);

				ROM[paletteAddr+j] = colorPool[poolIndex];

				eraseArrayElement(colorPool, poolIndex);
				//var first = colorPool.slice(0, poolIndex);
				//var second = colorPool.slice(poolIndex+1);
				//colorPool = first.concat(second);
			}
		}
	},
}