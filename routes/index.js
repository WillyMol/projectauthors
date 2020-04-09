/*
Here we are goint to setup all routes in our application
remember to export this router and import it into server.js
*/
const express = require('express');
const router = express.Router();

router.get('/',(req,res) => {
    //res.send('Hello -- Anything');
    res.render('index'); //index (index.ejs) is the name 
                         //of the view for route index.js
});

module.exports = router
