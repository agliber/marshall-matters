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

  Object.values(times).forEach(function(time,index){

    con.query(`UPDATE decision_making SET study3P1_${index} = '${time}' WHERE user_id = '${user_id}' ;`,function(err){
      if(err)throw{err};
    });
  });

  res.clearCookie('times');

  con.query(`UPDATE decision_making SET candidate_choice = ${req.body.candidateChoice} WHERE user_id = '${user_id}';`);

  res.redirect('/study3P2.html');
} );


module.exports = router;
