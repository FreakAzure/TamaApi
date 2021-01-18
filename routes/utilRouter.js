const { verify } = require('jsonwebtoken');

const router = require('express').Router();

// Get date in millis
router.get('/date', verify, async (req, res) => {
    const date = Date.now().toString()
    res.send(date);
})

module.exports = router