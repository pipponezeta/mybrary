const express = require('express');

const router = express.Router();

const Author = require('../models/author')

// authors index route
router.get('/', async (req,res)=> {
    console.log('I m authors index');
    let searchOptions = {}
    if (req.query.name !== null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try{
        const authors = await Author.find(searchOptions)
        res.render('authors/index', { 
            authors: authors,
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
})

// Create new Authors Route
router.get('/new', (req,res)=> {
    console.log('I m authors new');
    res.render('authors/new', { author: new Author()})
})

// Create Authors
router.post('/', async (req,res)=> {
    console.log('I m creating new Author ' + req.body.name);
    const author = new Author( {
        name: req.body.name
    })
    try{
        const newAuthor = await author.save()
        res.redirect('authors')
    } catch {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating Author'
        })
    }
    
    
})



module.exports = router;