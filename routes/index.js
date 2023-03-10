const express = require('express')

const router = express.Router();

router.get('/', (req,res)=> {
    console.log('I m another one');
    res.render('index')
})

module.exports = router;