const { response } = require('express');
const express = require('express');
const router = express.Router();
const { v4: uuid } = require('uuid');

// replace this string with your full name
const name = "Ziling Chen!"

console.log(`My name is ${name}`)

// use this list as your temporary database!
// note that it will reset every time you restart your server
const myPokemon = [{
    id: "fc10b559-872c-43cd-bad2-f02e2e0a2d58", name: "Pikachu", health: 10, level: 1
}];

router.get('/', function(req, res) {
    // return all pokemon
    res.send(myPokemon);
});


router.post('/', (req, res) => {
    // if the pokemon name already exists in the list, return an error
    // randomly generate an id using UUID ["uuid()"]
    // randomly generate a level between 1 and 10, inclusive, if none is given
    // randomly generate a health between 10 and 100, inclusive, if none is given
    // insert your pokemon into the myPokemon list
    // return a 200

    const newPokemonName = req.body.name;
    const newLevel = Math.floor(Math.random() * 11);
    const newHealth = Math.floor(Math.random() * 101);
    const result = myPokemon.find(a => a.name === newPokemonName);
    if (result) {
        res.status(400)
        return res.send({error: "Existing pokemon!"});
    }

    myPokemon.push({
        id: uuid(),
        name: newPokemonName,
        health: newHealth,
        level: newLevel,
    })

    res.status(200).send("Sucuccess!");
});

router.get('/:pokemonId', function (req, res) {
    // return pokemon if one is found matching the pokemonId
    // return a 404 if no pokemon matches that pokemonId
    

    const pokemonSearch = req.params.pokemonId;
    const foundPokemon = myPokemon.find(a => a.id === pokemonSearch);
    if (foundPokemon) {
        res.send(foundPokemon)
    }

    res.status(404);
    res.send({error: "No pokemon found!"});
});

router.put('/:pokemonId', function(req, res) {
    // update the pokemon matching the pokemonId
    // based on the req body
    // return a 404 if no pokemon matches that pokemonId  

    const pokemonMatch = req.params.pokemonId
    const match = myPokemon.find(pokemonItem => pokemonItem.id === pokemonMatch);
    if (!match) {
        res.status(404)
        return res.send("No pokemon found!");
    }

    match.name = req.body.name;
    match.level = req.body.level;
    match.health = req.body.health;

    res.status(200).send("Success!");
})

router.delete('/:pokemonId', function(req, res) {
    // delete pokemon if pokemonId matches the id of one
    // return 200 even if no pokemon matches that Id

    const pokemonDeleteId = req.params.pokemonId;
    const deleteIndex = myPokemon.findIndex(p => p.id === pokemonDeleteId);
    if(deleteIndex) {
        myPokemon.splice(deleteIndex, 1);
        res.send(200).send("Succuss deletion!");  
    }
    
    res.status(200);
})

module.exports = router;