var express = require("express");
var router = express.Router();

router.post("/", function(req,res,next){

      var con = req.app.get('connection');
      let user_id = req.surveySession.user_id;

      var yesDownside = req.body.downside[0] ;
      var downsides = req.body.downside[1];
      var yesUpside = req.body.upside[0];
      var upsides = req.body.upside[1] ;


      con.query( `UPDATE decision_making SET study3P2_yesDownside = ${yesDownside} WHERE user_id = '${user_id}';`);
      con.query( `UPDATE decision_making SET study3P2_downsides = '${downsides}' WHERE user_id = '${user_id}';`);
      con.query( `UPDATE decision_making SET study3P2_yesUpside = ${yesUpside} WHERE user_id = '${user_id}';`);
      con.query( `UPDATE decision_making SET study3P2_upsides = '${upsides}' WHERE user_id = '${user_id}';`);

      res.redirect("/study3P3.html");
    
} );


module.exports = router;
