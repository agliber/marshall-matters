var express = require("express");
var router = express.Router();
var emailExistence = require("email-existence");



//on input email check if email exists
router.post("/email-exists",function(req,res,next){
    console.log(req.body);
    emailExistence.check(req.body.email, function(err,result){

        res.send(result);
    });

});
//first check if the page is the login page
router.post("/login",function(req,res){
  console.log(`${req.method} request for ${req.url}`);
  console.log(req.header);
  console.log(req.body);
  var con = req.app.get('connection');
  //check if the user email already exists in the data base
  //meaning the user has already begun the survey
  var user_id = req.body.email || req.body.mturk_id; // user id must be unique and is either email or mturk id

  con.query(`SELECT user_id FROM decision_making WHERE user_id = '${user_id}' ;`, function(err,result,fields){
      if(err){throw err;}

      if(result.length == 0){//if user has not begun survey insert email as user_id
        con.query(`INSERT INTO decision_making (user_id) VALUE ('${user_id}');`);
        //create random mturk verification code
        // 6 char string of capital letters and numbers

        mTurkCode = codeGen(6);
        con.query(`UPDATE decision_making SET mTurk_code = '${mTurkCode}' WHERE user_id = '${user_id}';`);
        console.log(mTurkCode );
      }
      req.surveySession.user_id = user_id;
      res.redirect('/study1P1.html');

  });
});

// for any other page beside for login page, check to see if session is running and user_id is available
//router.use("*",  require("./validateUserSession") );

router.use("/study1",require("./study1"));
router.use("/study2",require("./study2"));
router.use("/study3",require("./study3"));
router.use("/thankYou",require("./thankYou"));

module.exports = router;

//------------Code Generator ----------------------
function codeGen(length){
  var code = "";
  for(var i = 0; i < length; i++){
    var r = Math.floor(Math.random() * 35);
    var c = (r).toString(36).toUpperCase();
    code += c;
  }
  return code;
}
