var express = require("express");
var router = express.Router();

router.post("/", function(req,res,next){
  
    let user_id = req.surveySession.user_id;
    if(!user_id){
      console.log("user session expired");
      res.redirect('/');
    }else{
      next();
    }


});

module.exports = router;
