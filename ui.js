var ui = {
	seedInput: null,
	seedRandomButton: null,
	fileInput: null,
	randomizeButton: null,
	shuffleLevelsCheck: null,
	shuffleLevelsSpoilersCheck: null,
	shuffleBonusCheck: null,
	shuffleSfxCheck: null,
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
		this.shuffleLevelsSpoilersCheck = document.getElementById("shuffle-level-spoiler-input");
		this.shuffleBonusCheck = document.getElementById("shuffle-bonus-input");
		this.shuffleSfxCheck = document.getElementById("shuffle-sfx-input");
		this.seedRandomButton = document.getElementById("seed-generate");
		this.fileInput = document.getElementById("file");
		this.randomizeButton = document.getElementById("randomize-rom");

		this.majorVersionDiv.innerHTML = this.majorVersion;
		this.minorVersionDiv.innerHTML = this.minorVersion;

		this.seedInput.value = "";
		this.fileInput.value = "";

		this.shuffleLevelsSpoilersCheck.disabled = true;
		//this.shuffleLevelsSpoilersCheck.disabled = !this.shuffleLevelsCheck.checked;
		this.shuffleBonusCheck.disabled = !this.shuffleLevelsCheck.checked;
	},
};