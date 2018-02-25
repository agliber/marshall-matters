var express = require("express");
var router = express.Router();

router.get("/", function(req,res,next){

  var con = req.app.get('connection');
  let user_id = req.surveySession.user_id;
  con.query(`SELECT mTurk_code FROM decision_making WHERE user_id = '${user_id}' ;`,function(err,result,fields){
    if(err) throw err;
    var mTurkCode = JSON.parse(JSON.stringify(result[0]) ).mTurk_code;
    console.log(mTurkCode);
    res.send({"mTurkCode":mTurkCode});
  });


});

module.exports = router;
