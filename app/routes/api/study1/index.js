var express = require("express");
var router = express.Router();

router.post("/", function(req,res,next){

    var con = req.app.get('connection');
    let user_id = req.surveySession.user_id;
    var body = req.body;
    for(var key in body){
      if (Object.prototype.hasOwnProperty.call(body,key)) {
          if(key == "unchecked") continue;//skip the unckecked body property
          con.query(`UPDATE decision_making SET study1_${key} = '${body[key]}' WHERE user_id = '${user_id}' ;`);
      }
    }
    if(req.body.unchecked){
      if(Array.isArray(req.body.unchecked) ){
        req.body.unchecked.forEach(function(characteristicNotChecked){
            con.query(`UPDATE decision_making SET study1_${characteristicNotChecked} = 0 WHERE user_id = '${user_id}' ;`);
        });
      }else{
        con.query(`UPDATE decision_making SET study1_${req.body.unchecked} = 0 WHERE user_id = '${user_id}' ;`);
      }
    }


    con.query(`UPDATE decision_making SET study_progress = 1 WHERE user_id = '${user_id}' ;`);
    res.status(307).redirect('/study2P1.html');
    next();
});

module.exports = router;
