var express = require("express");
var router = express.Router();
var cookieParser = require("cookie-parser");


router.use(cookieParser() );

router.post("/", function(req,res,next){

  var con = req.app.get("connection");
  var user_id = req.surveySession.user_id;
  console.log(req.body);
  console.log(req.cookies);


  var times = JSON.parse(req.cookies.times );//timeData object from study3P1.js

  Object.keys(times).forEach(function(key,index){

    con.query(`UPDATE decision_making SET study3P1_${index} = '${times[key]}' WHERE user_id = '${user_id}' ;`,function(err){
      if(err)throw{err};
    });
  });

  res.clearCookie('times');

//
  res.redirect('/study3P1choice.html');
} );


module.exports = router;
