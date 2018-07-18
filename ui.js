var ui = {
	seedInput: null,
	seedRandomButton: null,
	fileInput: null,
	randomizeButton: null,
	shuffleLevelsCheck: null,
	shuffleBonusCheck: null,
	shuffleSfxCheck: null,
	shuffleMusicCheck: null,
	shufflePaletteColorsCheck: null,
	shufflePalettesCheck: null,
	majorVersionDiv: null,
	minorVersionDiv: null,

	majorVersion: "0",
	minorVersion: "001",

	selectedFileNameOutput: "",
	selectedFileExtOutput: "",

	initialize: function() {
		this.majorVersionDiv = document.getElementById("major-version");
		this.minorVersionDiv = document.getElementById("minor-version");
		this.seedInput = document.getElementById("seed-input");
		this.selectedFileOutput = document.getElementById("selected-file");
		this.shuffleLevelsCheck = document.getElementById("shuffle-levels-input");
		this.shuffleBonusCheck = document.getElementById("shuffle-bonus-input");
		this.shuffleSfxCheck = document.getElementById("shuffle-sfx-input");
		this.shuffleMusicCheck = document.getElementById("shuffle-music-input");
		this.shufflePaletteColorsCheck = document.getElementById("shuffle-palette-colors-input");
		this.shufflePalettesCheck = document.getElementById("shuffle-palettes-input");
		this.seedRandomButton = document.getElementById("seed-generate");
		this.fileInput = document.getElementById("file");
		this.randomizeButton = document.getElementById("randomize-rom");

		this.majorVersionDiv.innerHTML = this.majorVersion;
		this.minorVersionDiv.innerHTML = this.minorVersion;

		//this.seedInput.value = "";
		this.fileInput.value = "";
	},
};