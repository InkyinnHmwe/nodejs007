var express = require('express');
var router = express.Router();
var Post =require('../../model/post');
var User = require('../../model/user');

router.get('/list', function(req,res,next){
  Post.find(function(err,rtn){
    if (err){
      res.status(500).json({
        message: "Internal server error",
        error:err
      })
    }else {
      res.status(200).json({
        posts:rtn
      })
    }
  })
})

router.post('/add', function(req,res,next){
  var post = new Post();
  post.title = req.body.title;
  post.content = req.body.content;
  post.author = req.body.author;
  post.save(function(err,rtn){
    if(err){
      res.status(500).json({
        message: "Internal server error",
        error:err
      })
    }else{
      res.status(201).json({
        message:"new post added",
        posts:rtn
      })
    }
  })
})

router.get('/:id', function(req,res,next){
  Post.findById(req.params.id).populate('author').exec(function(err, rtn){
    if(err) {
      res.status(500).json({
        message:"Internal server error",
        error:err
      })
    }else{
      res.status(200).json({
        message:"Posts details",
        posts:rtn
      })
    }
  })
})

router.patch('/:id', function(req, res){
  var update = {};
  for (var opt of req.body) {
    update[opt.proName]=opt.proValue
  }
Post.findByIdAndUpdate(req.params.id, {$set:update},function(err, rtn){
    if(err){
      res.status(500).json({
        message:"Internal server error",
        error:err
      })
    }else {
      res.status(201).json({
        message:"User account updated"
      })
    }
  })
})

router.delete('/:id', function(req,res){
  Post.findByIdAndRemove(req.params.id,function(err, rtn){
    if (err){
      res.status(500).json({
        message:"Internal server error",
        error:err
      })
    }else {
      res.status(200).json({
        message:"Post deleted"
      })
    }
  })
})
module.exports = router;
