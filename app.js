const pokemon = require("./data.js");
const game = {
    party: [],
    gyms: [
        { location: "Pewter City", completed: false, difficulty: 1 },
        { location: "Cerulean City", completed: false, difficulty: 2 },
        { location: "Vermilion City", completed: false, difficulty: 3 },
        { location: "Celadon City", completed: false, difficulty: 4 },
        { location: "Fuchsia City", completed: false, difficulty: 5 },
        { location: "Saffron City", completed: false, difficulty: 6 },
        { location: "Cinnabar Island", completed: false, difficulty: 7 },
        { location: "Viridian City", completed: false, difficulty: 8 },
    ],
    items: [
        { name: "potion", quantity: 4 },
        { name: "pokeball", quantity: 8 },
        { name: "rare candy", quantity: 99 },
    ],
};

//console.dir(pokemon, { maxArrayLength: null })

/*
Exercise 3
1. Add a new property to the `game` object. Let's call it "difficulty".
2. Choose a value for "difficulty" that you think fits the game. Ex: "Easy", "Med" or "Hard". How would you assign it?

Solve Exercise 3 here:
*/
game.difficulty = "Easy";

//console.log(game)

/*
Exercise 4
1. Select a starter Pokémon from the `pokemon` array. Remember, a starter Pokémon's `starter` property is true.
2. Add this Pokémon to the `game.party` array. Which array method will you use to add them?


Solve Exercise 4 here:
*/
let starterPokemons = pokemon.filter((p) => p.starter === true);
let randomIndex = Math.floor(Math.random() * starterPokemons.length);
let selectedStarter = starterPokemons[randomIndex];

if (!game.party.some((p) => p.number === selectedStarter.number)) {
    game.party.push(selectedStarter);
    console.log(`${selectedStarter.name} has been added to your party.`);
}

/*
Exercise 5
1. Choose three more Pokémon from the `pokemon` array and add them to your party.
2. Consider different attributes like 'type' or 'HP' for your selection. Which array method will you use to add them?


Solve Exercise 5 here:
*/

let fireTypePokemon = pokemon.find(
    (p) =>
        p.type === "fire" &&
        !game.party.some((partyPokemon) => partyPokemon.number === p.number)
);
let highHPPokemon = pokemon.find(
    (p) =>
        p.hp > 65 &&
        !game.party.some((partyPokemon) => partyPokemon.number === p.number)
);
let waterTypeHighHPPokemon = pokemon.find(
    (p) =>
        p.type === "water" &&
        p.hp > 40 &&
        !game.party.some((partyPokemon) => partyPokemon.number === p.number)
);

if (fireTypePokemon) {
    game.party.push(fireTypePokemon);
    console.log(`${fireTypePokemon.name} added to your party.`);
}
if (highHPPokemon) {
    game.party.push(highHPPokemon);
    console.log(`${highHPPokemon.name} added to your party.`);
}
if (waterTypeHighHPPokemon) {
    game.party.push(waterTypeHighHPPokemon);
    console.log(`${waterTypeHighHPPokemon.name} added to your party.`);
    console.log();
}
/*
Exercise 6
1. Arrange the Pokémon in `game.party` by their HP. The one with the highest HP should come first.
2. You'll need to use the `.sort()` method. How does the compare function work in sorting numbers?


Solve Exercise 6 here:
*/
game.party.sort((a, b) => b.hp - a.hp);
//console.log(game.party);

/*
Exercise 7
1. Set the `completed` property to true for gyms with a difficulty below 3.
2. Think about how you'd loop through the `gyms` array to check and update the `completed` property.


Solve Exercise 7 here:
*/
for (let i = 0; i < game.gyms.length; i++) {
    if (game.gyms[i].difficulty < 3) {
        game.gyms[i].completed = true;
    }
}
//console.log(game.gyms);

/*
Exercise 8
1. Evolve the starter Pokémon you added to your party earlier. Each starter Pokémon evolves into a specific one.
2. How would you replace the current starter Pokémon in your party with its evolved form?

Hint: 
  - Pokemon 1: Bulbasaur evolves into Pokemon 2: Ivysaur
  - Pokemon 4: Charmander evolves into Pokemon 5: Charmeleon
  - Pokemon 7: Squirtle evolves into Pokemon 8: Wartortle
  - Pokemon 25: Pikachu evolves into Pokemon 26: Raichu

More Hints: The existing starter Pokemon will be *replaced* in your party with the Pokemon it evolved into. Remember that you're working with an array of objects - what array method is ideal for replacing one element with another? 

Solve Exercise 8 here:
*/
for (let i = 0; i < game.party.length; i++) {
    let currentPokemon = game.party[i];
    let evolvedPokemon = pokemon.find(
        (p) => p.number === currentPokemon.number + 1
    );

    if (evolvedPokemon) {
        game.party[i] = evolvedPokemon;
        console.log(
            `${currentPokemon.name} has evolved into ${evolvedPokemon.name}.`
        );
    } else {
        console.log(`${currentPokemon.name} cannot be evolved.`);
    }
}
console.log();
/*
Exercise 9
1. Print the name of each Pokémon in your party.
2. Consider using a loop or an array method to access each Pokémon's name.

Solve Exercise 9 here:
*/
console.log(
    "Pokémon in your party: " +
        game.party.map((pokemon) => pokemon.name).join(", ")
);
console.log();
/*
Exercise 10
1. Can you print out all the starter Pokémon from the `pokemon` array?
2. Think about how you can identify a starter Pokémon and then log their names.


Solve Exercise 10 here:
*/
console.log(
    "Starter Pokémon: " +
        pokemon
            .filter((p) => p.starter)
            .map((p) => p.name)
            .join(", ")
);
console.log();
/*
Exercise 11
1. Add a method called `catchPokemon` to the `game` object. This method should:
  - Accept an object as a parameter called `pokemonObj`
  - Add the `pokemonObj` to the `game.party` array.
  - not return anything

After writing this method, call it and pass in a Pokemon object of your choice from the `pokemon` data to catch it.

Solve Exercise 11 here:
*/
game.catchPokemon = function (pokemonObj) {
    this.party.push(pokemonObj);
};
// let pokemonToCatch = pokemon.find(p => p.number === 113);
// game.catchPokemon(pokemonToCatch);
/*
Exercise 12
1. Copy the `catchPokemon` method that you just wrote above, and paste it below. Modify it so that it also decreases the number of pokeballs in your inventory each time you catch a Pokémon.
2. How will you find and update the quantity of pokeballs in the `game.items` array?

Tips:
For this exercise, it's okay to have a negative number of pokeballs.
After updating the method, call it and pass in a Pokemon object of your choice from the `pokemon` data to catch it.
Also, log the `game.items` array to confirm that the pokeball quantity is being decremented.

Solve Exercise 12 here:
*/
// game.catchPokemon = function (pokemonObj) {
//     this.party.push(pokemonObj);
//     let pokeballItemIndex = this.items.findIndex(
//         (item) => item.name === "pokeball"
//     );
//     if (pokeballItemIndex !== -1) {
//         this.items[pokeballItemIndex].quantity--;
//     }
// };

// let pokemonToCatch = pokemon.find((p) => p.number === 25);
// game.catchPokemon(pokemonToCatch);

//console.log(game.items);

/*
Exercise 13
1. Similar to Exercise 7, now complete gyms with a difficulty below 6. How will you approach this?
 (change the value of `complete` in the qualifying objects from false to true).

Solve Exercise 13 here:
*/
for (let i = 0; i < game.gyms.length; i++) {
    if (game.gyms[i].difficulty < 6) {
        game.gyms[i].completed = true;
    }
}
console.log(game.items.map(item => `\x1b[32m${item.name}\x1b[0m: \x1b[33m\x1b[1m${item.quantity}\x1b[0m`).join(", "));
console.log();
/*
Exercise 14
1. Create a `gymStatus` method in `game` to tally completed and incomplete gyms.
2. How will you iterate through the `gyms` array and update the tally? Remember to log the final tally.

This method should:
  - Not accept any arguments.
  - Initially create a constant `gymTally`, which is an object that has two 
    properties: `completed` and `incomplete`, both of which are initially set to 0.
  - Iterate through the objects in the `game.gyms` array and update the 
    properties on `gymTally` as follows: 
    - `completed` should count how many gyms in the array have a value of `true` 
      for their `completed` property. 
    - `incomplete` should count how many gyms in the array have a value of 
      `false` for their `completed` property.
  - Log the value of `gymTally`.
  - The method should not return anything.

For example, if five gym objects have a value of `true` on their `completed` property and three gym objects have a value of `false` on their `completed` property, the logged value would be: `{ completed: 5, incomplete: 3 }`.

Solve Exercise 14 here:
*/
//console.log(game.items);

game.gymStatus = function() {
  const gymTally = { completed: 0, incomplete: 0 };

  for (let gym of this.gyms) {
      if (gym.completed) {
          gymTally.completed++;
      } else {
          gymTally.incomplete++;
      }
  }

  console.log("Gyms:", gymTally);
};

game.gymStatus();
console.log();
/*
Exercise 15
1. Add a `partyCount` method to `game` that counts the number of Pokémon in your party.

This method should:
  - Not accept any arguments.
  - Count the number of Pokemon in the party.
  - return the found number of Pokemon in the party.

Solve Exercise 15 here:
*/
game.partyCount = function() {
  return this.party.length;
};

console.log(game.partyCount());

/*
Exercise 16
1. Now, complete gyms with a difficulty below 8. Reflect on how this is similar to or different from the previous gym exercises.
(change the value of `complete` in the qualifying objects from false to true).

Solve Exercise 16 here:
*/

for (let i = 0; i < game.gyms.length; i++) {
  if (game.gyms[i].difficulty < 3) {
      game.gyms[i].completed = true;
  }
}
//console.log(game.gyms);
/*
Exercise 17
1. Log the entire `game` object to the console. Take a moment to review the changes you've made throughout the exercises.


Solve Exercise 17 here:
*/
console.log()
console.log(game)

/*
Exercise 18
Add a new property to the `game` object called `collection` and initialize its value to an empty array.

Copy the `catchPokemon` method you wrote in Exercise Twelve and paste it below. Modify it so that:
  - Ensure that no more than six Pokemon can be in the party at any time. 
    Excess Pokemon should be placed in the `game.collection` array.
  - It's up to you how to distribute Pokemon in a situation where more than six 
    would be placed into the `game.party` array.

Again, for this exercise, it's okay to have a negative number of pokeballs.

After updating the method, use it by calling it and passing in a pokemon object of your choice from the `pokemon` data to catch it.

Also, log the `game.items` array to confirm that the pokeball quantity is being decremented.

Solve Exercise 18 here:
*/

// game.catchPokemon = function(pokemonObj) {
//   if (this.party.length >= 6) {
//       console.log("No space in party. Pokemon not caught.");
//       return;
//   }
//   this.party.push(pokemonObj);
//   let pokeballItemIndex = this.items.findIndex(item => item.name === "pokeball");
//   if (pokeballItemIndex !== -1) {
//       this.items[pokeballItemIndex].quantity--;
//   } else {
//       console.log("No Pokeballs left.");
//   }
// };
// let pokemonToCatch = pokemon.find(p => p.number === 40);

// game.catchPokemon(pokemonToCatch);

/*
Exercise 19
Copy the `catchPokemon` method that you just wrote above, and paste it below. The time has come to make it so that we cannot catch a Pokemon when we do not have any pokeballs to catch it with. 

Modify the method so that if there are no pokeballs a message will be displayed that there are not enough pokeballs to catch the desired Pokemon.

Also, ensure that the Pokemon isn't added to the `game.party` or the `game.collection`.

Solve Exercise 19 here:
*/


// game.catchPokemon = function(pokemonObj) {
//   let pokeballItemIndex = this.items.findIndex(item => item.name === "pokeball");
//   if (pokeballItemIndex === -1 || this.items[pokeballItemIndex].quantity === 0) {
//       console.log("Not enough Pokeballs to catch the desired Pokemon.");
//       return;
//   }
  
//   if (this.party.length >= 6) {
//       console.log("No space in party. Pokemon not caught.");
//       return;
//   }
  
//   this.party.push(pokemonObj);
//   this.items[pokeballItemIndex].quantity--;
// };

game.catchPokemon = function(pokemonName) {
  let normalizedPokemonName = pokemonName.toLowerCase();
  let foundPokemon = pokemon.find(p => p.name.toLowerCase() === normalizedPokemonName);
  
  if (!foundPokemon) {
      console.log(`The selected Pokemon "${pokemonName}" does not exist.`);
      return;
  }

  let pokeballItemIndex = this.items.findIndex(item => item.name === "pokeball");
  if (pokeballItemIndex === -1 || this.items[pokeballItemIndex].quantity === 0) {
      console.log("Not enough Pokeballs to catch the desired Pokemon.");
      return;
  }
  
  if (this.party.length >= 6) {
      console.log("No space in party. Pokemon not caught.");
      return;
  }
  
  this.party.push(foundPokemon);
  this.items[pokeballItemIndex].quantity--;
};

game.catchPokemon("PiKacHU");
console.log(
  "Pokémon in your party: " +
      game.party.map((pokemon) => pokemon.name).join(", ")
);
console.log();
/*
Exercise 21
Dynamically construct an object with the existing `pokemon` data sorted by the different pokemon types. The object will have this structure:

{
  grass: [
    { number: 1, name: 'Bulbasaur', type: 'grass', hp: 45, starter: true },
    { number: 2, name: 'Ivysaur', type: 'grass', hp: 60, starter: false },
    { number: 3, name: 'Venusaur', type: 'grass', hp: 80, starter: false },
    * more grass type Pokemon objects...
  ],
  fire: [
    { number: 4, name: 'Charmander', type: 'fire', hp: 39, starter: true },
    * more fire type Pokemon objects...
  ],
  water: [
    * water type Pokemon objects...
  ],
  * etc... until there is an array for every Pokemon type!
}

Log the object when it's constructed.

Solve Exercise 21 here:
*/


const sortedPokemonByType = {};

pokemon.forEach(poke => {
    if (!sortedPokemonByType[poke.type]) {
        sortedPokemonByType[poke.type] = [];
    }
    sortedPokemonByType[poke.type].push(poke);
});

const colors = {
  grass: "\x1b[32m",    // green
  fire: "\x1b[31m",     // red
  water: "\x1b[34m",    // blue
  bug: "\x1b[35m",      // purple
  normal: "\x1b[37m",   // white
  poison: "\x1b[38;5;208m",   // orange
  electric: "\x1b[33m", // yellow
  fairy: "\x1b[35m",    // pink
  fighting: "\x1b[90m", // gray
  psychic: "\x1b[95m",  // hot pink
  rock: "\x1b[38;5;130m",     // brown
  ghost: "\x1b[90m",    // dark gray
  ice: "\x1b[94m",      // light blue
  dragon: "\x1b[38;5;28m"    // gold
};

for (const type in sortedPokemonByType) {
  console.log(colors[type] + `${type}: ${sortedPokemonByType[type].map(poke => poke.name).join(', ')}`);
  console.log('\x1b[0m'); // Reset color
}


