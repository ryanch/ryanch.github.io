const scenes = [
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

    {
        scene: "inside",
        start: {
            setTopText1: "The hero opened a door, and entered a room.",
            setLeftText2: "The hero found a chest.",
            setRightText3: "And was excited about it.",
        },
        if_ChestOpened: {
            match: "*opened*chest",
            setBottomText3: "The hero opened the chest, and found a sword."
        }
    }
];
