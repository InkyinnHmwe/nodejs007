var express = require('express');
var router = express.Router();
var Post =require('../model/post');
var User = require('../model/user');

router.get('/list', function(req,res,next){
  Post.find(function(err, rtn){
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

// router.post('/add', function(req,res,next){
//   var post = new Post();
//   post.title = req.body.title;
//   post.content = req.body.content;
//   post.author = req.body.author;
//   post.save(function(err,rtn){
//     if(err){
//       res.status(500).json({
//         message: "Internal server error",
//         error:err
//       })
//     }else{
//       res.status(201).json({
//         message:"new post added",
//         posts:rtn
//       })
//     }
//   })
// })
module.exports = router;
