var express = require('express');
var router = express.Router();
var Admin = require('../../model/admin');
var jwt = require('jsonwebtoken');

router.post('/signup', function(req,res){
  var admin = new Admin();
  admin.name = req.body.name;
  admin.email = req.body.email;
  admin.password = req.body.password;
  admin.save(function(err, rtn){
    if(err){
      res.status(500).json({
        message: "Internal server error",
        error:err
      })
    }else {
      res.status(201).json({
        message: "New account created",
        admin:rtn
      })
    }
  })
})

router.post('/signin', function(req,res){
  Admin.findOne({email:req.body.email}, function(err, rtn){
    if(err){
      req.status(500).json({
        message: "Internal server error",
        error:err
      })
    }else{
      console.log(req.body.password, rtn.password);
      if(rtn!=null && Admin.compare(req.body.password, rtn.password)){
        var token = jwt.sign(
          {
          name:rtn.name,
          id:rtn._id,
          email:rtn.email
        },
        "inkyinnhmwe",
        {
          expiresIn:"3h"
        }
      );
      res.status(200).json({
        message:"Admin Signin success",
        token:token
      })

    }
    else{
      res.status(404).json({
        message:"account not found"
      })
    }
  }
  })
})
  module.exports = router;
