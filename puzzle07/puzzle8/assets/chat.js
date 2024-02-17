var msgerForm = null;
var msgerInput = null;
var msgerChat = null;



const BOT_IMG = "assets/alien/icon.jpg";
const PERSON_IMG = "assets/earth.jpg";
const BOT_NAME = "Alien";
const PERSON_NAME = "Earthling";

var LAST_EARTHLING_TEXT_MESSAGE = null;

function chatStartup() {

    msgerForm = get(".msger-inputarea");
    msgerInput = get(".msger-input");
    msgerChat = get(".msger-chat");

    
    msgerForm.addEventListener("submit", event => {
      event.preventDefault();

      arrivalGame.cancelRunePicker();
      arrivalGame.cancelImagePicker();
    
      const msgText = msgerInput.value;
      if (!msgText) return;
    
      LAST_EARTHLING_TEXT_MESSAGE = msgText;

      appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
      msgerInput.value = "";
    
      botResponse();
    });

    // sort all of the items so they show up in the same order    
    for (var i = 0; i < arrivalGame.items.length; i++ ) {
        var item = arrivalGame.items[i];
        var words = item.words;
        words.sort();
        item.words = words;
        arrivalGame.items[i] = item;

        arrivalGame.imageByToolTip[ item.img ] = item.text;
        arrivalGame.indexOfItemByImage[ item.img ] = i;
    }


    // build the words by code map
    arrivalGame.wordsByCode = {};
    arrivalGame.wordsReverseLookup = {};
    for (var i = 0; i < arrivalGame.words.length; i++ ) {
        arrivalGame.wordsByCode[ arrivalGame.words[i].code ] = arrivalGame.words[i];
        arrivalGame.wordsReverseLookup[ arrivalGame.words[i].img ] = arrivalGame.words[i].code;
    }


    // build the alien response to rune images
    arrivalGame.alienImageResponseByRuneCode = {};

    var dedupeItemsStoredList = {};

    for (var i = 0; i < arrivalGame.items.length; i++ ) {
        var item = arrivalGame.items[i];
        var words = item.words;
        var itemIndex = i;

        for (var j = 0; j < words.length; j++ ) {
            var runeCode = words[j];
            var itemsStored = arrivalGame.alienImageResponseByRuneCode[ runeCode ];
            if ( !itemsStored ) {
                itemsStored = [];
                arrivalGame.alienImageResponseByRuneCode[ runeCode ] = itemsStored;
            }

            if ( !dedupeItemsStoredList[ runeCode + "-" + itemIndex ] ) {
                itemsStored[ itemsStored.length ] = itemIndex;
                dedupeItemsStoredList[ runeCode + "-" + itemIndex ] = true;
            }
         }
    }


    // build the pickers
    arrivalGame.buildImagePicker();
    arrivalGame.buildRunePicker();




}


var globalMessageIdCount = 0;

function appendMessage(name, img, side, text, imagesList, imgCss) {


    var showWaitng = (side == "left");

    globalMessageIdCount++;
    var globalMessageId = "messageid" + globalMessageIdCount;
    var imageWaitId = globalMessageId + "wait";

    var content = null;

    if (!imgCss) {
        imgCss = "";
    }

    if (text != null) {
        content = text;
    }
    else {
        var s = "";
        for (var i = 0; i < imagesList.length; i++ ) {

           var wordCode = arrivalGame.wordsReverseLookup[ imagesList[i] ];
           var imgExtra = "";
           if ( wordCode ) {
            imgExtra=' style="cursor:hand;" onclick="arrivalGame.uploadRuneClicked(\''+wordCode+'\')" ';
           }

           var title = arrivalGame.imageByToolTip[ imagesList[i] ];
           if ( title ) {
            imgExtra = imgExtra + ' title="'+title+'" ';
           }

           var imageIndex = arrivalGame.indexOfItemByImage[ imagesList[i] ];
           if ( imageIndex || imageIndex == 0 ) {
            imgExtra = imgExtra + ' style="cursor:hand;" onclick="arrivalGame.uploadImageClicked('+imageIndex+')" ';
           }


            s += '<img src="'+imagesList[i]+'" class="'+imgCss+'" '+imgExtra+' >';
        }
        content = s;
    }

    var messageStyle = showWaitng ? ' style="display:none;" ' : "";
    var waitingImage = showWaitng ? ' <img src="assets/waiting.gif" height="80" id="'+imageWaitId+'" > ' : "";

    


  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>

      
      <div class="msg-bubble" id="${globalMessageId}" ${messageStyle}  >
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>

        <div class="msg-text">${content}</div>
      </div>
      
      ${waitingImage}
      
      
    </div>
  `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;

  if (showWaitng) {
    setTimeout( function() {
        document.getElementById( imageWaitId ).style.display="none";
        document.getElementById( globalMessageId ).style.display="block";
        msgerChat.scrollTop += 500;
    }, 1100 );
  }

}

// bot response to text messages
function botResponse() {

   if ( app.checkAnswer( LAST_EARTHLING_TEXT_MESSAGE, 8 ) ) {
        setTimeout(() => {
            appendMessage(BOT_NAME, BOT_IMG, "left", null, ["assets/alien/happy.jpg" ],"alien-message-image" );
        }, 5);
        app.saveAnswer(8, LAST_EARTHLING_TEXT_MESSAGE);
   }
   else {
    setTimeout(() => {
        appendMessage(BOT_NAME, BOT_IMG, "left", null, ["assets/alien/shrug.jpg", "assets/words/runeBlue_slab_017.png", "assets/words/runeBlue_slab_001.png", "assets/words/runeBlue_slab_002.png", "assets/words/runeBlue_slab_004.png" ],"alien-message-image" );
    }, 5);
    }

}

// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();

  return `${h.slice(-2)}:${m.slice(-2)}`;
}







var arrivalGame = {};


arrivalGame.uploadRuneClicked = function(runeCode) {
    document.getElementById("rune-uploader").style.display = "none";

    var wordItem = arrivalGame.wordsByCode[ runeCode ];

    var itemIndexsForResponse = arrivalGame.alienImageResponseByRuneCode[ runeCode ];

    var responseList = [];
    for ( var i = 0; i <  itemIndexsForResponse.length; i++ ) {
        var selectedItem = arrivalGame.items[ itemIndexsForResponse[i] ];
        responseList[ responseList.length ] = selectedItem.img;
    }

    // post the earthling message
    setTimeout(() => {
        appendMessage(PERSON_NAME, PERSON_IMG, "right", null, [ wordItem.img ], "user-rune-chat-message" );
    }, 5);

    setTimeout(() => {
        appendMessage(BOT_NAME, BOT_IMG, "left", null, responseList ,"alien-image-response" );
    }, 5);
    


}

arrivalGame.uploadImageClicked = function(itemIndex) {

    document.getElementById("image-uploader").style.display = "none";

    var selectedItem = arrivalGame.items[itemIndex];

    var responseList = [];

    for (var i = 0; i< selectedItem.words.length; i++ ) {

        var wordCode = selectedItem.words[i];

        var wordItem = arrivalGame.wordsByCode[ wordCode ];

        responseList[i] = wordItem.img;
    }


    setTimeout(() => {
        appendMessage(PERSON_NAME, PERSON_IMG, "right", null, [ selectedItem.img ], "upload-chat-message" );
    }, 5);


    setTimeout(() => {
        appendMessage(BOT_NAME, BOT_IMG, "left", null, responseList ,"alien-message-image" );
    }, 5);

}


arrivalGame.cancelRunePicker = function() {
    document.getElementById("rune-uploader").style.display = "none";
}

arrivalGame.showRunePicker = function() {
    arrivalGame.cancelImagePicker();
    document.getElementById("rune-uploader").style.display = "block";
}


arrivalGame.cancelImagePicker = function() {
    document.getElementById("image-uploader").style.display = "none";
}

arrivalGame.showImagePicker = function() {
    arrivalGame.cancelRunePicker();
    document.getElementById("image-uploader").style.display = "block";
}

arrivalGame.buildImagePicker = function() {
    var picker = document.getElementById("image-selector");

    var s = "";

    for (var i = 0; i < arrivalGame.items.length; i++ ) { 

        var item = arrivalGame.items[i];

        s += '<img src="'+item.img+'" class="upload-image" width="150" onclick="arrivalGame.uploadImageClicked('+i+')" title="'+item.text+'" >';
    }

    picker.innerHTML = s;

}


arrivalGame.buildRunePicker = function() {
    var picker = document.getElementById("rune-selector");

    var s = "";

    var codesInUse = {};
    
    // find all the rune codes in use
    for (var i = 0; i < arrivalGame.items.length; i++ ) { 
        var item = arrivalGame.items[i];
        var codes = item.words;
        for ( var j = 0; j < codes.length; j++ ) {
            codesInUse[ codes[j] ] = codes[j];
        }
    }


    // sort the codes so each player sees the same screen
    var index = 0;
    var codesSortedList = [];
    for (var code in codesInUse) {
        codesSortedList[index]=code;
        index++;
    }
    codesSortedList.sort();

    for (var i = 0; i < codesSortedList.length; i++ ) { 
        var code = codesSortedList[i];
        var word = arrivalGame.wordsByCode[ code ];
        s += '<img src="'+word.img+'" class="upload-rune-image" onclick="arrivalGame.uploadRuneClicked(\''+code+'\')" >';
    }

    picker.innerHTML = s;

}



arrivalGame.items = [
  {
    img: "assets/items/key.jpg",
    words: ["014","007"],
    text: "key"
  },
  {
    img: "assets/items/milk.jpg",
    words: ["008","003"],
    text: "milk"
  },
  {
    img: "assets/items/watermelon.jpg",
    words: ["011","003"],
    text: "watermelon"
  },
  {
    img: "assets/items/tooth.jpg",
    words: ["007","010"],
    text: "tooth"
  },
  {
    img: "assets/items/pig.jpg",
    words: ["001","003", "004"],
    text:"pig"
  },


  {
    img: "assets/items/fire.jpg",
    words: ["019","022"],
    text: "fire"
  },
  {
    img: "assets/items/shirt.jpg",
    words: ["010","016"],
    text:"shirt"
  },
  {
    img: "assets/items/fish.jpg",
    words: ["007","001","003", "004"],
    text:"fish"
  },
  {
    img: "assets/items/shield.jpg",
    words: ["023","013","014"],
    text: "shield"
  },
  {
    img: "assets/items/elephant.jpg",
    words: ["002","001","018", "004"],
    text: "elephant"
  },



  {
    img: "assets/items/spear.jpg",
    words: ["009","013","017"],
    text:"spear"
  },
  {
    img: "assets/items/parrot.jpg",
    words: ["007","020","001", "004"],
    text: "parrot"
  },
  {
    img: "assets/items/anvil.jpg",
    words: ["014","012","018"],
    text: "anvil"
  },
  {
    img: "assets/items/sundial.jpg",
    words: ["006","024"],
    text: "sundial"
  },
  {
    img: "assets/items/knife.jpg",
    words: ["007","013","009"],
    text: "knife"
  },


  {
    img: "assets/items/log.jpg",
    words: ["006","011", "007", "017"],
    text:"log"
  },      
  {
    img: "assets/items/horse.jpg",
    words: ["001","025", "004", "002"],
    text: "horse"
  },    
  {
    img: "assets/items/shovel.jpg",
    words: ["012","014"],
    text: "shovel"
  },  
  {
    img: "assets/items/beans.jpg",
    words: ["007","003","011"],
    text: "beans"
  },   
  {
    img: "assets/items/palmtree.jpg",
    words: ["011","017","001"],
    text: "palm tree"
  },      



  {
    img: "assets/items/chariot.jpg",
    words: ["025","012","002"],
    text: "chariot"
  },     
  {
    img: "assets/items/butterfly.jpg",
    words: ["007","001","015","004"],
    text: "butterfly"
  },   
  {
    img: "assets/items/gem.jpg",
    words: ["007","019","021"],
    text: "gem"
  }, 
  {
    img: "assets/items/flower.jpg",
    words: ["011","001","007","015"],
    text: "flower"
  },   
  {
    img: "assets/items/coins.jpg",
    words: ["007","021","014","006"],
    text: "coins"
  },   

  {
    img: "assets/items/ostrich.jpg",
    words: ["001","004","017","025"],
    text: "ostrich"
  },   

  {
    img: "assets/items/snake.jpg",
    words: ["001","004","007","017","009"],
    text: "ostrich"
  },  


];

arrivalGame.words = [
  {
    img: "assets/words/runeBlue_slab_001.png",
    code: "001"
  },
  {
    img: "assets/words/runeBlue_slab_002.png",
    code: "002"
  },
  {
    img: "assets/words/runeBlue_slab_003.png",
    code: "003"
  },
  {
    img: "assets/words/runeBlue_slab_004.png",
    code: "004"
  },
  {
    img: "assets/words/runeBlue_slab_005.png",
    code: "005"
  },
  {
    img: "assets/words/runeBlue_slab_006.png",
    code: "006"
  },
  {
    img: "assets/words/runeBlue_slab_007.png",
    code: "007"
  },
  {
    img: "assets/words/runeBlue_slab_008.png",
    code: "008"
  },
  {
    img: "assets/words/runeBlue_slab_009.png",
    code: "009"
  },
  {
    img: "assets/words/runeBlue_slab_010.png",
    code: "010"
  },
  {
    img: "assets/words/runeBlue_slab_011.png",
    code: "011"
  },
  {
    img: "assets/words/runeBlue_slab_012.png",
    code: "012"
  },
  {
    img: "assets/words/runeBlue_slab_013.png",
    code: "013"
  },
  {
    img: "assets/words/runeBlue_slab_014.png",
    code: "014"
  },
  {
    img: "assets/words/runeBlue_slab_015.png",
    code: "015"
  },
  {
    img: "assets/words/runeBlue_slab_016.png",
    code: "016"
  },
  {
    img: "assets/words/runeBlue_slab_017.png",
    code: "017"
  },
  {
    img: "assets/words/runeBlue_slab_018.png",
    code: "018"
  },
  {
    img: "assets/words/runeBlue_slab_019.png",
    code: "019"
  },
  {
    img: "assets/words/runeBlue_slab_020.png",
    code: "020"
  },
  {
    img: "assets/words/runeBlue_slab_021.png",
    code: "021"
  },
  {
    img: "assets/words/runeBlue_slab_022.png",
    code: "022"
  },
  {
    img: "assets/words/runeBlue_slab_023.png",
    code: "023"
  },
  {
    img: "assets/words/runeBlue_slab_024.png",
    code: "024"
  },
  {
    img: "assets/words/runeBlue_slab_025.png",
    code: "025"
  }
];

arrivalGame.wordsByCode = {};
arrivalGame.wordsReverseLookup = {};
arrivalGame.alienImageResponseByRuneCode = {};
arrivalGame.imageByToolTip = {};
arrivalGame.indexOfItemByImage = {};