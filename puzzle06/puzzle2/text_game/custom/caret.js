const caret = document.querySelector('#caret');

const onKeyDown = (event) => {
	
	
	
	
  	// bail if this is a tab
	const TAB = 9;  
	if ( event.keyCode == TAB ) {
		event.preventDefault();	
		tabAutoComplete(input);
		return;
	}	

	// ensure focus is on the input
	input.focus();

	// bail if this is a backspace
	if (event.keyCode === 8) {
		return;
	}

	// ensure text cursor is at the end of the text
	input.selectionStart = input.selectionEnd = 10000;

	// move the caret to the left of the input text, plus the width of one character
	caret.style.left = (input.value.length * 1.75 - 96) + 'vh';
};

// update position after character is in text box
const onKeyUp = () => {
  // move the caret to the left of the input text
  caret.style.left = (input.value.length * 1.75 - 98) + 'vh';
};
document.onkeydown = document.onkeypress = onKeyDown;
document.onkeyup = onKeyUp;

// initialize caret position
onKeyUp();



var COMPLETE_LIST = ["dir","adventur","help"];

function buildAutoCompleteList(room,disk) {

		var newList = [];
		newList.push("adventur");
		newList.push("help");
		newList.push("look at");
		newList.push("look");
		newList.push("use");
		newList.push("go");
		
		
		if ( room.items ) {
			for (var j = 0; j < room.items.length; j++) {	
				var item = room.items[j];
			
				if ( item.skipAutoComplete ) {
					continue;
				}
			
				newList.push("look at " + item.name );
				newList.push("take " + item.name );
				newList.push("use " + item.name );
			}
		}
		
		if ( disk.inventory ) {
			for (var j = 0; j < disk.inventory.length; j++) {	
				var item = disk.inventory[j];
			
				if ( item.skipAutoComplete ) {
					continue;
				}
			
				newList.push("look at " + item.name );
				newList.push("take " + item.name );
				newList.push("use " + item.name );
			}
		}
		
		
		if ( room.exits ) {
			for (var j = 0; j < room.exits.length; j++) {
				var exit = room.exits[j];
				newList.push("go " + exit.dir );
			}
		}
		
		
		COMPLETE_LIST = newList;

}

function tabAutoComplete(textbox) {

	var currentValue = textbox.value;
	
	if (currentValue.length == 0) {
		return;
	}
	
	var bestMatch = "";
	var bestLength = 1000;
	
	for ( var i = 0; i < COMPLETE_LIST.length; i++ ) {
		var found = COMPLETE_LIST[i];
		if (found.startsWith(currentValue) && found.length < bestLength ) {
			bestMatch = found;
			bestLength = found.length;
		}
	}
	
	if ( bestLength != 1000 ) {
		textbox.value = bestMatch;
	}


}