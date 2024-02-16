var msgerForm = null;
var msgerInput = null;
var msgerChat = null;



const BOT_IMG = "assets/alien/icon.jpg";
const PERSON_IMG = "assets/earth.jpg";
const BOT_NAME = "Alien";
const PERSON_NAME = "Earthling";

function chatStartup() {

    msgerForm = get(".msger-inputarea");
    msgerInput = get(".msger-input");
    msgerChat = get(".msger-chat");

    
    msgerForm.addEventListener("submit", event => {
      event.preventDefault();
    
      const msgText = msgerInput.value;
      if (!msgText) return;
    
      appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
      msgerInput.value = "";
    
      botResponse();
    });

    arrivalGame.buildImagePicker();

}


function appendMessage(name, img, side, text, imagesList) {

    var content = null;

    if (text != null) {
        content = text;
    }
    else {
        var s = "";
        for (var i = 0; i < imagesList.length; i++ ) {
            s += '<img src="'+imagesList[i]+'" class="alien-message-image" >';
        }
        content = s;
    }

  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>

        <div class="msg-text">${content}</div>
      </div>
    </div>
  `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}


function botResponse() {


  var delay = 1000;

  setTimeout(() => {
    appendMessage(BOT_NAME, BOT_IMG, "left", null, ["assets/alien/shrug.jpg", "assets/words/blank.png"] );
  }, delay);

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

arrivalGame.uploadImageClicked = function(itemIndex) {

  ///var delay = 1000;

  setTimeout(() => {
    appendMessage(PERSON_NAME, PERSON_IMG, "right", null, ["assets/alien/shrug.jpg", "assets/words/blank.png"] );
  }, 5);


}


arrivalGame.cancelImagePicker = function() {
    document.getElementById("image-uploader").style.display = "none";
}

arrivalGame.showImagePicker = function() {
    document.getElementById("image-uploader").style.display = "block";
}

arrivalGame.buildImagePicker = function() {
    var picker = document.getElementById("image-selector");

    var s = "";

    for (var i = 0; i < arrivalGame.items.length; i++ ) { 

        var item = arrivalGame.items[i];

        s += '<img src="'+item.img+'" class="upload-image" width="150" onclick="arrivalGame.uploadImageClicked('+i+')" >';
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
    words: ["007","010","009"],
    text: "tooth"
  },
  {
    img: "assets/items/pig.jpg",
    words: ["001","003","003"],
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
    words: ["007","001","003"],
    text:"fish"
  },
  {
    img: "assets/items/shield.jpg",
    words: ["023","013","014"],
    text: "shield"
  },
  {
    img: "assets/items/elephant.jpg",
    words: ["002","001","018"],
    text: "elephant"
  },



  {
    img: "assets/items/spear.jpg",
    words: ["009","013"],
    text:"spear"
  },
  {
    img: "assets/items/parrot.jpg",
    words: ["007","020","001"],
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
    words: ["006","011", "!001"],
    text:"log"
  },      
  {
    img: "assets/items/horse.jpg",
    words: ["001","025"],
    text: "horse"
  },    
  {
    img: "assets/items/shovel.jpg",
    words: ["012","014","011"],
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
    words: ["025","018","012"],
    text: "chariot"
  },     
  {
    img: "assets/items/butterfly.jpg",
    words: ["007","001","015"],
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


];
arrivalGame.words = [
  {
    img: "words/runeBlue_slab_001.png",
    code: "001"
  },
  {
    img: "words/runeBlue_slab_002.png",
    code: "002"
  },
  {
    img: "words/runeBlue_slab_003.png",
    code: "003"
  },
  {
    img: "words/runeBlue_slab_004.png",
    code: "004"
  },
  {
    img: "words/runeBlue_slab_005.png",
    code: "005"
  },
  {
    img: "words/runeBlue_slab_006.png",
    code: "006"
  },
  {
    img: "words/runeBlue_slab_007.png",
    code: "007"
  },
  {
    img: "words/runeBlue_slab_008.png",
    code: "008"
  },
  {
    img: "words/runeBlue_slab_009.png",
    code: "009"
  },
  {
    img: "words/runeBlue_slab_010.png",
    code: "010"
  },
  {
    img: "words/runeBlue_slab_011.png",
    code: "011"
  },
  {
    img: "words/runeBlue_slab_012.png",
    code: "012"
  },
  {
    img: "words/runeBlue_slab_013.png",
    code: "013"
  },
  {
    img: "words/runeBlue_slab_014.png",
    code: "014"
  },
  {
    img: "words/runeBlue_slab_015.png",
    code: "015"
  },
  {
    img: "words/runeBlue_slab_016.png",
    code: "016"
  },
  {
    img: "words/runeBlue_slab_017.png",
    code: "017"
  },
  {
    img: "words/runeBlue_slab_018.png",
    code: "018"
  },
  {
    img: "words/runeBlue_slab_019.png",
    code: "019"
  },
  {
    img: "words/runeBlue_slab_020.png",
    code: "020"
  },
  {
    img: "words/runeBlue_slab_021.png",
    code: "021"
  },
  {
    img: "words/runeBlue_slab_022.png",
    code: "022"
  },
  {
    img: "words/runeBlue_slab_023.png",
    code: "023"
  },
  {
    img: "words/runeBlue_slab_024.png",
    code: "024"
  },
  {
    img: "words/runeBlue_slab_025.png",
    code: "025"
  }
];
