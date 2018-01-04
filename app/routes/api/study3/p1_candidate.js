var express = require("express");
var router = express.Router();
var cookieParser = require("cookie-parser");
router.use(cookieParser() );
router.post("/", function(req,res,next){

  var con = req.app.get("connection");
  var user_id = req.surveySession.user_id;
  console.log(req.body);

  var times = JSON.parse(req.cookies['times']);//timeData object from study3P1.js

  Object.values(times).forEach(function(time,index){
    //console.log(`UPDATE decision_making SET study3P1_${index} = ${time} WHERE user_id = '${user_id}' ;`);
    con.query(`UPDATE decision_making SET study3P1_${index} = '${time}' WHERE user_id = '${user_id}' ;`);
  });
  console.log(`UPDATE decision_making SET candidate_choice = ${req.body.candidateChoice} WHERE user_id = '${user_id}';`);

  con.query(`UPDATE decision_making SET candidate_choice = ${req.body.candidateChoice} WHERE user_id = '${user_id}';`);
  //console.log(document.cookie);
  res.redirect('/thankYouPage.html');
} );


module.exports = router;
