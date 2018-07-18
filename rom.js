var rom = {
	file: null,

	sfxPointers: [],

	levelSpoilersPointers: [

	],

	levelHeaderPointers: [
		0x15580, // Green Hill 1 L.H. pointer
		0x15582, // Green Hill 2 L.H. Pointer
		0x15584, // Green Hill 3 L.H. Pointer

		0x15586, // Bridge 1 L.H. Pointer
		0x15588, // Bridge 2 L.H. Pointer
		0x1558A, // Bridge 3 L.H. Pointer

		0x1558C, // Jungle 1 L.H. Pointer
		0x1558E, // Jungle 2 L.H. Pointer
		0x15590, // Jungle 3 L.H. Pointer

		0x15592, // Labyrinth 1 L.H. Pointer
		0x15594, // Labyrinth 2 L.H. Pointer
		0x15596, // Labyrinth 3 L.H. Pointer

		0x15592, // Labyrinth 1 L.H. Pointer
		0x15594, // Labyrinth 2 L.H. Pointer
		0x15596, // Labyrinth 3 L.H. Pointer

		0x15598, // Scrap Brain 1 L.H. Pointer
		0x1559A, // Scrap Brain 2 L.H. Pointer
		0x1559C, // Scrap Brain 3 L.H. Pointer

		0x1559E, // Sky Base 1 L.H. Pointer
		0x155A0, // Sky Base 2 L.H. Pointer
		0x155A2, // Sky Base 3 L.H. Pointer

		//0x155A8, // SB 2 Area 1 -> 2 L.H. Pntr
		//0x155AA, // SB 2 Area 1 -> 3 L.H. Pntr
		//0x155AC, // SB 2 Area 2 -> 1 [TP] L.H. Pntr
		//0x155AE, // SB 2 Area 2 -> 3 [TP] L.H. Pntr
		//0x155B0, // SB 2 Area 2 -> 1 L.H. Pntr
		//0x155B2, // SB 2 Area 3 -> 1 L.H. Pntr

		//0x155B4, // Sky Base 2 area 2 L.H. Pntr
		//0x155B6, // Sky Base 2 area 2 L.H. Pntr 2
	],

	bonusHeaderPointers: [
		0x155B8, // Bonus 1 L.H. Pntr
		0x155BA, // Bonus 2 L.H. Pntr
		0x155BC, // Bonus 3 L.H. Pntr
		0x155BE, // Bonus 4 L.H. Pntr
		0x155C0, // Bonus 5 L.H. Pntr
		0x155C2, // Bonus 6 L.H. Pntr
		0x155C4, // Bonus 7 L.H. Pntr
		0x155C6	// Bonus 8 L.H. Pntr
	],
}