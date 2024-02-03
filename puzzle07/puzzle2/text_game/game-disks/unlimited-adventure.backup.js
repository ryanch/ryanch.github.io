// http://asciiflow.com/
// https://github.com/okaybenji/text-engine

const unlimitedAdventure = {
  roomId: 'closet',
  inventory: [],
  rooms: [
	  
	  
  // Game Over	  
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
	  
	  
// CLOSET	  
    {
      name: 'Closet',
      id: 'closet',
      img: `
+---------------------------------------------+
|    |------|      |-------|        |---|     |
+---------------------------------------------+

                          +-------+
      +----+              |       |
      | %% |              |       |
      | %% |              |       |  +--------+
      +----+              | *     |  | [][][] |
                          |       |  +--------+
                          |       |  | [][][] |
+-------------------------+-------+--+--------+
      `,
	  oneTimeDesc: `You find your self in a cleaning closet, scared out of your mind. The intruder alarm from the ship is sounding.`,
      desc: `
Drab lights line the top of the room, the wall has a poster of some far gone video drama. 
This closet smells like it was recently used as a toliet.
There is a [shelf] with cleaning supplies near the [door].`,
      items: [
		{ name: 'door', desc: 'It is a door.', passiveDesc: 'There is a [door] that you used to enter the closet.', doorLocation: 'bunkCorridor' },
		{ name: 'shelf', desc: 'It is a shelf built to hold things, stocked with plenty of [cleaner].' },
		{ name: 'toliet-paper', desc: 'Standard issue toliet paper.', passiveDesc: 'There is a roll of [toliet-paper] in the corner.', isTakeable:true,
	  		use: ({disk, println, getRoom, enterRoom}) => {
			   println("You think about using the toilet paper, but reconsider given that you relieved your self in the closet earlier.")	
			}
	    },
		{ name: 'cleaner',  desc: 'Bottle of cleaner. Used to clean things.',  isTakeable:true }
      ]
    },
	
	
/// BUNK C	
    {
      name: 'Midship Corridor',
      id: 'bunkCorridor',
      img: `

+-+-----------------------------------------+-+
| < Kitchen  |---------------|  Engineering > |
+-+-----------------------------------------+-+

      JANITOR                   BUNKS
     +------+       +-+       +------+
     |      |       |#+-+     |      |
     |      |       +-+#|     |      |
     | *    |         +-+     | *    |
     |      |     #           |      |
     |      |      ##         |      |
+----+------+---------+-------+------+--------+
      `,
	  oneTimeDesc: `Gathering your courage you leave the closet.`,
      desc: `
This is a corridor in the ship, nearly at the middle of the ship.
Not much to see here, other than the blaster burns mixed with blood on the floor.
      `,
      exits: [
         { dir: 'west', id: 'kitchenCorridor', label: 'a corridor to the kitchen.' },
		 { dir: 'east', id: 'engineeringCorridor', label: 'a corridor to the engineering area.' }
      ],
      items: [
		{ name: 'closet-door', desc: 'It is a door.', passiveDesc: 'There is a [closet-door] that leads to a closet.', doorLocation: 'closet' },
		{ name: 'bunk-door', desc: 'It is a door.', passiveDesc: 'There is a [bunk-door] that leads to the bunk room.', doorLocation: 'bunkRoom' },
      ]
	  
    },
	
	
/// BUNK ROOM
    {
      name: 'Bunk Room',
      id: 'bunkRoom',
      img: `
+---------------------------------------------+
|   |---|    |---|   |---|     |----|    |----|
+---------------------------------------------+

              +------------+         +--------+
 +-----+      +------------+         |   ||   |
 |     |      |            |         |   ||   |
 |     |      |            |         |   ||   |
 | *   |      +------------+         |#/#||   |
 |     |      +------------+         |   ||%# |
 |     |      |            |         |%%/||/% |
++-----+------+------------+------------------+
      `,
	  oneTimeDesc: `It would be nice to take a nap here, but need to focus!`,
      desc: `
This is the room where the crew sleeps when off duty. There is a bunk [bed] with sleeping mats on them.
On one wall are [lockers]. It looks like they have been forced open, with their contents tossed.`,
        items: [
		  { name: 'door', desc: 'It is a door.', passiveDesc: 'There is a [door] that leads to the corridor.', doorLocation: 'bunkCorridor' },
          { 
			  name: 'bed', desc: 'Looks like a nice place to sleep.',
			  use: ({disk, println, getRoom, enterRoom}) => {
				  println('Exhausted you lie down for a nice rest. While you are a sleep the invaders from the ship find you and kill you.')
				  enterRoom('gameOver');
			  } 
		  },
		  { name: 'lockers', desc: 'Whomever was searching here was in a hurry. You see clothes, and personal items tossed about.' },
		  { 
			  name: 'lighter', 
			  desc: 'This device makes flames - it lights things.', 
			  passiveDesc: 'There is a [lighter] on the floor amoung the mess.', 
			  isTakeable:true,
		      use: ({disk, println, getRoom, enterRoom}) => {
					  
				  var hasTP = false;
	              disk.inventory.forEach(item => {
					  if (item.name == 'toliet-paper') {
						  hasTP = true;
					  }
	              });
					  
				  // if they have they TP they can make fire
				  if (hasTP) {
				    println("You wad up a ball of toilet paper and light it with the lighter. It smokes, burns, and turns to ash.");
				  }
				  else {
					  // if they don't have TP give hint about TP	
					  println("You flick the switch on the lighter and look at pretty flame, and think if only I had something to burn.");
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
+-+-----------------------------------------+-+
| < Midship  |---|    |--|    |---|  Bridge > |
+-+-----------------------------------------+-+

      ARMORY                   ENGINE ROOM
     +------+   %         #      +------+
     |      |    |#       ##     |      |
     |      |    #        |      |      |
     | #    |             #      | #    |
     |      |                    |      |
     |      |                    |      |
+----+------+--------------------+------+-----+
      `,
	  oneTimeDesc: `As you enter the engine room corridor you hear yelling coming from the ship bridge.`,
      desc: `
This is the corridor that connects the midship to the bridge and enginee room.
There are many blaster burns on the floor and walls, it looks like a battle took place here.`,
       items: [
  		{ name: 'armory-door', desc: 'The door to the armory. It is secured with a keycard.', passiveDesc: 'There is a [armory-door] to the armory.',
  	  		use: ({disk, println, getRoom, enterRoom,secureDoorOpen}) => {
			   secureDoorOpen(disk,"armory")
  			}
  	    },
		{ name: 'engineering-door', desc: 'The door to the engineering room. It is secured with a keycard.', passiveDesc: 'There is a [engineering-door] door to the engine room.',
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
	
	
/// Engineering Corridor
    {
      name: 'Enginering Corridor',
      id: 'engineeringCorridor',
      img: `
+-+-----------------------------------------+-+
| < Midship  |---|    |--|    |---|  Bridge > |
+-+-----------------------------------------+-+

      ARMORY                   ENGINE ROOM
     +------+   %         #      +------+
     |      |    |#       ##     |      |
     |      |    #        |      |      |
     | #    |             #      | #    |
     |      |                    |      |
     |      |                    |      |
+----+------+--------------------+------+-----+
      `,
	  oneTimeDesc: `As you enter the engine room corridor you hear yelling coming from the ship bridge.`,
      desc: `
This is the corridor that connects the midship to the bridge and enginee room.
There are many blaster burns on the floor and walls, it looks like a battle took place here.`,
       items: [
  		{ name: 'armory-door', desc: 'The door to the armory. It is secured with a keycard.', passiveDesc: 'There is a [armory-door] to the armory.',
  	  		use: ({disk, println, getRoom, enterRoom,secureDoorOpen}) => {
			   secureDoorOpen(disk,"armory")
  			}
  	    },
		{ name: 'engineering-door', desc: 'The door to the engineering room. It is secured with a keycard.', passiveDesc: 'There is a [engineering-door] door to the engine room.',
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
+---------------------------------------------+
|      |----|       |----|          |----|    |
+---------------------------------------------+


                          +---------------+
               +-----+    |               |
               |     |    |  {}  {}  {}   |
  !!!!!!!      |     |    |   |   |   |   |
  + #X# +      | #   |    |   /   /   /   |
  |     |      |     |    |               |
+-+-----+------+-----+----+------------------++
      `,
				
      desc: `
This is the armory. Despite the name, you see no armor, only weapons. Seems more like a weaponry.
      `,					
	  
		items: [
			
	  		{ name: 'door', desc: 'The door to the armory. It is secured with a keycard.', passiveDesc: 'There is a [door] to the corridor.',
	  	  		use: ({disk, println, getRoom, enterRoom,secureDoorOpen}) => {
				   secureDoorOpen(disk,"engineeringCorridor")
	  			}
	  	    },
			{ name: 'weapon-rack', desc: 'This weapon rack is well stocked with multiple [blaster] rifles.', passiveDesc: 'There is a [weapon-rack] on the wall.'},
			{ name: 'drone-control', desc: 'This is the drone control system recently installed. It has a warning that only authorized people should use this system.', 
			  passiveDesc: 'There is a [drone-control] system on the opposite wall.',
			  use: ({disk, println, getRoom, enterRoom}) => {
				  println('Despite the warning you enable the drone control system. After a whir and buzz a small drone rises. It spots you and melts your brain.')
				  enterRoom('gameOver');
			  } 
		    },
			{ name: 'blaster', desc: 'This is a blaster rifle. Keep the business end pointed away from you.', isTakeable:true,
			  use: ({disk, println, getRoom, enterRoom}) => {
				  println('Pop pop. Thats going to leave a mark.')
			  } 
	    },
		]
    },	

	
	
/// Bridge corridor
    {
      name: 'Bridge Corridor',
      id: 'bridgeCorridor',
      img: `
+--+------------------------------------------+
|  < Engineering        |----|      |----|    |
+--+------------------------------------------+
                                              )
                 +------------+               )
                 |   BRIDGE   |               )
                 | +--------+ |    +------+   )
                 | |()()()()| |    |      |   )
                 | |()()()()| |    +------+   )
                 | |()()()()| |               )
                 | |()()()()| |               )
+----------------+------------+---------------+
      `,
      oneTimeDesc: `You can hear the sounds of blaster fire and yelling coming from the bridge.`,
      desc: `This is the corridor that leads to the bridge.`,
       items: [
		{ name: 'door', desc: 'It is bulkhead door, really big and heavy.', passiveDesc: 'There is a [door] that leads to the bridge.', doorLocation: 'bridge' },
		{ name: 'portal', desc: 'Looking out the window you see space, and close by a azure colored ship, that you don\'t recognize.', passiveDesc: 'There is a view [portal] looking out into space.' },
      ],
      exits: [
		  { dir: 'east', id: 'engineeringCorridor', label: 'a corridor to engineering.' }
      ]
    },
		
	
	
/// Vents
    {
      name: 'Vents',
      id: 'vents',
      img: `
+------------------+         +----------------+
|  (|-|)  (|-|)    |  NORTH  | (|-|)  (|-|)   |
+------------------+         +----------------+
XXXXXX                                       ##
X....X                                       ##
X..X.X                                       ##
X.X..X
X....X
XXXXXX
+------------------+         +----------------+
|   (|-|) (|-|)    |  SOUTH  |    (|-|) (|-|) |
+------------------+         +----------------+
      `,
      desc: `
You are in the air vent system. The floor it sparkling clean.
      `,
		
		
        items: [
   		{ name: 'fan', desc: 'A fast spinning fan, like crazy fast. This is the fan your mom warned you about touching.', passiveDesc: 'There is a [fan] to the west.',
   	  		use: ({disk, println, getRoom, enterRoom}) => {
 				println("You touch the fan, it takes your arm off. You bleed out and die in the vents.");
				enterRoom("gameOver");	
   			}
   	    }
		],
					
	  
      exits: [
		  { dir: 'north', id: 'ventsNorth', label: 'a passage way towards more vents.' },
		  { dir: 'east', id: 'kitchen', label: 'is the galley.' },
		  { dir: 'south', id: 'ventsSouth', label: 'a passage way towards more vents.' }
      ]
    },	
		


/// Vents
    {
      name: 'Vents',
      id: 'ventsSouth',
      img: `
+--------------+         +--------------------+
| (|-|) (|-|)  |  NORTH  | (|-|)  (|-|) (|-|) |
+--------------+         +--------------------+
##                                           ##
## [$]                                       ##
##                                           ##
##                                           ##
##                                           ##
##                                           ##
+---------------------------------------------+
|   (|-|) (|-|)  (|-|)   (|-|)    (|-|) (|-|) |
+---------------------------------------------+
      `,
      desc: `
You are in the air vent system..
      `,					
	  
		items: [
			
			{ name: 'credit', desc: 'Currency vouchers, good various goods and services.', passiveDesc: 'There is a [credit] chit stuck near an exit vent.', isTakeable:true,
		  		use: ({disk, println, getRoom, enterRoom}) => {
				   println("You can't use that here.")	
				}
		    },
			{ name: 'west-vent', desc: 'A vent cover firmly in place.', passiveDesc: 'This is a [west-vent] covering an exit to the west.',
		  		use: ({disk, println, getRoom, enterRoom}) => {
				   println("You try to open it, but it is firmly in place.")	
				}
		    },
			{ name: 'east-vent', desc: 'A vent cover firmly in place.', passiveDesc: 'This is a [east-vent] covering an exit to the east.',
		  		use: ({disk, println, getRoom, enterRoom}) => {
				   println("You try to open it, but it is firmly in place.")	
				}
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
| (|-|) (|-|)  (|-|)   (|--|)     (|-|) (|-|) |
+---------------------------------------------+
##                                           ##
##                                           ##
##                                           ##
##
##  %-
##
+---------------------+         +-------------+
|   (|-|) (|-|)       |  SOUTH  | (|-|) (|-|) |
+---------------------+         +-------------+
      `,
      desc: `
You are in the air vent system.
      `,					
	  
		items: [
			
			{ name: 'mouse', desc: 'You look closely and confrim 3 things. It is dead. It is a mouse. And, it smells.', passiveDesc: 'There is a dead [mouse] near the west vent.', isTakeable:true },
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
+---------------------------------------------+
|  |---|   |---|   |---------|   |--------|   |
+---------------------------------------------+

  +-----+
  |###  |
  |###  |               +---+         +-----+
  +-----+               |(!)|         |     |
                     +----------+     |     |
                     ||        ||     | *   |
                     ||        ||     |     |
+-------------------------------------+-----+-+
      `,
		
oneTimeDesc: `You lower your self out of the vent, feeling grateful that it was left open.`,
		
      desc: `
This is the chief engineers office. No one is here. You get the sense that a lot of thoughts happen in this room, engineering thoughts.
      `,					
	  
		items: [
			
			{ name: 'desk', desc: 'Standard desk, has a top [drawer] and a [computer] sitting on it.', passiveDesc: 'There is a [desk] in the corner.' },
			{ name: 'computer', desc: 'It is a computer, looks like the chief left it locked. There is a warning which says failed login attempts are fatal to the user.', 
		  		use: ({disk, println, getRoom, enterRoom}) => {
					println("You pause and think about what you know about the engineer. He works on space ship engines. He likes to fix things.\nYou make some guesses at his password. Then you notice the screen become bright, and explode in your face.");
					enterRoom("gameOver");
				}
		    },
			{ name: 'drawer', desc: 'It is a rectangular drawer with a handle.', 
		  		use: ({disk, println, getRoom, enterRoom}) => {
					println("You open the drawer and see some papers, and a [keycard].");
				}
		    },
			{ name: 'keycard', desc: 'This is the engineers keycard.', isTakeable:true,
		  		use: ({disk, println, getRoom, enterRoom}) => {
					println("This allows you to open secure doors. Use doors to use it.");
				}
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
		


	
	
/// Kitchen corridor
    {
      name: 'Kitchen Corridor',
      id: 'kitchenCorridor',
      img: `
+-------------------------------------------+-+
|  |--|      |---|    |--|    |---| Midship > |
+-------------------------------------------+-+

 CHIEF ENG.     +-----------+         GALLEY
  +------+      |  AIRLOCK  |        +------+
  |      |      |  +-----+  |        |      |
  |      |      |  |-----|  |        |      |
  | #    |      |  |-----|  |        | *    |
  |      |      |  |-----|  |        |      |
  |      |      |  |-----|  |        |      |
+-+------+------+-----------+--------+------+-+
      `,
      desc: `
This is the corridor leads to the airlock, galley and engineer\'s office. You see bits of trash, and [blood] tracks leading towards the airlock.
      `,
       items: [
		{ name: 'galley-door', desc: 'It is a door.', passiveDesc: 'There is a [galley-door] that leads to the galley.', doorLocation: 'kitchen' },
		{ name: 'blood', desc: 'It is red. It looks like someone was dragged through the airlock while bleeding.' },
  		{ name: 'engineer-door', desc: 'The door to the engineer\'s office. It is secured with a keycard.', passiveDesc: 'There is a [engineer-door] to chief engineers office.',
  	  		use: ({disk, println, getRoom, enterRoom, secureDoorOpen}) => {
				secureDoorOpen(disk,"engineerOffice");	
  			}
  	    },
   		{ name: 'airlock', desc: 'The door to the airlock.', passiveDesc: 'There is a door to the [airlock].',
   	  		use: ({disk, println, getRoom, enterRoom}) => {
   			   println("You look in the window to the door lock and see space outside, if you open this without a space suit you will die.")	
   			}
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
+---------------------------------------------+
|   |-------------|          |------------|   |
+---------------------------------------------+

                                       +-----+
                                       |#####|
  +-----+                              |#####|
  |     |                              +-----+
  |     |            +----------+
  | *   |            ||        ||      ~~~~~~~
  |     |            ||        ||      |-----|
+-+-----+-------------------------------------+
      `,
      desc: `
This is the galley. The crew eats their meals here. Unlike the rest of the ship this room looks clean.`,
       items: [
		   { name: 'door', desc: 'It is a door.', passiveDesc: 'There is a [door] that leads to the corridor.', doorLocation: 'kitchenCorridor' },
		   { 
			    name: 'food', desc: 'It is food alright. Says so right on the can.', passiveDesc:'You see a can of [food] on a table.', isTakeable:true,
	  	  		use: ({disk, println, getRoom, enterRoom}) => {
	  			   println("Mmm Food. To eat this you really need to put it on a plate.")	
	  			}
	       },
  		   { name: 'pen', desc: 'This here is an ink pen, for writting on stuff.', passiveDesc:'Next to the food cooler you see a [pen].', isTakeable:true,
 	  		use: ({disk, println, getRoom, enterRoom}) => {
 			   println("You remove the lid, and write on your arm, \'Revenge!\'. Now lets get to it.")	
 			}
      	  },
			{ name: 'vent', desc: 'It is an air vent for extra ventilation in the cooking area. It looks like a duct large engough for you to squeeze in.', passiveDesc:'Above the cooler you see a large [vent].',
	  		use: ({disk, println, getRoom, enterRoom}) => {
				println("You remove the cover to the vent, and squeeze in.");
				enterRoom("vents");
			}
    	  },
      ]
    },
	
	
	
	
	
  ],
};