var express = require("express");
var router = express.Router();

router.post("/", function(req,res,next){
  var con = req.app.get("connection");
  let user_id = req.surveySession.user_id;
  if(user_id){
    let body = req.body;
    console.log(typeof body);
    console.log(Array.isArray(body));
    for (var key in body) {
        if (Object.prototype.hasOwnProperty.call(body,key)) {
            console.log(`UPDATE decision_making SET study2_${key} = ${body[key]} WHERE user_id = '${user_id}' ;`);
            con.query(`UPDATE decision_making SET study2_${key} = '${body[key]}' WHERE user_id = '${user_id}' ;`);
        }
    }
    res.redirect('/study3P1.html');
  }else{
    res.redirect('/');
  }

});

module.exports = router;
