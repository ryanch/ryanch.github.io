const scenes = [

    {
        scene: "home",
        start: {
            setTopText1: "Tessa walks arround the village searching for her father.",
            setLeftText4: "Tessa has not found her father."
        },
        if_FoundFather: {
            match: ["Tessa has found her father", "Tessa found her father"],
            gotoScene: "intro"
        },
    },

    {
        scene: "intro",
        start: {
            setTopText1: "Her father looking deeply concerned, faces Tessa.",
            setLeftText2: "'As you, know the river is dry, and our crops are failing.'",
            setRightText3: "'You must begin your journey and find the cause of the dry river.'"
        },
        if_Begin: {
            match: "begin journey*",
            gotoScene: "begin"
        },
    },


    {
        scene: "begin",
        start: {
            setLeftText1: "Tessa journeys east, following the open dry bed of the river.",
            setTopText2: "She continues, and finds her path is blocked by boulders."
        },
        if_PathOpen: {
            match: ["Finds her path is open.", "She continues, and Finds her path is open." ],
            setRightText1: "Ahead she sees an abandoned mine.",
            setBottomText2: "The door to the mine is sealed.",
        },
    },


    /*
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

    */
];
