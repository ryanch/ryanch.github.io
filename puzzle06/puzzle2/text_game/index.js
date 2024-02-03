const input = document.querySelector('#input');

document.onkeydown = () => {
  input.focus();
};


const loadDisk = (disk, config = {}) => {
  // build default (DOM) configuration
  const defaults = {
    // retrieve user input (remove whitespace at beginning or end)
    getInput: () => input.value.trim(),
    // overwrite user input
    setInput: (str) => {
      input.value = str;
    },
	

	// print item desc
	lookDesc: (room,itemKeyName) => {
	
        const findItem = item => item.name === itemKeyName;
        const item = (room.items && room.items.find(findItem)) || disk.inventory.find(findItem);
        if (!item) {
          println('You don\'t see any such thing.');
        } else {
		 	
			if (item.img) {
				println(item.img, true);
			}			
			
			var text = item.desc;
			
			if (item.optionalDesc && item.optionalDescKeyItem) {
				var itemInRoom = false;
				for(var i = 0; i < room.items.length; i++ ) {
					if (room.items[i].name == item.optionalDescKeyItem ) {
						itemInRoom = true;
					}
				}
				if (itemInRoom) {
					text = text + " " + item.optionalDesc;
				}
			}
			
			println(text);
			
        }
		
	
	},
	
	// print the room desc
	printlnRoomDesc: (room) => {
		
		text = "";
		
		if (room.oneTimeDesc) {
			text = room.oneTimeDesc + "\n";
			room.oneTimeDesc = null;
		}
		
		text = text + room.desc;
		
		if (room.items) {
			for (var i = 0; i < room.items.length; i++) {
				var item = room.items[i];
				if ( item.passiveDesc ) {
					text = text + "\n" + item.passiveDesc;
				}
			}
		}
		
		if (room.exits) {
			for (var i = 0; i < room.exits.length; i++) {
				var exit = room.exits[i];
				text = text + "\n" + "To the " + exit.dir + " is " + exit.label
			}
		}
		
		
		if (room.id == "winRoom" ) {
			text = text + "\n Score: " + disk.printCount + " (lower is better)";
		}
		

		
		println(text);
	},
	
    // render output
    println: (str, isImg = false) => {
		
	/*	
       const output = document.querySelector('#output');
        
		if (isImg) {
			const newLine = document.createElement('div');
			newLine.classList.add('img');
			output.appendChild(newLine).innerText = str;
		}
		else {
			var html = str;
			html = html.replaceAll("\n", "<br/>");
			html = html.replaceAll("[", '<a href="javascript:typeText(this);" >[');
			html = html.replaceAll("]", "]</a>");
			
			const newLine = document.createElement('div');
			output.appendChild(newLine).innerHTML = html;
		}
		*/
	  	
		disk.printCount = disk.printCount + 1;
		
		
      const output = document.querySelector('#output');
      const newLine = document.createElement('div');

      if (isImg) {
        newLine.classList.add('img');
		
      }

	  output.appendChild(newLine).innerText = str;
		
		
	  	 
      window.scrollTo(0, document.body.scrollHeight);
		
	  
    },
    // prepare the environment
    setup: ({applyInput = (() => {}), navigateHistory = (() => {})}) => {
		
		
      input.onkeypress = (e) => {
		 
	
		const TAB = 9;  
		if ( e.keyCode == TAB ) {
			console.log("tab");
			e.preventDefault();
			return;
		}
		  
        const ENTER = 13;

        if (e.keyCode === ENTER) {
          applyInput();
        }
      };

      input.onkeydown = (e) => {
		  

		  
  		const TAB = 9;  
  		if ( e.keyCode == TAB ) {
  			e.preventDefault();
  			return;
  		}
		  
		  
        const UP = 38;
        const DOWN = 40;

        if (e.keyCode === UP) {
          navigateHistory('prev');
        } else if (e.keyCode === DOWN) {
          navigateHistory('next');
        }
      };
    }
  };

  const {getInput, setInput, println, setup, printlnRoomDesc,lookDesc} = Object.assign(defaults, config);

  // Disk -> Disk
  const init = (disk) => {
    const initializedDisk = Object.assign({}, disk);
    initializedDisk.rooms = disk.rooms.map((room) => {
      room.visits = 0;
      return room;
    });

    return initializedDisk;
  };

  disk = init(disk);

  const inputs = ['']; // store all user commands
  let inputsPos = 0;


  var _TEXT = ["Die", "Computer", "winRoom", "Space", "Galaxy", "Quest", "The", "Professional"  ];

  // String -> Room
  const getRoom = (id) => disk.rooms.find(room => room.id === id);

  const enterRoom = (id) => {
    const room = getRoom(id);


	buildAutoCompleteList(room,disk);

    println(room.img, true);


    println(`---${room.name}---`);

    if (room.visits === 0) {
      //println(room.desc);
	  printlnRoomDesc(room);
    }

    room.visits++;

    disk.roomId = id;

    if (typeof room.onEnter == 'function') {
      room.onEnter({disk, println, getRoom, enterRoom});
    }
  };

  const secureDoorOpen = (disk,goToRoom) => {
	  
	  
	  var hasKeyCard = false;
      disk.inventory.forEach(item => {
		  if (item.name == 'keycard') {
			  hasKeyCard = true;
		  }
      });	  
	 
	  
	  if (hasKeyCard) {
	  	println("Beep beep.")
		enterRoom(goToRoom)  
	  }
	  else {
		  println("You attempt to open the door, but you see a blinking access denied message. You need a keycard.");
	  }
	  
  };


  const startGame = (disk) => {
	  
	disk.printCount = 0;
	    
	var text = getRoom(_TEXT[2]).oneTimeDesc;
    text = text.replace(_TEXT[4],_TEXT[6]);
	text = text.replace(_TEXT[5],_TEXT[7]);
	getRoom(_TEXT[2]).oneTimeDesc = text;

    enterRoom(disk.roomId);
  };

  startGame(disk);

  const applyInput = () => {
    const input = getInput();
    inputs.push(input);
    inputsPos = inputs.length;
    println('> ' + input);

    const val = input.toLowerCase();
    setInput(''); // reset input field

    const exec = (cmd) => {
      if (cmd) {
        cmd();
      } else {
        println('Sorry, I didn\'t understand your input. For a list of available commands, type HELP.');
      }
    };

    const args = val.split(' ');
    const cmd = args[0];
    const room = getRoom(disk.roomId);

    // nested strategy pattern
    // 1st tier based on # of args in user input
    // 2nd tier based on 1st arg (command)
    const strategy = {
      1() {
        const cmds = {
          inv() {
            if (!disk.inventory.length) {
              println('You don\'t have any items in your inventory.')
              return;
            }
            println('You have the following items in your inventory:');
            disk.inventory.forEach(item => {
              println(`* ${item.name}`);
            });
          },
          look() {

			printlnRoomDesc(room);
			
          },
          go() {
            const exits = room.exits;
            if (!exits) {
              println('There\'s nowhere to go.');
              return;
            }
            println('Where would you like to go? Available directions are:');
            exits.forEach(exit => println(exit.dir));
          },
          help() {
            const instructions = `
              The following commands are available:
              LOOK :: repeat room description
              LOOK AT [OBJECT NAME] e.g. 'look at key'
              TAKE [OBJECT NAME] e.g. 'take book'
              GO [DIRECTION] e.g. 'go north'
              USE [OBJECT NAME] e.g. 'use door', or 'use rope'
              INV :: list inventory items
              HELP :: this help menu
            `;
            println(instructions);
          },
        };
        exec(cmds[cmd]);
      },
      2() {
        const cmds = {
          look() {

				lookDesc(room,args[1]); 

          },
          go() {
            const exits = room.exits;
            if (!exits) {
              println('There\'s nowhere to go.');
              return;
            }
            const nextRoom = exits.find(exit => exit.dir === args[1]);
            if (!nextRoom) {
              println('There is no exit in that direction.');
            } else {
              enterRoom(nextRoom.id);
            }
          },
          take() {
            const findItem = item => item.name === args[1];
            const itemIndex = room.items && room.items.findIndex(findItem);
            if (typeof itemIndex === 'number' && itemIndex > -1) {
              const item = room.items[itemIndex];
              if (item.isTakeable) {
                disk.inventory.push(item);
                room.items.splice(itemIndex, 1);
                println(`You took the ${item.name}.`);
              } else {
                println('You can\'t take that.');
              }
            } else {
              println('You don\'t see any such thing.');
            }
          },
          use() {
            const findItem = item => item.name === args[1];
            const item = (room.items && room.items.find(findItem)) || disk.inventory.find(findItem);

            if (item) {
              if (item.use) {
                const use = typeof item.use === 'string' ? eval(item.use) : item.use;
                use({disk, println, getRoom, enterRoom, secureDoorOpen}); // use item and give it a reference to the game
              } 
			  else if(item.doorLocation) {
				  enterRoom(item.doorLocation);
			  }
			  else if(item.printUse) {
				  println(item.printUse);
			  }
			  else {
                  println('That item doesn\'t have a use.');
              }
            } else {
              println('You don\'t have that.');
            }
          }
        };
        exec(cmds[cmd]);
      },
      3() {
        const cmds = {
          look() {
			lookDesc(room,args[2]); 
          },
        };
        exec(cmds[cmd]);
      }
    };

    if (args.length <= 3) {
      strategy[args.length]();
    } else {
      strategy[1]();
    }
  };

  const navigateHistory = (dir) => {
    if (dir === 'prev') {
      inputsPos--;
      if (inputsPos < 0) {
        inputsPos = 0;
      }
    } else if (dir === 'next') {
      inputsPos++;
      if (inputsPos > inputs.length) {
        inputsPos = inputs.length;
      }
    }

    setInput(inputs[inputsPos] || '');
  };

  setup({applyInput, navigateHistory});
};

// npm support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = loadDisk;
}
