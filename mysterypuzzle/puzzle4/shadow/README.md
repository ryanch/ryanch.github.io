# Game Desciption

## High level description
At any given time the player is in a scene.

Player can move the charactor pressing awsd keys.

Each scene can have 4 blocks of text located at top, left, right, and bottom.

If the player walks over text, then text is highlighted.

In each scene the player can press delete on any word to strike it out.

In each scene the player can press spacebar on any word to put the text above their head. When they walk arround, the text will stay above their head and follow them arround. As a smaller version of the text.

If the player has text above their head, if they press spacebar again, they can insert the word after a highlighted word. When a word is inserted, it is removed from above the players head. If there is no word highlighted nothing happens.

At the start of the game, enter the "home" scene as soon as the player moves.

## Scenes
Scenes are defined in a file called scenes.js, which is a json file.

Each scene is a json object with a field called "scene" which is the unique name of the scene.

Each scene has a "start" field which contains actions that should be triggered one time when the scene is entered.

The actions are:

### setText
set{Location}Text{Order Number}: "text value".

Valid locations are Top, Left, Right, Bottom. 

Valid orders are 1, 2, 3 or 4. 

When a scene loads, all of the 1 ordered text will fade in first. Then 2 seconds later, all of the 2 ordered text. Then 2 seconds after that all of the 3 ordered text. Then 2 seconds after that all of the 4 ordered text.

### gotoScene
gotoScene: "scene-name" - this is the scene to load. 

In a scene there are "if_" triggers.

### if_ triggers

Each scene can also have any number of fields which start with "if_". The full field name does not matter. For example, the name "if_RemovedSearch" is human readable, but "RemovedSearch" has no meaning. 

Each "if_" block has a "match" field. The actions in the if_ block are triggered ONE TIME if ANY text block matches the text value. It is key that the trigger only happens one time. 

The "match" field can have * in the value. The * means any letters. For example: "the*locked*door" should match on : "the big huge locked, heavy wooden door".

When evaluating a match, each text box should be compared against a lower case version, with all redudant spaces removed, and any text that is striked out removed. 


## Sample Scenes File:
[
    {
        scene: "home",
        start: {
            setTopText1: "The hero walks arround the room searching for a door."
        },
        if_RemovedSearch: {
            match: "The hero walks arround the room for a door.",
            setMiddleText: "The locked door."
        },
        if_DoorOpened: {
            match: "The door.",
            gotoScene: "inside"
        }
    },

    {
        scene: "inside",
        start: {
            setTopText1: "The hero opened a door, and entered a room.",
            setLeftText2 "The hero found a chest."
        },
        if_ChestOpened: {
            text: "*opened*chest.",
            setBottomText: "The hero opened the chest, and found a sword."
        }
    }
]


# Implementation plan

1) ✅ Update the existing game to support top, left, right, and bottom text. Start with text saying "top text", "left text", "right text", and "bottom text".
2) ✅ Update the game so the player can press spacebar to put text above their head, and insert it into other blocks of text.
3) ✅ Create the scenes.js file using the sample scenes file. Update the game to load the scenes file only processing the "start" block in scenes. Setup the code to load the "home" scene after the player moves.
4) ✅ Update the scene loading to support the if_ blocks.
5) ✅ Add tests for scene formating.
6) ✅ Add compromise.js integration for semantic pattern matching (NLP features)

## NLP Pattern Matching Feature

The game now supports **semantic pattern matching** using compromise.js as an optional enhancement to the wildcard/optional text system.

### Usage

Add an `nlpMatch` field to any `if_` trigger:

```javascript
if_GoingDown: {
    match: ["going down", "went down"],  // Optional: keep for backward compatibility
    nlpMatch: (doc, helpers) => {
        return helpers.hasVerb(doc, 'go') && helpers.hasDirection(doc, 'down');
    },
    gotoScene: "mine_down"
}
```


 For reference, here are useful tags for game design:

  | Tag         | Matches               | Example         |
  |-------------|-----------------------|-----------------|
  | #Pronoun    | she, he, I, you, they | "she goes"      |
  | #ProperNoun | Tessa, John, London   | "Tessa goes"    |
  | #Verb       | goes, went, running   | "she goes down" |
  | #Adjective  | scared, brave, big    | "she is scared" |
  | #Adverb     | quickly, slowly       | "walks quickly" |
  | #Negative   | not, never, no        | "does not go"   |

  Helper Function for Character Matching

  You can now easily match either character names or pronouns:

  nlpMatch: (doc, h) => {
      const hasCharacter = doc.has('#ProperNoun') || doc.has('#Pronoun');
      const isScared = doc.has('scared') || doc.has('afraid');
      return hasCharacter && isScared;
  }
  // Matches: "she is scared", "Tessa is scared", "he is afraid", etc.

### Benefits
- **Verb flexibility**: Matches "goes", "went", "going", "has gone" automatically
- **Negation detection**: Easily detect "does not go", "doesn't go", "never goes"
- **Semantic understanding**: More robust than rigid string patterns
- **Helper functions**: Pre-built utilities for common patterns



See CLAUDE.md for full documentation and examples. 