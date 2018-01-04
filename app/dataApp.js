var http = require("http");
var mysql = require("mysql");
var fs = require("fs");
var express = require("express");
var bodyParser = require("body-parser");
var sessions = require("client-sessions");

var app = express();

var server = app.listen(3000,function(err){
  if(err){throw err;}
  console.log("server listening on port: 3000" );
});


app.use(express.static("../") );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

var con = mysql.createConnection({
  host : "localhost",
  user : "root",
  password : "***REMOVED***",
  database : "interview_factors"
});

con.connect(function(err){
  if(err) throw err;
  console.log("connected to mysql dbms");
});

app.use(sessions({
  cookieName : "surveySession",
  secret : "***REMOVED***",
  duration: 1 * 60 * 1000,
  activeDuration: 1 * 60 * 1000
}));


app.post('/api/:page',function(req,res){
    console.log(`${req.method} request for ${req.url}`);
    console.log(req.header);
    console.log(req.body);
    if(req.params.page == "study1P1"){
          con.query(`SELECT user_id FROM decision_making WHERE user_id = '${req.body.email}' ;`, function(err,result,fields){
              if(err){throw err;}
              console.log(JSON.stringify(result));
              console.log(result.length);

            if(result.length == 0){
              con.query(`INSERT INTO decision_making (user_id) VALUE ('${req.body.email}');`, function(err){
                if(err) {throw err;}
                req.surveySession.user_id = req.body.email;
                res.redirect('/study1P1.html');
              });
            }else{
              res.sendStatus(400);
            }

          });

    }else {
        let user_id = req.surveySession.user_id;
        console.log(user_id);
        if(!user_id){
          res.redirect('/');
        }else{
            if(req.params.page == "study1P2"){


                  if(user_id){
                    //update all characteristics to 0 (false)
                    if(Array.isArray(req.body.characteristic) ){
                      req.body.characteristic.forEach(function(characteristic){
                          console.log(characteristic);
                          con.query(`UPDATE decision_making SET study1_${characteristic} = 1 WHERE user_id = '${user_id}' ;`);

                      });
                    }else{
                      con.query(`UPDATE decision_making SET study1_${req.body.characteristic} = 1 WHERE user_id = '${user_id}' ;`);
                    }
                    res.redirect('/study2P1.html');
                  }else{

                  }



            }else if(req.params.page == "study2P1"){
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

                  }else{
                    res.redirect('/');
                  }
                  res.redirect('/study3P1.html');
            }else if(req.params.page == "study3P1"){
              let user_id = req.surveySession.user_id;
              if(user_id){

              }
              res.redirect('/study3P2.html');
            }else if(req.params.page == "study3P2"){
              let user_id = req.surveySession.user_id;
              if(user_id){

              }
              res.redirect('/study3P3.html');
            }else if(req.params.page == "study3P3"){
              let user_id = req.surveySession.user_id;
              if(user_id){

              }
              res.redirect('/thankYouPage.html');
            }else if(req.params.page == "times"){
              let user_id = req.surveySession.user_id;
              if(user_id){

              }
              res.status(200);
            }
        }
      }


});
