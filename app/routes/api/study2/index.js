//study 2

var express = require("express");
var router = express.Router();

router.post("/", function(req,res,next){
  var con = req.app.get("connection");
  let user_id = req.surveySession.user_id;
  let body = req.body;

    for (var key in body) {
        if (Object.prototype.hasOwnProperty.call(body,key)) {
            con.query(`UPDATE decision_making SET study2_${key} = '${body[key]}' WHERE user_id = '${user_id}' ;`);
        }
    }

    con.query(`UPDATE decision_making SET study_progress = 2 WHERE user_id = '${user_id}' ;`);
    res.redirect('/study3P1times.html');


});

module.exports = router;
