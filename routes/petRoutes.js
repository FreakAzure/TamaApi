const router = require('express').Router();
const User = require('../models/User');
const Pet = require('../models/Pet');
const verify = require('./tokenVerify');


// Get user's pet
router.get('/', verify, async (req, res) => {
    const user = await User.findOne({_id: req.user});
    if (!user) return res.status(400).send('User not found');
    const pet = await Pet.findOne({owner_id: user._id});
    if (!pet) return res.status(404).send('Pet not found')
    res.send(pet);
})

// Create a new pet for the user
router.get('/generate', verify, async (req, res) => {
    // Get user info
    const user = await User.findById(req.user);
    if (!user) return res.status(400).send('User not found');

    const checkPet = await Pet.findOne({owner_id: req.user});
    if (!req.query.override || req.query.override === "false") {
        if(checkPet) return res.status(400).send('The user already have a pet');
    }
    await Pet.remove(checkPet);

    const typeRandom = Math.floor(Math.random() * 150);
    var petType = 0
    if(typeRandom <= 5) {
        petType = 1 // Void
    } else if (typeRandom > 5 && typeRandom <= 30) {
        petType = 2 // Fire
    } else if (typeRandom > 30 && typeRandom <= 50) {
        petType = 3 // Water
    } else if (typeRandom > 50 && typeRandom <= 70) {
        petType = 4 // Earth
    } else if (typeRandom > 70 && typeRandom <= 90) {
        petType = 5 // Wind
    } else if (typeRandom > 90) {
        petType = 0 // Neutral
    }

    const pet = new Pet({
        owner_id: user._id,
        name: req.body.name,
        max_health: 100,
        health: 100,
        level: 1,
        happiness: 100,
        hunger: 100,
        experience: 0,
        max_energy: 100,
        energy: 100,
        xp_next_level: 100,
        pet_type: petType
    })
    try {
        const savedPet = await pet.save();
        res.send(savedPet);
    } catch(err) {
        res.status(500).send(err);
    }
})

// save pet
router.put('/', verify, async (req, res) => {
    // Get user info
    const user = await User.findById(req.user);
    if (!user) return res.status(400).send('User not found');

    try {
        // Get user's pet
         const updatedPet = await Pet.findOneAndUpdate({owner_id: req.user}, 
            {
                name: req.body.name,
                max_health: req.body.max_health,
                health: req.body.health,
                level: req.body.level,
                happiness: req.body.happiness,
                hunger: req.body.hunger,
                experience: req.body.experience,
                max_energy: req.body.max_energy,
                energy: req.body.energy,
                xp_next_level: req.body.xp_next_level,
                pet_type: req.body.pet_type
            }, 
            {returnOriginal: false});
            res.send('Success');
    } catch (err) {
        res.status(400).send(err);
    }
})

module.exports = router
