// https://observablehq.com/@spencermountain/compromise-match
// https://observablehq.com/@spencermountain/nlp-compromise

const scenes = [

    {
        scene: "home",
        start: {
            setTopText1: "Tessa walks arround the village searching for her father.",
            setLeftText4: "Tessa has not found her father."
        },
        if_FoundFather: {
            nlpMatch: (doc, h) => h.simple(doc).ifNo("not").match("^has? found father").text() != "",
            match: "found father",
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
            match:["begin looking", "begin journey"],
            nlpMatch: (doc, h) => h.simple(doc).delete("cause of").match("^begin? journey to find? river").text() != "",
            gotoScene: "mine_cross_roads"
        },
    },


    {
        scene: "mine_cross_roads",
        start: {
            setLeftText1: "Tessa journeys forward, following the open dry river bed.",
            setTopText2: "She continues, and finds her path is blocked by boulders."
        },
        if_PathOpen: {
            nlpMatch: (doc, h) => h.simple(doc).ifNo("blocked").match("finds path open?$").text() != "",
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
            match: [ "*journeys North*" ],
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
            match: ["[Tessa is] [for] turning back" ],
            gotoScene:"mine_cross_roads"
        },
        if_Steam: {
            nlpMatch: (doc, h) => h.simple(doc).match("^(walks|investigate) (water|river)$").text() != "",
            match: ["[Tessa] [should] investigate the river" ,"[Tessa] [should] investigate water" ],
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
            match: ["[take] ladder [up]", "[Tessa] going up", "There is a ladder she going up", "take up", "she take ladder up" ],
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
        scene: "mine_up",
        start: {
            setBottomText1: "Tessa climbs a ladder that goes on for what seems like eternity.",
            setTopText2: "Tessa reaches the top of the ladder, and finds a small room.",
            setLeftText3: "The room has a carved doorway which leads outside to a landing.",
            setRightText4: "Tessa sits down for a long deserved rest."
        },
        if_GoingDown: {
            match: ["Tessa goes down [ladder]","Tessa goes down [the] ladder", "[Tessa] climbs down [ladder]", "[Tessa] climbs down the ladder" ],
            gotoScene:"mine_lit"
        },
        if_GoingOut: {
            nlpMatch: (doc, h) => doc.delete('#Determiner').delete('#Adverb').delete("her").delete("Tessa").match("^#Verb outside landing?").text() != "",
            match: ["Tessa goes [to the] outside [landing]", "Tessa goes to [the] landing", "reaches [carved] doorway [which leads] outside to a landing.", "[Tessa] goes outside" ],
            gotoScene:"mine_view"
        },

    },


    {
        scene: "mine_view",
        start: {
            setLeftText1: "Tessa exits the cave to a sweeping view of the river.",
            setTopText2:"She observes the river flowing down the mountain, and stopping in cloud of steam.",
            setBottomText3: "In the steam, she observes the unmistakable shape of a dragon.",
            setRightText4: "Ahead is a shabby looking rope bridge."
        },
        if_Back: {
            match: ["[exit to] cave", "[she] exits down the mountain", "Tessa exits down the mountain"],
            gotoScene:"mine_up"
        },
        if_EnterBridge: {
            nlpMatch: (doc, h) => h.simple(doc).match("^(view|exits|observes) bridge").text() != "",
            match: ["ahead", "[ahead to] [the] [rope] bridge", "[exits to] [the] [rope] bridge"],
            gotoScene:"bridge"
        },
        if_DragonLook: {
            match: ["*observes [the] dragon*", "*view [the] dragon*", "view dragon" ],
            nlpMatch: (doc, h) => h.simple(doc).match("^(view|observes) dragon").text() != "",
            setBottomText3:"Tessa observes the dragon is big, red, fiery, and hot. It is making the steam with it's flames."
        },
    },

    {
        scene: "bridge",
        start: {
            setTopText1: "Tessa approaches the shabby rope bridge. It does not look safe to cross.",
            setBottomText2: "Far below, Tessa sees the raging river.",
            setLeftText3: "The safety of the cave calls to Tessa."
        },
        if_Cross: {
            nlpMatch: (doc, h) => h.simple(doc).match("(approaches|cross) bridge$").text() != "",
            match: ["[Tessa] cross [the] [shabby] [rope] bridge", "Tessa approaches the [shabby] [rope] bridge to cross [it]" ],
            gotoScene:"river"
        },
        if_Back: {
            nlpMatch: (doc, h) => h.simple(doc).match("(sees|approaches) cave$").text() != "",
            match: ["[Tessa] approaches cave", "cave"],
            gotoScene:"mine_view"
        },
        if_MakeSafe: {
            nlpMatch: (doc, h) => !h.hasNegation(doc) && doc.match("does? look safe to cross").text() != "",    
            match: ["*It look safe to cross*"],
            gotoScene:"safe_bridge"
        },
    },


    {
        scene: "safe_bridge",
        start: {
            setTopText1: "Tessa approaches the shabby rope bridge. It looks safe enough to cross.",
            setBottomText2: "Far below, Tessa sees the raging river.",
            setLeftText3: "The safety of the cave calls to Tessa."
        },
        if_Cross: {
            nlpMatch: (doc, h) => h.simple(doc).match("(approaches|cross) bridge$").text() != "",
            match: ["[Tessa] cross [the] [shabby] [rope] bridge", "Tessa approaches the [shabby] [rope] bridge to cross [it]" ],
            gotoScene:"trail"
        },
        if_Back: {
            nlpMatch: (doc, h) => h.simple(doc).match("(sees|approaches) cave$").text() != "",
            match: ["[Tessa] approaches cave", "cave"],
            gotoScene:"mine_view"
        }
    },


    {
        scene: "trail",
        start: {
            setTopText1: "Tessa enters find a trail, and moves quickly through the wooded forest.",
            setLeftText2: "Tessa runs up a hill,",
            setRightText3: "and finds a bear blocking the path.",
            setBottomText4: 'Tessa thinks to her self, "Just my luck, a bear! Why not a nice rabbit?"'
        },
        if_Cross: {
            match: ["[and] finds a [nice] rabbit blocking the path", "[and] finds a [nice] rabbit"],
            gotoScene:"dragon"
        }
    },


    {
        scene: "dragon",
        start: {
            setTopText1: "TODO",
        }
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
            match: ["Beside her is the torch", "finds torch beside her" ],
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
            match: ["*there is a path to the water", "*see [there] [is] [a] path to [the] water", "*[see] there is [a] path to [the] water" ],
            gotoScene:"river"
        }
    },

    {
        scene: "river",
        start: {
            setTopText1: "Tessa falls into the river, which is running freely.",
            setBottomText2: "Tessa has difficulty swiming in the strong current."
        },
        if_TryRunOnRiver: {
            match:["Tessa [is] running in [the] river"],
            setLeftText1:"Tessa attempts to run on the river, which fails."
        },
        if_CanSwim: {
            nlpMatch: (doc, h) => doc.delete('#Determiner').delete("her").delete("Tessa").delete("she").ifNo("difficulty").if("(river|current)").match("is swiming in").text() !="",
            match: ["Tessa is swiming in the [strong] current.", "Tessa is swiming in the [strong] river.", "[Tessa] swiming in the [strong current] [river]" ],
            gotoScene:"river_shore"
        }
    },

    {
        scene: "river_shore",
        start: {
            setLeftText1: "Tessa reaches the river shore.",
            setTopText2: "Other than this one patch of dry land, there is no other clear place to stand.",
            setBottomText3: "All arround the shore are dense sharp bushes."
        },
        if_clearPath: {
            nlpMatch: (doc, h) => doc.match("^all? arround the shore (is|are) (clear land|bushes|place to stand)$").text() != "",
            match: ["[all] arround shore are clear land", "[all] arround the shore are bushes", "[Tessa] is sure where to go"],
            gotoScene: "trail"
        },
        if_dryLand: {
            match: ["Tessa reaches [dry] land", "Tessa reaches [the] land"],
            setRightText1:"Tessa is on land for sure, but unsure where to go."
        }
    }

];
