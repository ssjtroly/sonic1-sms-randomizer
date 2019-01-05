var rom = {
	file: null,

	levelHeaderPointerBegin: 0x15580,

	badnikIDs: [
		0x08, // Badnik "Crabmeat" (GH)
		0x0E, // Badnik "Buzz Bomber" (GH/B)
		0x10, // Badnik "Moto Bug" (GH)
		0x11, // Badnik "Newtron" (GH) 
		0x1B, // Badnik "Ball Hog" (SB) 
		0x1F, // Badnik "Caterkiller" (SB) 
		0x26, // Badnik "Chopper" (J, B) 
		0x2D, // Badnik "Yadrin" (B) 
		0x32, // Badnik "Bomb" (SKYB)  
		0x35, // Badnik "Unidus" (SKYB)  
		0x3C, // Badnik "Jaws" (L) 
		0x44, // Badnik "Burrobot" (L)
	],

	bossIDs: [
		0x12, // Robotnik - Green Hill Boss (GH) 
		0x22, // Robotnik - Scrap Brain Boss (SB) 
		0x2C, // Robotnik - Jungle Boss (J) 
		0x48, // Robotnik - Bridge Boss (SB) 
		0x49, // Robotnik - Labyrinth Boss (L) 
		0x4A, // Robotnik - Sky Base Boss (SKYB) 
	],

	monitorIDs: [
		0x01, // Super Ring monitor 
		0x02, // Power Sneakers monitor 
		0x03, // One-Up monitor 
		0x04, // Shield monitor 
		0x05, // Invincibility monitor
	],

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

/*
	randomMusicPool: [
	    00–05: Level Music
	    //06: Title Music
	    //08: Invincibility
	    //09: Level Complete
	    //0A: Dead
	    0B/0C/0D: Boss
	    0E: Credits
	    10: Bonus Stage
	],
*/

	musicPointers: [
		//0x00D3D, // Main Map Music
		//0x012D9, // Title Screen Music
		//0x02709, // Credits Music
		//0x03641, // Death Music
		//0x05042, // Death Drowned Music
		//0x05D24, // Invincibility Music
		//0x05EDC, // Chaos Emerald Gained Music
		//0x05FCF, // Level Completed (post) Music
		//0x07045, // Green Hill Boss Music
		//0x07487, // Level Completed (machine) music
		0x08088, // Jungle Boss Music
		0x084D4, // Bridge Boss Music
		0x092A9, // Labyrinth Boss Music
		0x0A82A, // Scrap Brain Boss Music
		0x0B68D, // Sky Base Boss Music
	],

	musicDataPointers: 0x0C716, // 42 bytes

	sfxPointers: [
		//0x014C1, // continue
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
		0x15580, 	// 0: Green Hill Act 1
		0x15582, 	// 1: Green Hill Act 2
		0x15584, 	// 2: Green Hill Act 3
		0x15586, 	// 3: Bridge Act 1
		0x15588, 	// 4: Bridge Act 2
		0x1558A, 	// 5: Bridge Act 3
		0x1558C, 	// 6: Jungle Act 1
		0x1558E, 	// 7: Jungle Act 2
		0x15590, 	// 8: Jungle Act 3
		0x15592, 	// 9: Labyrinth Act 1
		0x15594, 	// 10: Labyrinth Act 2
		0x15596, 	// 11: Labyrinth Act 3
		0x15598, 	// 12: Scrap Brain Act 1
		0x1559A, 	// 13: Scrap Brain Act 2
		0x1559C, 	// 14: Scrap Brain Act 3
		0x1559E, 	// 15: Sky Base Act 1
		0x155A0, 	// 16: Sky Base Act 2
		0x155A2, 	// 17: Sky Base Act 3
	/*
		0x155A4, 	// 18: End Sequence
		// 0x155A6,	// 19: UNUSED (invalid data)
		0x155A8, 	// 20: Scrap Brain Act 2 (Emerald Maze), from corridor
		0x155AA, 	// 21: Scrap Brain Act 2 (Ballhog Area)
		0x155AC, 	// 22: Scrap Brain Act 2, from transporter
		0x155AE, 	// 23: Scrap Brain Act 2 (Emerald Maze), from transporter
		0x155B0, 	// 24: Scrap Brain Act 2, from Emerald Maze
		0x155B2, 	// 25: Scrap Brain Act 2, from Ballhog Area
		0x155B4, 	// 26: Sky Base Act 2 (Interior)
		0x155B6, 	// 27: Sky Base Act 2 (Interior), this one is identical
		0x155B8, 	// 28: Special Stage 1
		0x155BA,	// 29: Special Stage 2
		0x155BC, 	// 30: Special Stage 3
		0x155BE, 	// 31: Special Stage 4
		0x155C0, 	// 32: Special Stage 5
		0x155C2, 	// 33: Special Stage 6
		0x155C4, 	// 34: Special Stage 7
		0x155C6, 	// 35: Special Stage 8
		// 0x155C8, 	// 36: UNUSED (invalid data)
	*/
	],

	bonusHeaderPointers: [
		0x155B8, 	// 28: Special Stage 1
		0x155BA,	// 29: Special Stage 2
		0x155BC, 	// 30: Special Stage 3
		0x155BE, 	// 31: Special Stage 4
		0x155C0, 	// 32: Special Stage 5
		0x155C2, 	// 33: Special Stage 6
		0x155C4, 	// 34: Special Stage 7
		0x155C6, 	// 35: Special Stage 8
	],
}