const { isLoggedIn } = require('../middleware')
const express = require('express');
const router = express.Router();

router.post('/', (req,res) => {
    console.log(req.body.searchTerm)
    return 
})

module.exports = router;