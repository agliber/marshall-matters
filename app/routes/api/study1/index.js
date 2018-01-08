var express = require("express");
var router = express.Router();

router.post("/", function(req,res,next){

    var con = req.app.get('connection');
    let user_id = req.surveySession.user_id;
    console.log(req.body);
    if(Array.isArray(req.body.unchecked) ){
      req.body.unchecked.forEach(function(characteristicNotChecked){

          con.query(`UPDATE decision_making SET study1_${characteristicNotChecked} = 0 WHERE user_id = '${user_id}' ;`);
      });
    }else{
      con.query(`UPDATE decision_making SET study1_${req.body.unchecked} = 0 WHERE user_id = '${user_id}' ;`);
    }

    if(Array.isArray(req.body.characteristic) ){
      req.body.characteristic.forEach(function(characteristic){

          con.query(`UPDATE decision_making SET study1_${characteristic} = 1 WHERE user_id = '${user_id}' ;`);

      });
    }else{

      con.query(`UPDATE decision_making SET study1_${req.body.characteristic} = 1 WHERE user_id = '${user_id}' ;`);
    }

    res.redirect('/study2P1.html');
    next();
});

module.exports = router;
