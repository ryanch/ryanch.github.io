const scenes = [

    // starting place
    {
        scene: "home",
        start: {
            setTopText1: "The hero walks arround the room searching for a door."
        },
        if_RemovedSearch: {
            match: "The hero walks arround the room for a door",
            setBottomText1: "The locked door."
        },
        if_DoorOpened: {
            match: "The door",
            gotoScene: "inside"
        }
    },

    // 

    // inside the room
    {
        scene: "inside",
        start: {
            setTopText1: "The hero opened a door, and entered a room.",
            setLeftText2: "The hero found a chest.",
            setRightText3: "And was excited about it.",
        }, 
        if_ChestOpened: {
            match: "*hero opened chest.",
            setBottomText1: "The hero opened the chest, and found a secret passage."
        }, 
        if_AChestOpened: {
            match: "*hero opened a chest.",
            setBottomText1: "The hero opened the chest, and found a secret passage."
        }, 
        if_PassageFollowed: {
            match: "*hero entered secret passage.",
            gotoScene: "secret_passage"
        }
    },

    // secret passage
    {
        scene: "secret_passage",
        start: {
            setBottomText1: "The hero descends into the secret passage.",
            setTopText2: "",
        }
    },


];
