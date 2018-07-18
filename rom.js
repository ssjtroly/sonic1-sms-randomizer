var rom = {
	file: null,

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
		//0x0B7CB, // Hits before glass breaks
		0x0B7E3, // Glass break
		0x0B81A, // Glass hit
		//0x0BC2F, // Hits before lightning wall change
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