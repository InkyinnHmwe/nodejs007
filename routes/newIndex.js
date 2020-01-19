var express = require('express');
var router = express.Router();
var User = require('../model/user');
var Post = require('../model/post');

/* GET home page. */

router.get('/newIndex', function(req, res, next){
  res.render('newIndex', {title: 'Inkyinnhmwe'});
})

router.get('/home', function(req, res, next){
  res.render('home', {title: 'Inkyinn Hmwee'});
});



module.exports = router;
