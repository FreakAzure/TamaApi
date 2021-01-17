const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    owner_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    max_health: {
        type: Number,
        required: true
    },
    health: {
        type: Number,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    happiness: {
        type: Number,
        required: true
    },
    hunger: {
        type: Number,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    max_energy: {
        type: Number,
        required: true
    },
    energy: {
        type: Number,
        required: true
    },
    xp_next_level: {
        type: Number,
        required: true
    },
    pet_type: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Pet', petSchema);
