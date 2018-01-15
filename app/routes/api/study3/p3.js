var express = require("express");
var router = express.Router();

router.post("/", function(req,res,next){

      var con = req.app.get('connection');
      let user_id = req.surveySession.user_id;
      console.log(req.body);

      var user_age = req.body.age;
      var user_gender = req.body.gender;

      con.query( `UPDATE decision_making SET study3P3_userAge = ${user_age} WHERE user_id = '${user_id}';`);
      con.query( `UPDATE decision_making SET study3P3_userGender = '${user_gender}' WHERE user_id = '${user_id}';`);

      con.query(`UPDATE decision_making SET study_progress = 3 WHERE user_id = '${user_id}' ;`);
    res.redirect("/thankYouPage.html");

} );

module.exports = router;
