var express = require("express");
var router = express.Router();

router.post("/", function(req,res,next){
    //update all characteristics to 0 (false)
    var con = req.app.get('connection');
    let user_id = req.surveySession.user_id;


    if(Array.isArray(req.body.characteristic) ){
      req.body.characteristic.forEach(function(characteristic){
          console.log(characteristic);
          con.query(`UPDATE decision_making SET study1_${characteristic} = 1 WHERE user_id = '${user_id}' ;`);

      });
    }else{
      console.log(req.body.characteristic);
      con.query(`UPDATE decision_making SET study1_${req.body.characteristic} = 1 WHERE user_id = '${user_id}' ;`);
    }

    res.redirect('/study2P1.html');
    next();
});

module.exports = router;
