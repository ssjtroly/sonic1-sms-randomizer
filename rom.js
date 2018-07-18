var rom = {
	file: null,

	// doesnt appear to be useful since palettes have different sizes
	// assuming simply shuffling pointers would cause bugs
	levelPalettesPointer: 0x0627C, // 34 bytes

	// [address, length]
	palettePointers: [
		[0x0024B, 64], // Labyrinth underwater
		[0x00F0E, 32], // Main map
		[0x00F2E, 32], // Main map 2
		[0x013E1, 32], // Title Screen
		[0x014FC, 32], // Game over
		[0x01B8D, 32], // Level Complete
		[0x01F9D, 16], // Sky Base 1 Lightning
		[0x02AD6, 32], // Credits 
		[0x0626C, 16], // End post
		[0x0629E, 32], // Green hill load
		[0x062BE, 48], // Green Hill auto
		[0x062EE, 32], // Bridge load
		[0x0630E, 48], // Bridge auto
		[0x0633E, 32], // Jungle load
		[0x0635E, 48], // Jungle auto
		[0x0638E, 32], // Labyrinth load
		[0x063AE, 48], // Labyrinth auto
		[0x063DE, 32], // Scrap Brain load
		[0x063FE, 64], // Scrap Brain auto
		[0x0643E, 32], // Sky Base load
		[0x0645E, 64], // Sky Base auto
		[0x0649E, 64], // Sky Base lightning charge auto
		[0x064DE, 64], // Sky Base lightning fire auto
		[0x0651E, 64], // Sky Base 2 auto
		[0x0655E, 32], // Bonus load
		[0x0657E, 16], // Bonus auto
		[0x0658E, 32], // Sky Base 3/Inside load
		[0x065AE, 64], // Sky Base 3/Inside auto
		[0x0731C, 16], // Boss sprite
	],

	palette16Pointers: [
		0x01F9D, // Sky Base 1 Lightning
		0x0626C, // End post
		0x0657E, // Bonus auto
		0x0731C, // Boss sprite
	],

	palette32Pointers: [
		0x00F0E, // Main map
		0x00F2E, // Main map 2
		0x013E1, // Title Screen
		0x014FC, // Game over
		0x01B8D, // Level Complete
		0x02AD6, // Credits 
		0x0629E, // Green hill load
		0x062EE, // Bridge load
		0x0633E, // Jungle load
		0x0638E, // Labyrinth load
		0x063DE, // Scrap Brain load
		0x0643E, // Sky Base load
		0x0655E, // Bonus load
		0x0658E, // Sky Base 3/Inside load
	],

	palette48Pointers: [
		0x062BE, // Green Hill auto
		0x0630E, // Bridge auto
		0x0635E, // Jungle auto
		0x063AE, // Labyrinth auto
	],

	palette64Pointers: [
		0x0024B, // Labyrinth underwater
		0x063FE, // Scrap Brain auto
		0x0645E, // Sky Base auto
		0x0649E, // Sky Base lightning charge auto
		0x064DE, // Sky Base lightning fire auto
		0x0651E, // Sky Base 2 auto
		0x065AE, // Sky Base 3/Inside auto
	],

	musicPointers: [
		0x00D3D, // Main Map Music
		0x012D9, // Title Screen Music
		0x02709, // Credits Music
		0x03641, // Death Music
		0x05042, // Death Drowned Music
		0x05D24, // Invincibility Music
		0x05EDC, // Chaos Emerald Gained Music
		0x05FCF, // Level Completed (post) Music
		0x07045, // Green Hill Boss Music
		0x07487, // Level Completed (machine) music
		0x08088, // Jungle Boss Music
		0x084D4, // Bridge Boss Music
		0x092A9, // Labyrinth Boss Music
		0x0A82A, // Scrap Brain Boss Music
		0x0B68D, // Sky Base Boss Music
	],

	musicDataPointers: 0x0C716, // 42 bytes

	sfxPointers: [
		0x014C1, // continue
		0x017D8, // Chaos Emerald tally
		0x0180D, // Sonic Left tally
		0x01854, // Special Bonus tally
		0x01F7D, // Lightning
		0x0202E, // Robotnik post
		0x02036, // Life post
		0x02040, // Bonus 
		0x036BB, // Sonic hurt
		0x036EE, // Hit enemy & monitors
		0x039CE, // Life gained (100 rings)
		0x039D5, // Ring (also post)
		0x03A00, // Life (50000 points gained)
		0x0506A, // Labyrinth countdown
		0x050A3, // Jumping
		0x050DC, // Sonic spin
		0x051FE, // Sonic screech
		0x0550C, // Sonic rolling launch (green hill)
		0x0552A, // Left spring
		0x05553, // up spring right side
		0x05575, // right spring
		0x055AF, // Splash in water
		0x055DF, // up spring middle
		0x055E8, // Whistle through block (GHZ2)
		0x05639, // Teleport
		0x05724, // star bumper
		0x0576E, // Purple spring
		0x0577E, // Orange spring
		0x0578E, // Green spring
		0x057CA, // Long bumper
		0x05C4D, // Extra life (monitor)
		0x05FD2, // Post lands
		0x0602E, // Spinning post
		0x0666A, // Crab claw shoot
		0x06C92, // Fly shoot
		0x06FAF, // Chameleon shoot
		0x07818, // Robotnik hit
		0x07AA4, // Robotnik beaten
		0x07D54, // Fish out of water
		0x0829E, // Bomb explode (Jungle 3)
		0x08425, // Bridge falling
		0x085A5, // Robotnik shoot projectiles (bridge)
		0x08705, // Seesaw (bridge)
		0x08BB9, // Spike pole (labyrinth)
		0x08C8B, // Fireball (labyrinth)
		0x09476, // Robotnik shoot projectiles (labyrinth)
		0x097E1, // Sonic breathing
		0x09B67, // Pink bumper
		0x09C13, // Fireball (scrap brain) not in view?
		0x09C55, // Fireball (scrap brain)
		0x09D47, // Fire (scrap brain)
		0x09EC1, // Door raise
		0x09ED1, // Door lower
		0x0A128, // Lightning orb
		0x0A460, // Switch
		0x0A9B4, // Robotnik platform rise (scrap brain)
		0x0AC1A, // Exploder (sky base 2)
		0x0B631, // Turret shooting (sky base)
		0x0B7E3, // Glass break
		0x0B81A, // Glass hit
		0x0BC56, // Continuous Lightning wall 1 (sky base 3)
		0x0BCA2, // Lightning wall 2 (sky base 3)
		0x0BE5A, // Teleport out (ending)
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