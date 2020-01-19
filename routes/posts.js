var express = require('express');
var router = express.Router();
var Post = require('../model/post');
var User = require('../model/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Inkyinnhmwe');
});

router.get('/postadd', function(req, res, next){
  User.find(function(err,rtn){
    if (err) throw err;
      res.render('post/post-add',{users: rtn});
  })
})

router.post('/postadd', function(req, res, next){
  var post = new Post();
  post.title = req.body.title;
  post.content = req.body.content;
  post.author= req.body.author;
  post.save(function(err, rtn){
    if (err) throw err;
    console.log(rtn);
    res.redirect('/');
  })
})

router.get('/postlist', function(req, res, next){
  Post.find({}).populate('author').exec(function(err, rtn){
    if (err) throw err;
    console.log(rtn);
    res.render('post/post-list',{postFactors : rtn});
  })
})

router.get('/postdetail/:id' , function(req, res, next){
  console.log(req.params.id);
  Post.findById(req.params.id).populate('author').exec(function(err, rtn){
    if (err) throw err;
    console.log(rtn);
    res.render('post/post-detail', {postChange : rtn});
  })
})

router.get('/postupdate/:uid', function(req, res, next){
  Post.findById(req.params.uid, function(err, rtn){
    if (err) throw err;
    User.find(function(err2, rtn2){
      if (err2) throw err2;
      console.log(rtn);
      res.render('post/post-update', {postUpdate: rtn, users: rtn2});
    })
  })
})

router.post('/postupdate', function(req, res, next){
  var update = {
    title: req.body.title,
    content:req.body.content,
    author:req.body.author
  };
  Post.findByIdAndUpdate(req.body.id, {$set: update}, function(err, rtn){
    if (err) throw err;
    console.log(rtn);
    res.redirect('/posts/postlist');
  })
})

router.get('/postdelete/:id', function(req, res){
  Post.findByIdAndRemove(req.params.id, function(err, rtn){
    if (err) throw err;
    console.log(rtn);
    res.redirect('/posts/postlist');
  })
})

module.exports = router;