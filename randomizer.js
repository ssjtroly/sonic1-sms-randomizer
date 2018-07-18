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
		var isShuffleSfxChecked = ui.shuffleSfxCheck.checked;

		if (!isShuffleLevelsChecked && !isShuffleSfxChecked) {
			alert("Nothing to randomize.");
			return;
		}

		Math.seedrandom(ui.seedInput.value);

		var ROM = rom.file.slice(0);
		
		if (isShuffleLevelsChecked) {
			randomizer.shuffleLevels(ROM);
			
			if (isShuffleBonusChecked) {
				randomizer.shuffleBonuses(ROM);
			}
		}

		if (isShuffleSfxChecked) {
			randomizer.shuffleSfx(ROM);
		}

		downloadBlob(
			ROM, 
			ui.selectedFileNameOutput + "-" + ui.seedInput.value + ui.selectedFileExtOutput, 
			"application/octet-stream"
		);

		//console.log(ROM);
	},

	shuffleLevels: function(ROM) {
		var romData = ROM.slice(0);
		var levelPointerPool = rom.levelHeaderPointers.slice(0);
		var levelPointers = rom.levelHeaderPointers;

		for (var i = 0; i < levelPointers.length; i++) {
			var poolIndex = getRandomInt(levelPointerPool.length);

			ROM[levelPointers[i]] = romData[levelPointerPool[poolIndex]];
			ROM[levelPointers[i]+1] = romData[levelPointerPool[poolIndex]+1];

			var first = levelPointerPool.slice(0, poolIndex);
			var second = levelPointerPool.slice(poolIndex+1);
			levelPointerPool = first.concat(second);
		}
	},

	shuffleBonuses: function(ROM) {
		var romData = ROM.slice(0);
		var bonusPointerPool = rom.bonusHeaderPointers.slice(0);
		var bonusPointers = rom.bonusHeaderPointers;

		for (var i = 0; i < bonusPointers.length; i++) {
			var poolIndex = getRandomInt(bonusPointerPool.length);

			ROM[bonusPointers[i]] = romData[bonusPointerPool[poolIndex]];
			ROM[bonusPointers[i]+1] = romData[bonusPointerPool[poolIndex]+1];

			var first = bonusPointerPool.slice(0, poolIndex);
			var second = bonusPointerPool.slice(poolIndex+1);
			bonusPointerPool = first.concat(second);
		}
	},

	shuffleSfx: function(ROM) {
		var romData = ROM.slice(0);
		var sfxPointerPool = rom.sfxPointers.slice(0);
		var sfxPointers = rom.sfxPointers;

		for (var i = 0; i < sfxPointers.length; i++) {
			var poolIndex = getRandomInt(sfxPointerPool.length);

			ROM[sfxPointers[i]] = romData[sfxPointerPool[poolIndex]];
			ROM[sfxPointers[i]+1] = romData[sfxPointerPool[poolIndex]+1];

			var first = sfxPointerPool.slice(0, poolIndex);
			var second = sfxPointerPool.slice(poolIndex+1);
			sfxPointerPool = first.concat(second);
		}
	},
}