var express = require("express");
var router = express.Router();


router.post("/", function(req,res,next){

  var con = req.app.get("connection");
  var user_id = req.surveySession.user_id;
  console.log(req.body);

  con.query(`UPDATE decision_making SET candidate_choice = ${req.body.candidateChoice} WHERE user_id = '${user_id}';`,function(err){
    if(err)throw{err};
  });

  res.redirect('/study3P2.html');
});


module.exports = router;
