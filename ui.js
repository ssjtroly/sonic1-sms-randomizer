function onFileSelect(evt) {
	var fileList = evt.target.files;

	if (fileList.length > 0) {
		ui.selectedFileOutput = fileList[0].name;
		var lastDot = ui.selectedFileOutput.lastIndexOf('.');
		if (lastDot !== -1) {
			ui.selectedFileExtOutput = ui.selectedFileOutput.slice(lastDot, ui.selectedFileOutput.length);
			ui.selectedFileNameOutput = ui.selectedFileOutput.slice(0, lastDot);
		}

		var fr = new FileReader();
        fr.onload = function() {
        	rom.file = new Uint8Array(fr.result);
        };
        fr.readAsArrayBuffer(fileList[0]);
	}
}

function onRandomSeed() {
	//console.log("ui.seedInput: " + ui.seedInput);
	ui.seedInput.value = getRandomInt(0x7FFFFFFF).toString(10);
}

var ui = {
	seedInput: null,
	seedRandomButton: null,
	fileInput: null,
	randomizeButton: null,
	shuffleLevelOrderCheck: null,
	shuffleLevelActsCheck: null,
	shuffleBonusCheck: null,
	removeAutoscrollersCheck: null,
	randomizeEnemiesCheck: null,
	shuffleBossesCheck: null,
	randomizeMonitorsCheck: null,
	shuffleSfxCheck: null,
	shuffleMusicCheck: null,
	randomizeSonicsColorsCheck: null,
	randomizePalettesCheck: null,
	randomizePaletteColorsCheck: null,
	enableInfiniteLivesCheck: null,
	majorVersionDiv: null,
	minorVersionDiv: null,

	majorVersion: "0",
	minorVersion: "004",

	selectedFileNameOutput: "",
	selectedFileExtOutput: "",

	initialize: function() {
		this.majorVersionDiv = document.getElementById("major-version");
		this.minorVersionDiv = document.getElementById("minor-version");
		this.seedInput = document.getElementById("seed-input");
		this.selectedFileOutput = document.getElementById("selected-file");
		this.shuffleLevelOrderCheck = document.getElementById("shuffle-level-order-check");
		this.shuffleLevelActsCheck = document.getElementById("shuffle-level-acts-check");
		this.shuffleBonusCheck = document.getElementById("shuffle-bonus-check");
		this.removeAutoscrollersCheck = document.getElementById("remove-autoscrollers-check");
		this.randomizeEnemiesCheck = document.getElementById("randomize-enemies-check");
		this.randomizeMonitorsCheck = document.getElementById("randomize-monitors-check");
		this.shuffleSfxCheck = document.getElementById("shuffle-sfx-check");
		this.shuffleMusicCheck = document.getElementById("shuffle-music-check");
		this.randomizeSonicsColorsCheck = document.getElementById("randomize-sonic-colors-check");
		this.randomizePalettesCheck = document.getElementById("randomize-palettes-check");
		this.randomizePaletteColorsCheck = document.getElementById("randomize-palette-colors-check");
		this.enableInfiniteLivesCheck = document.getElementById("enable-infinite-lives-check");
		this.seedRandomButton = document.getElementById("seed-generate");
		this.fileInput = document.getElementById("file");
		this.randomizeButton = document.getElementById("randomize-rom");

		this.majorVersionDiv.innerHTML = this.majorVersion;
		this.minorVersionDiv.innerHTML = this.minorVersion;

		//this.seedInput.value = "";
		this.fileInput.value = "";
	},
};