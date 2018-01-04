var express = require("express");
var router = express.Router();

//first check if the page is the login page
router.post("/login",function(req,res){
  console.log(`${req.method} request for ${req.url}`);
  console.log(req.header);
  console.log(req.body);
  var con = req.app.get('connection');
  //check if the user email already exists in the data base
  //meaning the user has already begun the survey
  con.query(`SELECT user_id FROM decision_making WHERE user_id = '${req.body.email}' ;`, function(err,result,fields){
      if(err){throw err;}
      console.log(JSON.stringify(result));
      console.log(result.length);

      if(result.length == 0){//if user has not begun survey insert email as user_id
        con.query(`INSERT INTO decision_making (user_id) VALUE ('${req.body.email}');`, function(err){
          if(err) {throw err;}
          req.surveySession.user_id = req.body.email;
          res.redirect('/study1P1.html');
        });
      }else{//let user take the survey
        res.sendStatus(400);
      }

  });
});

// for any other page beside for login page, check to see if session is running and user_id is available
router.use("*",  require("./validateUserSession") );

router.use("/study1",require("./study1"));
router.use("/study2",require("./study2"));
router.use("/study3",function(req,res,next){
  console.log("test1");
  next();
},require("./study3"));


module.exports = router;
