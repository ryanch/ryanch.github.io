const scenes = [

    {
        scene: "home",
        start: {
            setTopText1: "Tessa walks arround the village searching for her father.",
            setLeftText4: "Tessa has not found her father."
        },
        if_FoundFather: {
            match: ["Tessa [has] found her father"],
            gotoScene: "intro"
        },
    },

    {
        scene: "intro",
        start: {
            setTopText1: "Her father looking deeply concerned, faces Tessa.",
            setLeftText2: "'As you, know the river is dry, and our crops are failing.'",
            setRightText3: "'You must begin your journey to find the cause of the dry river.'"
        },
        if_Begin: {
            match: "[you] begin journey*",
            gotoScene: "mine_cross_roads"
        },
    },


    {
        scene: "mine_cross_roads",
        start: {
            setLeftText1: "Tessa journeys forward, following the open path of the dry river bed.",
            setTopText2: "She continues, and finds her path is blocked by boulders."
        },
        if_PathOpen: {
            match: ["*Finds [her] path [is] open.", "*Finds her path"],
            setRightText1: "North she sees an abandoned mine with a sealed door.",
            setBottomText2: "East she sees impassible woods."
        },
        if_MineOpen: {
            match: [ "*with a [open] door" ],
            gotoScene:"mine"
        },
        if_EnterWoods: {
            match: [ "*sees woods" ],
            gotoScene:"woods"
        },
        if_EnterNorth: {
            match: [ "Tessa journeys North*" ],
            setTopText1: "She attempts to enter the door of the mine but it is sealed."
        },
    },


    {
        scene: "woods",
        start: {
            setTopText1: "Tessa walks through the scary dense forest that is beside the dry river, leaving the mine entrance far behind.",
            setBottomText2: "Ahead the path is a steep incline. In the distance, Tessa hears rushing water.",
            setLeftText3: "Tessa is proud for not turning back.",
            setRightText4: "Tessa is unsure if she should investigate the river."
        },
        if_Return: {
            match: ["Tessa is [for] turning back" ],
            gotoScene:"mine_cross_roads"
        },
        if_Steam: {
            match: ["Tessa [should] investigate the river" ],
            gotoScene:"river_shore"
        },
    },


    {
        scene: "mine",
        start: {
            setLeftText1: "Tessa is at the entrance to the mine, peeking inside the dark interior.",
            setBottomText2:"Inside Tessa sees a torch, unlit.",
            setRightText3: "Tessa is unsure where to go or to leave."
        },
        if_HoldingTorch: {
            match:["[Inside] Tessa sees a torch"],
            gotoScene:"mine_lit"
        },
        if_GoingBack: {
            match: ["[Tessa] [is] [going] [to] leave"  ],
            gotoScene:"mine_cross_roads"
        },

    },

    {
        scene: "mine_lit",
        start: {
            setLeftText1: "Tessa is at the entrance to the mine, she is holding a torch so she can see.",
            setTopText2: "There is a ladder she can take up.",
            setBottomText3: "There are stairs going down.",
            setRightText4: "Tessa is unsure where to go or to leave."
        },
        if_GoingUp: {
            match: ["[take] ladder [up]", "[Tessa] going up", "There is a ladder she going up", "take up" ],
            gotoScene:"mine_up"
        },
        if_GoingDown: {
            match: ["[take] stairs [going] [down]", "[Tessa] going down" ],
            gotoScene:"mine_down"
        },
        if_GoingBack: {
            match: ["[Tessa] [is] [going] [to] leave"  ],
            gotoScene:"mine_cross_roads"
        },

    },


    {
        scene: "mine_down",
        start: {
            setLeftText1: "Tessa descends stairs in the mine, going deep into the mountain.",
            setTopText2: "No wonder the villagers don't return to this mine.",
            setRightText3: "The ground is slippery she is concerned she may up and fall.",
            setBottomText4: "Tessa is unsure if she should continue down."
        },
        if_GoingUp: {
            match: ["Tessa [should] return [up]", "[she] [should] return [up]" ],
            gotoScene:"mine"
        },
        if_GoingDown: {
            match: ["Tessa [should] continue down", "[she] [should] continue down" ],
            gotoScene:"mine_down_deep"
        },

    },


    {
        scene: "mine_down_deep",
        start: {
            setTopText1: "Tessa continues deeper into the cave, and looses her footing and falls.",
            setBottomText2: "Tessa wakes after falling, and finds herself at the bottom of a deep pit.",
            setRightText3: "On the right, she hears running water.",
            setLeftText4: "Beside her is the torch, which is extinguished."
        },
        if_LightTorch: {
            match: ["Beside her is the torch" ],
            gotoScene:"mine_down_deep_lit"
        }
    },

    {
        scene: "mine_down_deep_lit",
        start: {
            setTopText1: "Tessa wakes after falling, and finds herself at the bottom of a deep pit. Miraculously, with a lit torch in her hand.",
            setRightText2: "On the right, she hears running water.",
            setBottomText3: "With the light, she can see there is not a path to the water."
        },
        if_LightTorch: {
            match: ["*there is a path to the water" ],
            gotoScene:"river"
        }
    },

    {
        scene: "river",
        start: {
            setTopText1: "Tessa stumbles and falls into a river, which is running freely.",
            setBottomText2: "Tessa has difficulty swiming in the strong current."
        },
        if_TryRunOnRiver: {
            match:["Tessa is running in the river"],
            setLeftText1:"Tessa attempts to run on the river, which fails."
        },
        if_CanSwim: {
            match: ["Tessa is swiming in the [strong] current.", "Tessa is swiming in the [strong] river." ],
            gotoScene:"river_shore"
        }
    },

    {
        scene: "river_shore",
        start: {
            setLeftText1: "Tessa reaches the river shore.",
            setTopText2: "Tessa sees the river going off into the distance."
        },
    },



// climb mine, see overlook and spot a dragon
// take zip line down | other way
// 

];
