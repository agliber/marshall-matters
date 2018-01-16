var express = require("express");
var router = express.Router();

router.all("/", function(req,res,next){
  // check if use has taken survey already

  if(req.baseUrl.endsWith('.html') && !req.baseUrl.endsWith('sessionTimeout.html') ){
    var con = req.app.get('connection');
    let user_id = req.surveySession.user_id;

    if(!user_id){
      console.log("user session expired");
      res.redirect('/sessionTimeout.html');
    }else{//user id does exist
      con.query(`SELECT study_progress FROM decision_making WHERE user_id = '${user_id}' ;`,function(err,result,fields){
        if(err) throw err;
        var studyProgress = JSON.parse(JSON.stringify(result[0]) ).study_progress;

        if(req.originalUrl.startsWith("/study3") && studyProgress == 2 ){
          con.query(`SELECT study3P1_0,candidate_choice,study3P2_yesDownside,study3P3_userAge FROM decision_making WHERE user_id = '${user_id}' ;`,function(err,result,fields){

            if(result[0].study3P1_0 == null ){
                if(!req.originalUrl.startsWith("/study3P1times") ) res.redirect('/study3P1times.html');
            }else if(result[0].candidate_choice == null   ){
                if(!req.originalUrl.startsWith("/study3P1choice") )res.redirect('/study3P1choice.html');
            }else if(result[0].study3P2_yesDownside == null ){
                if(!req.originalUrl.startsWith("/study3P2") ) res.redirect('/study3P2.html');
            }else if(result[0].study3P3_userAge == null ){
                if(!req.originalUrl.startsWith("/study3P3") ) res.redirect('/study3P3.html');
            }
          });

        }
        if(req.originalUrl.startsWith("/study") && studyProgress != (req.originalUrl[6] - 1) ){
            if( studyProgress == 0){
                res.redirect('/study1P1.html');
            }else if( studyProgress == 1){
                res.redirect('/study2P1.html');
            }else if( studyProgress == 2){
                res.redirect('/study3P1times.html');
            }else if(studyProgress == 3){
                res.redirect('/thankYouPage.html');
            }
        }
      });
      next();
    }
  }else{
    next();
  }



});

module.exports = router;
