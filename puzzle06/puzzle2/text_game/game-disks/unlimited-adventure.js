// http://asciiflow.com/
// https://github.com/okaybenji/text-engine

/*
todo:
* enable backspace for some actions
* consider another vent passage to engineering or the armory?
* make cleaner useful
* % done
* fix vending machine
* make pen work on paper
* give points to the loosers show %??
* more death images
*/

const unlimitedAdventure = {
  roomId: 'closet',
  inventory: [],
  rooms: [
	  
	  

	  
	  
  //lost hand  
      {
        name: 'Game Over',
        id: 'gameOverHandGone',
        img: `
             ___..__
    __..--""" ._ __.'
   X            "-..__
 xX           '"--..__";
xxX___        '--...__"";
      \`-..__ '"---..._;"
            """"----'          
`,
        desc: `
 Your game has ended. Reload browser to restart.
		  `
      },		  
	  
	  
	  
	  
  // Game Over generic	  
      {
        name: 'Game Over',
        id: 'gameOver',
        img: `
      XXXXXXX
   XXXX     XXX
XXX           XX
X              XX
+               X
|               |
|  Here lies    |
|               |
|  You.         |
|               |
|               |
+---------------+
        `,
        desc: `
 Your game has ended. Reload browser to restart.
		  `
      },	 
	  
	  
	  
	   
	  
  // Game Over killed by alien on bridge  
      {
        name: 'Game Over',
        id: 'bridgeAlienDeath',
        img: `
    _..._
  .'     '.
 / \\     / \\
(  |     |  )
('"'  "  '"')
 \\         /
  \\  ___  /
   '.___.'
        `,
        desc: `
As you enter the bridge you see the blue-green face of an unknown alien race.
It has been watching the door, prepared for you to enter. It blasts you in the gut.
As you fall to your knees you see the captain tied to the command chair attempting to break free.
Your last thought is that you should have lured the alien out somehow.
Your game has ended. Reload browser to restart.
`
      },


  // Game Over killed by alien on in engineering  
      {
        name: 'Game Over',
        id: 'engAlienDeath',
        img: `
    _..._
  .'     '.
 / \\     / \\
(  |     |  )
('"'  "  '"')
 \\         /
  \\  ___  /
   '.___.'
        `,
        desc: `
Startled to see you, the alien realizes that the alarm was a distracton to draw it's attention here. It stares at you as it raises a blaster in its three fingered hand and blasts you in the face.
Your game has ended. Reload browser to restart.
`
      },
	  
	  
// CLOSET	  
    {
      name: 'Closet',
      id: 'closet',
      img: `
_______________________________________________
   |--<>--|   |--<>--|   |--<>--|   |--<>--|     
===============================================
                          
						  
      +----+               
      | %% |               ______
      | %% |              | ____ |   __________
      +----+              ||    ||   |        |
                          |o    ||   |--------|
                          ||    ||   |--------|
--------------------------||____||---|________|
      `,
	  oneTimeDesc: `You find your self in a cleaning closet, scared out of your mind. The shipwide intruder alarm is sounding.`,
      desc: `Drab lights line the top of the room. This closet smells like it was recently used as a toliet.`,
      items: [
		{ 
			name: 'door', 
			desc: 'It is a door. Use it to open it.', 
			passiveDesc: 'There is a [door] that you used to enter the closet.', 
			doorLocation: 'bunkCorridor' 
		},
		{ 
			name: 'poster', 
			passiveDesc: 'The wall has a [poster] of some long forgotten gone video drama.',
			desc: 'It is a poster of a video drama, but you can\'t recall the name.', 
			printUse: "You place your hands next to the sides and stare at the poster for a long time. No insight comes, what movie is that? Hmm. Well, best get to saving the ship.", 
		    img:`
+---------------------------------------------+
|                                             |
|    +------------------------------------+   |
|    |                                    |   |
|    |   X        XXX                  X  |   |
|    |         XX XXXXXXX X XXXXXXX       |   |
|    |       XXXXXXXXXXXX         X       |   |
|    |     XX X    X      XXXXXX XX       |   |
|    |     XXXXXXXXX    X     XXX         |   |
|    |        XXX      XX                 |   |
|    |                 XXXX               |   |
+----+------------------------------------+---+			
`
		},
		{ 
			name: 'shelf', 
			desc: 'It is a shelf built to hold things.', 
			printUse: "You climb on top of the shelf. From here the smell is not as bad.",
			passiveDesc: "There is a [shelf] near the door.",
			optionalDesc: "There is a bottle of [cleaner] on the shelf.",
			optionalDescKeyItem: "cleaner"
		},
		{ 
			name: 'toilet-paper', desc: 'Standard issue toilet paper.', 
			passiveDesc: 'There is a roll of [toilet-paper] in the corner.', 
			isTakeable:true,
	  		use: ({disk, println, getRoom, enterRoom}) => {
			   println("You think about using the toilet paper, but reconsider given that you relieved your self in the closet earlier.")	
			},
			img:`
+---------------------------------------------+
|                                             |
|                 XXXXXXXXXXXX                |
|                X  ________  X               |
|               XX / XXXXXX \\ XX              |
|               XX |X@@  @@X| XX              |
|               XX |X@@  @@X| XX              |
|               XX | XXXXXX | XX              |
|                X  \\------/  X               |
|            _____XXXXXXXXXXXX                |
|                                             |
+---------------------------------------------+		
`
	    },
		{ 
			name: 'cleaner',  
			desc: 'Bottle of cleaner. Used to clean things.',  
			isTakeable:true, 
	  		use: ({disk, println, getRoom, enterRoom}) => {
			  
				
			   if (disk.roomId == "engineeringFire") {
				   println("You spray the cleaner at the face of the alien. Nothing happens.");
				   enterRoom("engAlienDeath");
			   }
			   else if (disk.roomId =="bunkCorridor") {
			   		println("You spray the burnmark on the wall, the charred blackness is diminished, but it will take something stronger to clean this.")	
			   }
			   else {
				   println("You spray some cleaner out and clean things up a bit.")	
			   }


			},
			img:`
+---------------------------------------------+
|                                             |
|                                             |
|              +---------+     /X             |
|          XXXX|         |XXXXXXX             |
|         XX   | CLEANER |XXXXXXX             |
|         XXX  |         |     \\X             |
|           XXX|         |                    |
|              |         |                    |
|              +---------+                    |
|                                             |
+---------------------------------------------+			
`
		}
      ]
    },
	
	
/// BUNK C	
    {
      name: 'Midship Corridor',
      id: 'bunkCorridor',
      img: `
_______________________________________________
 < Kitchen   O   O   O   O   O   Engineering > 
-----------------------------------------------


      JANITOR                  BUNKS
      ______                   ______
     | ____ |           x     | ____ | 
     ||    ||      x #Xx      ||    ||
     |o    ||                 |o    ||
     ||    ||                 ||    ||
-----||____||-----------------||____||---------
`,
	  oneTimeDesc: `Gathering your courage you leave the closet.`,
      desc: `This is a corridor in the ship, nearly at the middle of the ship.
Not much to see here, other than the blaster [burns] mixed with blood on the floor.`,
      exits: [
         { dir: 'west', id: 'kitchenCorridor', label: 'a corridor to the kitchen.' },
		 { dir: 'east', id: 'engineeringCorridor', label: 'a corridor to the engineering area.' }
      ],
      items: [
		{ name: 'closet-door', desc: 'It is a door.', passiveDesc: 'There is a [closet-door] that leads to a closet.', doorLocation: 'closet' },
		{ name: 'bunks-door', desc: 'It is a door.', passiveDesc: 'There is a [bunks-door] that leads to the bunk room.', doorLocation: 'bunkRoom' },
		{ 
			name: 'burns', 
			desc: 'These look like blaster burns, like from a blaster. The surface is rough and bumpy.', 
			printUse:'You turn and rub your back on the burns. Mmmm that is nice.',
			img:`
+---------------------------------------------+
|                                             |
|                                             |
|                      XXX      XXXXXX        |
|                    XXX XX    XX%   X        |
|         XXXX      XXX    X   XX   XX        |
|      XXX XX       X## %% X    XXXXX         |
|     XX  XX       XX## %%%X                  |
|       XXX        XX##%%XXX                  |
|   XXXXX            XXXX                     |
|                                             |
+---------------------------------------------+
`
		},
      ]
	  
    },
	
	
/// BUNK ROOM
    {
      name: 'Bunk Room',
      id: 'bunkRoom',
      img: `
_______________________________________________
   |--<>--|   |--<>--|   |--<>--|   |--<>--|     
===============================================

                                     +--------+
                                     |   ||   |
  ______      |%%%%%%%%%%%%|         |   ||   |
 | ____ |     |            |         |   ||   |
 ||    ||     |            |         |#/#||   |
 |o    ||     |%%%%%%%%%%%%|         |   ||%# |
 ||    ||     |            |         |%%/||/% |
-||____||-----|------------|---------|________|
`,
	  oneTimeDesc: `It would be nice to take a nap here, but need to focus on saving the ship.`,
      desc: `
This is the room where the crew sleeps when off duty. There is a bunk [bed] with sleeping mats on them.
On one wall are [lockers]. It looks like they have been forced open, with their contents tossed about.`,
        items: [
		  { name: 'door', desc: 'It is a door.', passiveDesc: 'There is a [door] that leads to the corridor.', doorLocation: 'bunkCorridor' },
          { 
			  name: 'bed', desc: 'Looks like a nice place to sleep.',
			  use: ({disk, println, getRoom, enterRoom}) => {
				  println('Exhausted you lie down for a nice rest. While you are a sleep the invaders from the ship find you and kill you.')
				  enterRoom('gameOver');
			  } 
		  },
		  { 
			  name: 'lockers', 
			  desc: 'Whomever was searching here was in a hurry. You see clothes, and personal items tossed about.', 
			  printUse: "You attempt to climb into the locker, but you don't fit.",
			  optionalDesc: 'You spot a [lighter] in the mess.',
			  optionalDescKeyItem: 'lighter',
			  img:`
+---------------------------------------------+
|     |----------------------------------|    |
|     ||                ||              ||    |
|     ||     CLOTHES    ||     AND      ||    |
|     ||                ||              ||    |
|     |----------------------------------|    |
|     |----------------------------------|    |
|     ||                ||              ||    |
|     ||    PERSONAL    ||    ITEMS     ||    |
|     ||                ||              ||    |
|     |----------------------------------|    |
+---------------------------------------------+
`
		  },
		  { 
			  name: 'lighter', 
			  desc: 'This device makes flames - it lights things.', 
			  isTakeable:true,
			  img:`
+---------------------------------------------+
|                                             |
|                  (---------)                |
|                  |         |                |
|                  |         |                |
|                  |@--------+                |
|                  |         |                |
|                  |         |                |
|                  |  ZAP-O  |                |
|                  (_________)                |
|                                             |
+---------------------------------------------+			  
`,
		      use: ({disk, println, getRoom, enterRoom}) => {
					  
				  var hasTP = false;
	              disk.inventory.forEach(item => {
					  if (item.name == 'toilet-paper') {
						  hasTP = true;
					  }
	              });
				  
				  
				  if (disk.roomId == "engineeringFire") {
					  println("You take out your lighter and hold it up to the alien. It looks at you curiously, pats a pocket looking for a cigarette, shakes his head, and blasts you in the face.");
					  enterRoom("engAlienDeath");
					  return;
				  }
					  
				  // if they have they TP they can make fire
				  if (hasTP) {
				    
					
					// this is done in engineering then more happens
					if ( disk.roomId == "engineering") {
						
						if (disk.alienDead) {
							println("You wad up a ball of toilet paper and light it with the lighter. It sets off the fire alarm, again.");
						}
						else {
							println("You wad up a ball of toilet paper and light it with the lighter. The smoke sets off the fire alarm.")
							enterRoom("engineeringFire");
						}
					}
					else {
						println("You wad up a ball of toilet paper and light it with the lighter. It smokes, burns, and turns to ash.");
					}
					
					
				  }
				  else {
					  // if they don't have TP give hint about TP	
					  println("You flick the switch on the lighter and look at pretty flame, and think, 'If only I had something to burn.'");
				  }
					  
			  }
		  },
        ]
    },	
	
	
	
	
	
/// Engineering Corridor
    {
      name: 'Enginering Corridor',
      id: 'engineeringCorridor',
      img: `
_______________________________________________
 < Midship   O   O   O   O   O   O   Bridge > 
-----------------------------------------------


   ARMORY      ENGINEERING  
   ______        ______
  | ____ |      | ____ |             +-----+
  ||    ||      ||    ||            !|-----|
  |#    ||      |#    ||             +-----+
  ||    ||      ||    ||
--||____||------||____||-----------------------
`,
	  oneTimeDesc: `You hear the voice of the captain on the ship com: "Don't open the bridge door its a...". Hmm.`,
      desc: `This is the corridor that connects the midship to the bridge and engine room.`,
       items: [
  		{ 
			name: 'chute', 
			desc: 'A garbage chute, a simple and direct way to dispose of trash.', 
			img:`
+---------------------------------------------+
|                                             |
|  /!\\ WARNING /!\\    +---------------------+ |
|  Items placed in    |                     | |
|  this chute are     |                     | |
|  ground into small  |       #      #      | |
|  bits.              |       +------+      | |
|                     |                     | |
|  Don't solo this    |                     | |
|  chute.             +---------------------+ |
|                                             |
+---------------------------------------------+
`,
			passiveDesc: 'There is a garbage [chute].',
  	  		use: ({disk, println, getRoom, enterRoom,secureDoorOpen}) => {
				println("You open the chute. What an incredible smell you've discovered! You take a step back and launch your self headfirst into the chute. Griding gears turn your body into small bits.");
				enterRoom("gameOver");
  			}
  	    },
  		{ 
			name: 'armory-door', 
			desc: 'The door to the armory. It is secured with a keycard.', 
			img:`
+---------------------------------------------+
|                                             |
|          +-------------+ +-----------+      |
|          |             | | SCAN KEY  |      |
|          |   XXXXXXX   | |   CARD    |      |
|          |  XX     XX  | +-----------+      |
|          |  XXXXXXXXX  |   +-------+        |
|          |  XXXXXXXXX  |   |.......|        |
|          |  XXXXXXXXX  |   |.......|        |
|          |             |   +-------+        |
|          +-------------+                    |
+---------------------------------------------+
`,
			passiveDesc: 'There is a [armory-door] to the armory.',
  	  		use: ({disk, println, getRoom, enterRoom,secureDoorOpen}) => {
			   secureDoorOpen(disk,"armory")
  			}
  	    },
		{ 
			name: 'engineering-door', 
			desc: 'The door to the engineering room. It is secured with a keycard.', 
			passiveDesc: 'There is a [engineering-door] door to the engine room.',
			img:`
+---------------------------------------------+
|                                             |
|          +-------------+ +-----------+      |
|          |             | | SCAN KEY  |      |
|          |   XXXXXXX   | |   CARD    |      |
|          |  XX     XX  | +-----------+      |
|          |  XXXXXXXXX  |   +-------+        |
|          |  XXXXXXXXX  |   |.......|        |
|          |  XXXXXXXXX  |   |.......|        |
|          |             |   +-------+        |
|          +-------------+                    |
+---------------------------------------------+
`,
	  		use: ({disk, println, getRoom, enterRoom, secureDoorOpen}) => {
			   secureDoorOpen(disk,"engineering")
			}
	    }
      ],
      exits: [
         { dir: 'west', id: 'bunkCorridor', label: 'a corridor to midship.' },
		 { dir: 'east', id: 'bridgeCorridor', label: 'a corridor to the bridge.' }
      ]
    },
	

	

/// armory
    {
      name: 'Armory',
      id: 'armory',
      img: `
_______________________________________________
   |--<>--|   |--<>--|   |--<>--|   |--<>--|     
===============================================


                           +---------------+
                ______     |               |
               | ____ |    |  {}  {}  {}   |
  ___!___      ||    ||    |   |   |   |   |
  |  x  |      |#    ||    |   !   !   !   |
  | #X# |      ||    ||    |               |
--|_____|------||____||----|_______________|--
      `,
				
      desc: `This is the armory. Despite the name, you see no armor, only weapons. Seems more like a weaponry.`,					
	  
		items: [
			
	  		{ name: 'door', desc: 'The door to the armory. It is secured with a keycard.', passiveDesc: 'There is a [door] to the corridor.',
	  	  		use: ({disk, println, getRoom, enterRoom,secureDoorOpen}) => {
				   secureDoorOpen(disk,"engineeringCorridor")
	  			}
	  	    },
			{ 
				name: 'weapon-rack', 
				desc: 'This weapon rack is well stocked with multiple [blaster] rifles.', 
				passiveDesc: 'There is a [weapon-rack] on the wall.', 
				img:`
+---------------------------------------------+
|                                             |
|    +-----+       +-----+      +-----+       |
|    +-|  #|       +-|  #|      +-|  #|       |
|     +--+#|        +--+#|       +--+#|       |
|         #+>           #+>          #+>      |
|        +-+           +-+          +-+       |
|        | |           | |          | |       |
|        + +           + +          + +       |
|        {+}>          {+}>         {+}>      |
|                                             |
+---------------------------------------------+
`,
				printUse: "You look at rack and think about climbing it, but can't get a foot hold."
			},
			{ 
				name: 'drone-control', 
				desc: 'This is the [drone-control] system. A lethal drone is controled by this console. It has a [select] button.', 
				passiveDesc: 'There is a [drone-control] system on the opposite wall.',
				img:`
+---------------------------------------------+
|     /!\\ Authorized personnel only. /!\\      |
|                                             |
|                                             |
|     +----------+   TARGETING PARAMETERS     |
|     |          |   brain                    |
|     | Activate |                            |
|     |          |       +----------+         |
|     +----------+       |  Select  |         |
|                        +----------+         |
|                                             |
+---------------------------------------------+
`,
				use: ({disk, println, getRoom, enterRoom}) => {
					
					var target = "brain";
					if (disk.droneTargetParams) {
						target = disk.droneTargetParams;
					}
					
				  println('Despite the warning you enable the drone control system. After a whir and buzz a small drone rises. It spots you and melts a hole in your '+target+'.')
				  enterRoom('gameOver');
				} 
		    },
			{ 
				name: 'select', 
				desc: 'This is the select button on the drone control system. Pressing it changes the targeting parameters.', 
				use: ({disk, println, getRoom, enterRoom}) => {
					var oldTarget = "brain";
					if (disk.droneTargetParams) {
						oldTarget = disk.droneTargetParams;
					}
					
					var newTarget;
					
					if (oldTarget == "brain") {
						newTarget = "gut";
					}
					else if (oldTarget == "gut") {
						newTarget = "chest";
					}
					else if (oldTarget == "chest") {
						newTarget = "head";
					}
					else {
						newTarget = "brain";
					}
					
					var room = getRoom("armory");
					for (var i = 0; i< room.items.length; i++) {
						var item = room.items[i];
						if (item.name == "drone-control" ) {
							item.img = item.img.replace(oldTarget,newTarget);
						}
					}
					
					disk.droneTargetParams = newTarget;
					
					println("~Click~ you cycle the targeting parameter to " + disk.droneTargetParams);
					
					
				} 
		    },
			{ 
				name: 'blaster', 
				img:`
+---------------------------------------------+
|                                             |
|             ()                        ()    |
|        +-------------------------------+    |
|        +-------::::---:::::#######::---+    |
|        XxxxxxxX   }                         |
|        XxxxxxXX---                          |
|       XX   XXX                              |
|     XXX XXXX                                |
|     XXXXX                                   |
|                                             |
+---------------------------------------------+
`,
				desc: 'This is a blaster rifle. Keep the business end pointed away from you.', 
				isTakeable:true,
			  	use: ({disk, println, getRoom, enterRoom}) => {
				  
				  if ( disk.roomId == "engineeringFire" ) {
				  	  
					  println("You aim the blaster at the alien, ~zap~ and burn a hole through its torso. It falls to the ground.");
					  
					  // mark the alien as dead
					  disk.alienDead = true;
					  
					  // add the dead alien to engineering
					  var deadAlien = {
						  name: 'alien', 
						  desc: 'This alien is very dead. Yellow blood seeps through the burns in its space suit.', 
						  passiveDesc: 'There is a dead [alien] on the floor.'
					  };
					  
					  var room = getRoom("engineering");
					  room.items.push(deadAlien);
					  
					  enterRoom("engineering");
				  } // end if room is engineering fire
				  else if ( disk.roomId == "kitchenCorridor" ) {
					  println("You fire the blaser at the bulkhead. It makes a nice black burn mark." );
				  }
				  else if ( disk.roomId == "bridgeCorridor" ) {
					  println("You fire the blaster at the portal. The glass melts, forms a hole, and then quickly cools as the air in the room is sucked out. You fall to the floor struggling to breathe." );
					  enterRoom("gameOver");
				  }
				  else if ( disk.roomId == "bridge" ) {
					  println("You fire the blaser at the captain, who slowly falls to the floor and dies. You look at the switches and nobs and realize you have no idea how to pilot the ship. You die of starvation trying to move the ship." );
					  enterRoom("gameOver");
				  }
				  else if ( disk.roomId == "engineering" ) {
					  println("You fire the blaster at the alarm, ~zap~ which seems imprevious to blaster fire." );
				  }
				  else {
					  println('~Zap~ ~zap~ That is going to leave a mark.');
				  } // end else
				  
			  } // end use for blaster
	    }, // end blaster item
		]
    },	



/// engineering
    {
      name: 'Engineering',
      id: 'engineering',
      img: `
_______________________________________________
   |--<>--|   |--<>--|   |--<>--|   |--<>--|     
===============================================
                      (%%)
(--)    (--)          
|~~|    |~~|                           
|~~|    |~~|                           ______
|~~|====|~~|                          | ____ | 
|~~|::::|~~|                          ||    || 
|~~|====|~~|                          |#    || 
(~~)    (~~)                          ||    ||
(~~)____(~~)--------------------------||____||-
      `,
				
      desc: `This is is engineering, it is a large room dedicated to hosting things related to the critical systems on the ship.`,					
	  
		items: [
			
	  		{ name: 'cancel', desc: 'Helpful button for bringing death to the inhabitants of this ship.',
	  	  		use: ({disk, println, getRoom, enterRoom,secureDoorOpen}) => {
					
					if (disk.selfDestruct) {
						println("~Beep~ The countdown stops.");
					}
					else {
						println("~Click~ Doesn't seem to do anything.");
					}
					
					disk.selfDestruct=false;
					disk.selfDestructCodeRequest = false;
	  			}
	  	    },
	  		{ 
				name: '1234',
				skipAutoComplete: true, 
				desc: 'This number is in your mind.',
				printUse: 'You enter your luggage combination into the panel. Nothing happens.'
	  	    },	
	  		{ 
				name: '0000', 
				skipAutoComplete: true,
				desc: 'This number is in your mind.',
				printUse: 'You enter the default self destruct code into the panel. Nothing happens.'
	  	    },	
	  		{ 	
				name: '1188', 
				skipAutoComplete: true,
				desc: 'The keycode is in your mind.',
	  	  		use: ({disk, println, getRoom, enterRoom,secureDoorOpen}) => {
					
					if (disk.selfDestructCodeRequest) {					
						println("You type the code into the panel. Ship wide self-destruct is announced. 10...9...");
						disk.selfDestruct=true;
						if (!disk.alienDead) {
							enterRoom("engineeringFire")
						}
					}
					else {
						println( 'You enter the self destruct code. Nothing happens. Hmm maybe press [self-destruct] first?');
					}
	  			}
	  	    },			
	  		{ name: 'door', desc: 'The door to the engineering. It is secured with a keycard.', passiveDesc: 'There is a [door] to the corridor.',
	  	  		use: ({disk, println, getRoom, enterRoom,secureDoorOpen}) => {
					
					if ( disk.selfDestruct ) {
						println("As you pass through the door the self-destruct count down completes. Whoops. You think 'cancel button' and then ~BOOOM~");
						enterRoom("gameOver");
					}
					else {
						secureDoorOpen(disk,"engineeringCorridor");
				 	}
	  			}
	  	    },
			{ 
				name: 'self-destruct', desc: 'This looks like a switch used to cause the engine to melt down, and kill everyone on the ship. There are keys and a handy [cancel] button.', 
	  	  		use: ({disk, println, getRoom, enterRoom,secureDoorOpen}) => {
					println( '~Beep~ The console asks you to "use" a self destruct code to begin self destruct.');
					disk.selfDestructCodeRequest=true;
	  			},
				img:`
+---------------------------------------------+
|                                             |
|                                             |
|                                             |
|           +----------+  [1]  [2]  [3]       |
|           |   SELF   |  [4]  [5]  [6]       |
|           | DESTRUCT |  [7]  [8]  [9]       |
|           +----------+  [0]  [Cancel]       |
|                                             |
|                                             |
|                                             |
+---------------------------------------------+
`,
			},
			{ 
				name: 'engine', desc: 'This thing makes the ship move, like really fast. Nothing scares spacers more than a malfunctionig engine. This one looks to be working great though. You notice a [self-destruct] console.', 
				passiveDesc: 'There is an [engine] that hums and pulses.', 
				img:`
+---------------------------------------------+
|                                             |
|  +--+  +--+  +--+  +-------+  +---------+   |
|  |  |  |  |  |__|  |       |  |         |   |
|  |__|  |  |  |##|  |       |  | v:0 m/s |   |
|  |##|  |__|  |##|  | ## ## |  |         |   |
|  |##|  |##|  |##|  | ## ## |  | a:0 m/s2|   |
|  |##|  |##|  |##|  |       |  |         |   |
|  |##|  |##|  |##|  |       |  |         |   |
|  +--+  +--+  +--+  +-------+  +---------+   |
|                                             |
+---------------------------------------------+
`,
				printUse: "You look at the enginee, and try to activate it, but this is only possible from the bridge."
			},
			{ 
				name: 'alarm', 
				desc: 'Safety reqs require constant monitoring for fire. This alarm will make noises that demand attention in this room when fire is detected.', 
				img:`
+---------------------------------------------+
|                XXXXXXXXXXX                  |
|             +XXXXXXXXXXXXXXX-+              |
|            XX XX           XXXX             |
|            XXX    +---+     XXX             |
|            XXX    |...| **   |X             |
|            X|X    |...| **   XX             |
|            XX     +---+      X              |
|             XXXX            XX              |
|             +XXXXXXXXXXXXXXXX+              |
|                 XXXXXXXXXX                  |
+---------------------------------------------+
`,
				passiveDesc: 'There is a fire [alarm] mounted to the ceiling.', 
				printUse: "Seeing no buttons you tap on surface of the alarm, but nothing happens."},
		]
    },	
	
	

/// engineering
    {
      name: 'Engineering',
      id: 'engineeringFire',
      img: `
_______________________________________________
   |--<>--|   |--<>--|   |--<>--|   |--<>--|     
===============================================
                      |%%|
(++)    (++)          +--+    
+~~+    +~~+                  __
|~~|    |~~|                 (><)      ______
|~~|====|~~|                 @@@@     | ____ | 
|~~|::::|~~|               ~~|##|~/   ||    || 
+~~+====+~~+                 {  }     |#    || 
(~~)    (~~)                 /  \\     ||    ||
(~~)____(~~)--------------------------||____||--
      `,
				
      desc: `
The door to engineering comes open as an [alien] runs into the room. You need to react quickly!
      `,					
	  
		items: [
			
	  		{ name: 'door', desc: 'The door to the engineering. It is secured with a keycard.', passiveDesc: 'There is a [door] to the corridor.',
	  	  		use: ({disk, println, getRoom, enterRoom,secureDoorOpen}) => {
				   println("You attempt to escape the room by running past the alien.");
				   enterRoom("engAlienDeath");
	  			}
	  	    },
	  		{ name: 'alien', desc: 'This alien is greenish blue, taller than you, holding a menacing blaster.',
	  	  		use: ({disk, println, getRoom, enterRoom,secureDoorOpen}) => {
				   println("You attempt fight the alien with our fists - you really need a weapon. Your blows have no effect.");
				   enterRoom("engAlienDeath");
	  			}
	  	    },
		]
    },	

	
	
/// Bridge corridor
    {
      name: 'Bridge Corridor',
      id: 'bridgeCorridor',
      img: `
_______________________________________________
 < Engineering   O   O   O   O   O   O   O   O
-----------------------------------------------
                                              )
                 +------------+               )
                 |   BRIDGE   |     ______    )
                 | +--------+ |    ( .    )   )
                 | |()()()()| |    |    . |   )
                 | |()()()()| |    (______)   )
                 | |()()()()| |               )
                 | |()()()()| |               )
+----------------|____________|---------------+
      `,
      desc: `This is the corridor that leads to the bridge.`,
       items: [
		{ 
			name: 'door', 
			desc: 'It is a bulkhead [door], it is big, like really big.', 
			passiveDesc: 'There is a [door] that leads to the bridge.', 
  	  		use: ({disk, println, getRoom, enterRoom,secureDoorOpen}) => {
			   
			   // if the alien is alive - player dies
				if (disk.alienDead) {
					enterRoom("bridge");
				}
				else {
					enterRoom("bridgeAlienDeath");
				}
			   
  			}
		},
		{ 
			name: 'portal', 
			desc: 'Looking out the window you see space, and a silver-gray colored ship that you don\'t recognize.', 
			passiveDesc: 'There is a [portal] looking out into space.',
				img:`
+---------------------------------------------+
|                                             |
|                          ________________   |
|   ______________        (  .   .  .   .  )  |
|  (==============)       (________________)  |
|          \\XXX\\              /XX/            |
|            \\XXX\\          /XXX/             |
|               \\ XX+------------+)           |
|                \\---------------+)           |
|                                             |
|                                             |
+---------------------------------------------+
`,
			printUse: "You use the portal to look outside. Still looks like space." 
		},
      ],
      exits: [
		  { dir: 'west', id: 'engineeringCorridor', label: 'a corridor to engineering.' }
      ]
    },
		

/// the bridge
    {
      name: 'Ships Bridge',
      id: 'bridge',
      img: `
_______________________________________________
   |--<>--|   |--<>--|   |--<>--|   |--<>--|     
===============================================
                                ____________
  +------------+               (            )
  |            |               |  .      .  |
  | +--------+ |       '''     |       ~    |
  | |()()()()| |      (. .)    |    .       |
  | |()()()()| |       \\O/     (____________)
  | |()()()()| |        #
  | |()()()()| |       J#L
--|____________|-------------------------------
      `,
      oneTimeDesc: `The [captain] sees you as you enter, and is relieved to see you.`,
      desc: `This is the ships bridge.`,
       items: [
		{ 
			name: 'door', 
			desc: 'It is a bulkhead door, really big and heavy.', 
			passiveDesc: 'There is a [door] that leads to the corridor.', 
			doorLocation: 'bridgeCorridor'
		},
		{ 
			name: 'captain',
			desc: 'The captain is restrained by a [rope]. The captain wants to be untied.',
			passiveDesc: 'The [captain] is tied up.',
			printUse: 'People don\'t like to be used.'
		},
		{ 
			name: 'rope',
			desc: 'This rope is restraining the [captain].',
			doorLocation: 'winRoom'
		},
		{ name: 'viewscreen', desc: 'Looking at viewscreen you see space, and a silver-gray colored ship that you don\'t recognize.', passiveDesc: 'There is a view [viewscreen].' },
      ],

    },


	
/// Vents
    {
      name: 'Vents',
      id: 'vents',
      img: `
+------------------+         +----------------+
|   (|@|) (|@|)    |  NORTH  | (|@|)  (|@|)   |
+------------------+         +----------------+
 XXXX                                        ##
X\\../X                                       ##
X.\\/.X                                       ##
X./\\.X                                       ##
X/..\\X                                       ##
 XXXX                                        
+------------------+         +----------------+
|   (|@|) (|@|)    |  SOUTH  |   (|@|)  (|@|) |
+------------------+         +----------------+
      `,
      desc: `
You are in the air vent system. The floor it sparkling clean.
      `,
		
		
        items: [
	   		{ name: 'fan', desc: 'A fast spinning fan, like crazy fast. This is the fan your mom warned you about touching.', passiveDesc: 'There is a [fan] to the west.',
	   	  		use: ({disk, println, getRoom, enterRoom}) => {
	 				println("You touch the fan, it takes your hand off. You bleed out and die in the vents.");
					enterRoom("gameOverHandGone");	
	   			}
	   	    },
			{ 
				name: 'east-vent', 
				desc: 'A vent cover loosely in place.', 
				passiveDesc: 'This is a [east-vent] covering an exit to the east.',
				doorLocation: 'kitchen'
		    }
		],
					
	  
      exits: [
		  { dir: 'north', id: 'ventsNorth', label: 'a passage way towards more vents.' },
		  { dir: 'south', id: 'ventsSouth', label: 'a passage way towards more vents.' }
      ]
    },	
		


/// Vents
    {
      name: 'Vents',
      id: 'ventsSouth',
      img: `
+--------------+         +--------------------+
| (|@|) (|@|)  |  NORTH  |  (|@|) (|@|) (|@|) |
+--------------+         +--------------------+
##                                           ##
##                                        [$]##
##                                           ##
##                                           ##
##                                           ##
                                             ##
+---------------------------------------------+
|  (|@|) (|@|) (|@|) (|@|) (|@|) (|@|) (|@|)  |
+---------------------------------------------+
      `,
      desc: `
You are in the air vent system.
      `,					
	  
		items: [
			
			{ 
				name: 'credit', 
				desc: 'Currency vouchers, good various goods and services.', 
				passiveDesc: 'There is a [credit] chit stuck near an exit vent.',
				isTakeable:true,
				printUse: "You squeeze the credit between your fingers, but nothing happens. Try using this with a credit reading machine."
		    },
			{ name: 'east-vent', desc: 'A vent cover firmly in place.', passiveDesc: 'This is a [east-vent] covering an exit to the east.',
		  		use: ({disk, println, getRoom, enterRoom}) => {
				   println("You try to open it, but it is firmly in place.")	
				}
		    },
			{ 
				name: 'west-vent', 
				desc: 'A vent cover loosely in place.', 
				passiveDesc: 'This is a [west-vent] covering an exit to the west.',
				doorLocation: 'brig'
		    },
			
		],
	  
	  
      exits: [
		  { dir: 'north', id: 'vents', label: 'a passage way towards more vents.' },
      ]
    },	
		



/// Vents
    {
      name: 'Vents',
      id: 'ventsNorth',
      img: `
+---------------------------------------------+
|  (|@|) (|@|) (|@|) (|@|) (|@|) (|@|) (|@|)  |
+---------------------------------------------+
##                                           ##
##                                           ##
##                                           ##
##                                           ##
##  %P                                       ##
## 
+---------------------+         +-------------+
|  (|@|) (|@|) (|@|)  |  SOUTH  | (|@|) (|@|) |
+---------------------+         +-------------+
      `,
      desc: `
You are in the air vent system.
      `,					
	  
		items: [
			
			{ name: 'mouse', desc: 'You look closely and confrim 3 things: 1) mouse. 2) dead. 3) smelly.', passiveDesc: 'There is a dead [mouse] near the west vent.', isTakeable:true, printUse: "You are not that hungry." },
			{ name: 'west-vent', desc: 'A vent cover firmly in place.', passiveDesc: 'This is a [west-vent] covering an exit to the west.',
		  		use: ({disk, println, getRoom, enterRoom}) => {
				   println("You try to open it, but it is firmly in place.")	
				}
		    },
			{ name: 'east-vent', desc: 'A vent opened from the outside.', passiveDesc: 'This an open [east-vent] covering an exit to the east.',
		  		use: ({disk, println, getRoom, enterRoom}) => {
					println("You shimmy out the exit.");
					enterRoom("engineerOffice");
				}
		    },
			
		],
	  
	  
      exits: [
		  { dir: 'south', id: 'vents', label: 'a passage way towards more vents.' },
      ]
    },	
		
		
		


/// engineer's office
    {
      name: 'Chief Engineers Office',
      id: 'engineerOffice',
      img: `
_______________________________________________
   |--<>--|   |--<>--|   |--<>--|   |--<>--|     
===============================================

  +-----+
  |###  |
  |###  |               +---+          ______
  +-----+               |(!)|         | ____ | 
                     +----------+     ||    || 
                     ||        ||     |#    || 
                     ||        ||     ||    ||
+--------------------||--------||-----||____||-
      `,
		
oneTimeDesc: `You lower your self out of the vent, feeling grateful that it was left open.`,
		
      desc: `This is the chief engineers office. No one is here. You get the sense that a lot of thoughts happen in this room, engineering thoughts.`,					
	  
		items: [
			
			{ 
				name: 'desk', 
				desc: 'Standard desk, has a top [drawer] and a [computer] sitting on it.', 
				passiveDesc: 'There is a [desk] in the corner.', 
				printUse: "You sit at desk, rest your arms on the top.",
				img:`
+---------------------------------------------+
|             --------------------            |
|             |  +------------+  |            |
|             |  |            |  |            |
|             |  |  WARNING ! |  |            |
|             |  +------------+  |            |
|			  ---------##---------	          |
|     +----------------##----------------+    |
|     |                                  |    |
|     |  +----------[      ]-----------+ |    |
|     |                                  |    |
+-----+----------------------------------+----+
`,
			},
			{ 
				name: 'computer', 
				desc: 'It is a computer, looks like the chief left it locked.', 
		  		use: ({disk, println, getRoom, enterRoom}) => {
					println("You pause and think about what you know about engineers. Engineers work on spaceship engines, and like to fix things.\nYou make some guesses at the password. Then you notice the screen become very bright, and explode in your face.");
					enterRoom("gameOver");
				},
				img:`
+---------------------------------------------+
|                                             |
|          +------------------------+         |
|          |  Username: [        ]  |         |
|          |                        |         |
|          |  Password: [        ]  |         |
|          |                 [Login]|         |
|          +------------------------+         |
|                                             |
|  /!\\  WARNING! Repeated Login attempts  /!\\ |
|       Will cause permanent user error.      |
+---------------------------------------------+
`
		    },
			{ 
				name: 'drawer', 
				desc: 'It is a rectangular drawer with a handle. Inside the drawer you see papers.', 
				printUse: "You slide the drawer out and sit on it. Not quite as comfortable as a chair.",
				optionalDescKeyItem: "keycard",
				optionalDesc: "You also see a [keycard] in the drawer.",
				img:`
+---------------------------------------------+
|                                             |
|   +-------------------+           +------+  |
|   |        PAPER      |           |  __  |  |
|   |   +---------------+----+      | X__  |  |
|   |   |        PAPER       |      | X    |  |
|   |   |    +---------------+--+   | XXX  |  |
|   |   |    |      PAPER       |   | XXX  |  |
|   |   |    |                  |   |      |  |
|   |   |    |                  |   +------+  |
|   |   |    |                  |             |
+---+---+----+------------------+-------------+
`	
		    },
			{ 
				name: 'keycard', 
				desc: 'This is the engineer\'s keycard.', 
				isTakeable:true,
				printUse:"This allows you to open secure doors. Use doors to use it.",
				img:`
+---------------------------------------------+
|                                             |
|          +-----------------------+          |
|          |                       |          |
|          |     +-----------+     |          |
|          |     |XXX|  XX  XX     |          |
|          |     |XXX|  XX  XX     |          |
|          |     |XXX|             |          |
|          |     +---+             |          |
|          |        KEY CARD       |          |
|          +-----------------------+          |
+---------------------------------------------+
`,
		    },
			{ name: 'vent', desc: 'An air vent.', 
		  		use: ({disk, println, getRoom, enterRoom}) => {
					println("You remove the cover to the vent, and squeeze in.");
					enterRoom("ventsNorth");
				}
		    },
			{ name: 'door', desc: 'Secure door to the engineers room.', passiveDesc: 'There is a secure [door] preventing access to this room.',
		  		use: ({disk, println, getRoom, enterRoom, secureDoorOpen}) => {
					secureDoorOpen(disk,"kitchenCorridor");	
				}
		    },
		]
    },	
		



/// brig
    {
      name: 'Brig',
      id: 'brig',
      img: `
_______________________________________________
   |--<>--|   |--<>--|   |--<>--|   |--<>--|     
===============================================

                                       +-----+
                                       |  ###|
    _____                              |  ###|
   | | | |                             +-----+
   | | | |
   | | | |
   | | | |       
+--| | | |----------%%%%%%%%%%%%%%%-----------+
      `,
		desc: `This looks like a place to store bad people. Currently empty, other than you.`,

		items: [
			
			{ 
				name: 'vent', 
				desc: 'An air vent.', 
				passiveDesc:'A loose [vent] provides access into the vents.',
		  		use: ({disk, println, getRoom, enterRoom}) => {
					println("You remove the cover to the vent, and squeeze in.");
					enterRoom("ventsSouth");
				}
		    },
			
			{ 
				name: 'paper', 
				desc: 'Piece of paper with writting on it.', 
				img:`
+---------------------------------------------+
|                                             |
|                                             |
|         +-----------------------------+     |
|         |            PAPER            |     |
|         |                             |     |
|         |                             |     |
|         |     Self Destruct Code:     |     |
|         |            1188             |     |
|         |                             |     |
|         |                             |     |
+---------+-----------------------------+-----+
`,
		  		use: ({disk, println, getRoom, enterRoom}) => {
					if (disk.roomId == "engineering") {
						println("You place the paper on the console so you can easily type the number. You should 'use' the code written on the paper.");
					}
					else {
						println("You could eat it, but there is proper food in galley so why?");
					}
				},
				isTakeable:true
		    },
			
			{ 
				name: 'door', 
				desc: 'A secure cell door.', 
				passiveDesc:'A secure [door] restricts access in and out of this room.',
				printUse: 'You try to open the door, but is is not designed to opened from this side.'
		    },
			
            { 
  			  name: 'bed', 
			  desc: 'Looks like a nice place to sleep, as nice as a mattress on the floor is nice.',
			  passiveDesc: 'There is [bed] on the floor.',
			  optionalDesc: ' You notice a folded piece of [paper] under the mattress.',
			  optionalDescKeyItem: 'paper',
  			  use: ({disk, println, getRoom, enterRoom}) => {
  				  println('Exhausted, you lie down for a nice rest. While you are asleep the invaders from the ship find you and kill you.')
  				  enterRoom('gameOver');
  			  } 
  		   }
		   	
						
		]
    },	
		


	
	
/// Kitchen corridor
    {
      name: 'Kitchen Corridor',
      id: 'kitchenCorridor',
      img: `
_______________________________________________
 O   O   O   O   O   O   O   O   O   Midship >
-----------------------------------------------		
 | 
^|                 +-----------+        
 |   CHIEF ENG.    |  AIRLOCK  |        GALLEY
^|    ______       |   _____   |        ______
 |   | ____ |      |  |     |  |       | ____ | 
^|   ||    ||      |  |-----|  |       ||    || 
 |   |#    ||      |  |-----|  |       |o    || 
^|   ||    ||      |  |_____|  |       ||    ||
_|---||____||------|___________|-------||____||
      `,
		
	  oneTimeDesc: `As you enter you notice the presure [bulkhead] is sealing this part of the ship off from the rest, which is better than being dead.`,
      desc: `This is the corridor which leads to the airlock, galley and engineer\'s office. You see bits of trash, and [blood] tracks leading towards the airlock. To the west, access is blocked by a presure [bulkhead].`,
       items: [
		{ name: 'galley-door', desc: 'It is a door.', passiveDesc: 'There is a [galley-door] that leads to the galley.', doorLocation: 'kitchen' },
		{ name: 'blood', desc: 'It is red. It looks like someone was dragged through the airlock while bleeding.' },
		{ name: 'bulkhead', desc: 'This bulkhead sealed this part of the ship off during the attack. The indicator says other side is in vacuum. There is a [switch] to raise the door.', printUse:'You use the bulkhead to lean against. As walls go, it is a decent leaning place.' },
		{ name: 'switch', desc: 'This switch is used to raise the bulkhead.', printUse:'You flip the lever to open the bulkhead. ~Beep!~ It won\'t open until there is no vacuum on the others side.' },
  		{ 
			name: 'engineer-door', 
			desc: 'The door to the engineer\'s office. It is secured with a keycard.', 
			passiveDesc: 'There is a [engineer-door] to chief engineers office.',
			img:`
+---------------------------------------------+
|                                             |
|          +-------------+ +-----------+      |
|          |             | | SCAN KEY  |      |
|          |   XXXXXXX   | |   CARD    |      |
|          |  XX     XX  | +-----------+      |
|          |  XXXXXXXXX  |   +-------+        |
|          |  XXXXXXXXX  |   |.......|        |
|          |  XXXXXXXXX  |   |.......|        |
|          |             |   +-------+        |
|          +-------------+                    |
+---------------------------------------------+
`,
  	  		use: ({disk, println, getRoom, enterRoom, secureDoorOpen}) => {
				secureDoorOpen(disk,"engineerOffice");	
  			}
  	    },
   		{ 
			name: 'airlock', 
			desc: 'This airlock is used to gain access to outside the ship.', 
			passiveDesc: 'There is a door to the [airlock].',
			img:`
+---------------------------------------------+
|                                             |
|      /---------------------------------\\    |
|      |#################################|    |
|      |######### ( AIR LOCK ) ##########|    |
|      |###+-------------------------+###|    |
|      |###|                         |###|    |
|      |###|                  .      |###|    |
|      |###|          .              |###|    |
|      |###|    .                    |###|    |
|      |###|                     .   |###|    |
+---------------------------------------------+
`,
			printUse: "You look in the window to the door lock and see space outside, if you open this without a space suit you will die."
   	    },
      ],
      exits: [
		  { dir: 'east', id: 'bunkCorridor', label: 'a corridor to midship.' }
      ]
    },
		
	
/// Kitchen 
    {
      name: 'Galley',
      id: 'kitchen',
      img: `
_______________________________________________
   |--<>--|   |--<>--|   |--<>--|   |--<>--|     
===============================================

                                       +-----+
                                       |#####|
   ______    [---]                     |#####|
  | ____ |   |   |                     +-----+
  ||    ||   | $ |    ____________
  |o    ||   | - |    ||        ||     ~~~~~~
  ||    ||   |   |    ||        ||     | F  |
--||____||---|___|----||--------||-----|____|---
      `,
      desc: `
This is the galley. The crew eats their meals here. Unlike the rest of the ship this room looks clean.`,
       items: [
		   { 
			   name: 'cooler', 
			   desc: 'It is a cooler, good at keeping things cold.', 
			   optionalDescKeyItem: "food",
			   optionalDesc: "You see a can of [food] in the cooler.",
			   printUse: "You put your head in the cooler. Feels nice and cool."
		   },
		   { name: 'door', desc: 'It is a door.', passiveDesc: 'There is a [door] that leads to the corridor.', doorLocation: 'kitchenCorridor' },
		   { 
			   name: 'food', 
			   desc: 'It is food alright. Says so right on the can.', 
			   isTakeable:true,
			   img:`
+---------------------------------------------+
|              XXXXXXXXXXXXXXX                |
|         XXXXX               XXXXX           |
|       XXX                       XXX         |
|       +             @             +         |
|       |XX                      XXX|         |
|       |  XXXX               XXXX  |         |
|       |      XXXXXXXXXXXXXXXX     |         |
|       |                           |         |
|       |           F O O D         |         |
|       |                           |         |
+-------+---------------------------+---------+
`,
			   use: ({disk, println, getRoom, enterRoom}) => {
				   if (disk.roomId == "engineeringFire") {
					   println("You wind up, and throw the can at the alien's head. The alien catches the can, pauses, and tilts its head to look at the can.");
					   enterRoom("engAlienDeath");
				   }
				   else {
					   println("Mm Mm. If I put it on a plate. I'll enjoy it more.");
				   }
			   }
	       },
  		   { 
			   name: 'pen',
			   desc: 'This here is an ink pen, for writting on stuff. It is sharp as far as pens go.', 
			   passiveDesc:'On the table you see a [pen].', 
			   isTakeable:true,
			   img:`
+---------------------------------------------+
|                                             |
|                                             |
|                                             |
|       +----------------------------+\\       |
|       |           P E N            | -      |
|       +----------------------------+/       |
|                                             |
|                                             |
|                                             |
|                                             |
+---------------------------------------------+
`,
			   use: ({disk, println, getRoom, enterRoom}) => {
				   
				  
				  if ( disk.roomId == "engineeringFire" ) {
 					  println("You leep forward and jam the pen into the eye of the alien. Take that!");
					  
 					  // mark the alien as dead
 					  disk.alienDead = true;
					  
 					  // add the dead alien to engineering
 					  var deadAlien = {
 						  name: 'alien', 
 						  desc: 'This alien is very dead. Yellow blood seeps from the wound in its eye.', 
 						  passiveDesc: 'There is a dead [alien] on the floor.'
 					  };
					  
 					  var room = getRoom("engineering");
 					  room.items.push(deadAlien);
					  
 					  enterRoom("engineering");
				   }
				   else if ( disk.alienDead ) {
					   println("You remove the lid, and write on your arm, 'Revenge complete.'");
				   }
				   else {
				   		println("You remove the lid, and write on your arm, \'Revenge!\'. Now lets get to it.")	
				   }
				   
				   
			   }
      	  },
			{ 
				name: 'vent', 
				desc: 'It is an air vent for extra ventilation in the cooking area. It looks large engough for you to squeeze in.', 
				passiveDesc:'Above the [cooler] you see a large [vent].',
				img:`
+---------------------------------------------+
|                                             |
|      +----------------------------------+   |
|      |##################################|   |
|      |##+------+###+------+###+------+##|   |
|      |##|      |###|      |###|      |##|   |
|      |##|      |###|      |###|      |##|   |
|      |##+------+###+------+###+------+##|   |
|      |##################################|   |
|      |##+------+###+------+###+------+##|   |
|      |##|      |###|      |###|      |##|   |
+---------------------------------------------+
`,
				use: ({disk, println, getRoom, enterRoom}) => {
					println("You remove the cover to the vent, and squeeze in.");
					enterRoom("vents");
				}
    	  },
		  { name: 'machine', desc: 'It is a vending machine full of tasty snacks.', passiveDesc:'Next to the door you see a vending [machine].',
	  		use: ({disk, println, getRoom, enterRoom}) => {

			  var hasCredit = false;
              disk.inventory.forEach(item => {
				  if (item.name == 'credit') {
					  hasCredit = true;
				  }
              });
			  
			  if (hasCredit) {
			  	println("You insert a credit, and an error light blinks, and ejects your credit. The thing is broken!");
			  }
			  else {
			  	println("You need a credit chit to use this machine.");
			  }

			}
	  	  }
      ]
    },
	
	
	
	
  // Game Over	  
      {
	    oneTimeDesc: `Congratulations! The answer for this puzzle is "Galaxy Quest"`,
        name: 'Game Over',
        id: 'winRoom',
        img: `
_______________________________________________
   |--<>--|   |--<>--|   |--<>--|   |--<>--|     
===============================================
                                ____________
  +------------+               (            )
  |   BRIDGE   |               |            |
  | +--------+ |       '''     | THE   END  |
  | |()()()()| |      (. .)    |            |
  | |()()()()| |       \\-/     (____________)
  | |()()()()| |        #
  | |()()()()| |       J#L
--|____________|-------------------------------
        `,
        desc: `
The captain thanks you for your assitance. The captain asks you to retrieve your mop and start cleaning up the ship. The captain rises from the command chair and moves to start planning a rescue for the remaining crew members.
Your game has ended. Reload browser to restart.
		  `
      },		
	
	
	
  ],
};