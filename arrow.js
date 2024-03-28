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
    difficulty: "Easy",
};

game.difficulty = "Easy";

let starterPokemons = pokemon.filter((p) => p.starter === true);
let randomIndex = Math.floor(Math.random() * starterPokemons.length);
let selectedStarter = starterPokemons[randomIndex];

if (!game.party.some((p) => p.number === selectedStarter.number)) {
    game.party.push(selectedStarter);
    console.log(`${selectedStarter.name} has been added to your party.`);
}

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

game.party.sort((a, b) => b.hp - a.hp);

for (let i = 0; i < game.gyms.length; i++) {
    if (game.gyms[i].difficulty < 3) {
        game.gyms[i].completed = true;
    }
}

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

console.log(
    "Pokémon in your party: " +
        game.party.map((pokemon) => pokemon.name).join(", ")
);
console.log();

console.log(
    "Starter Pokémon: " +
        pokemon
            .filter((p) => p.starter)
            .map((p) => p.name)
            .join(", ")
);
console.log();

game.catchPokemon = function (pokemonName) {
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
