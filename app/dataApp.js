var http = require("http");
var mysql = require("mysql");
var fs = require("fs");
var express = require("express");
var bodyParser = require("body-parser");

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



app.post('/api/:page',function(req,res){
    console.log(`${req.method} request for ${req.url}`);
    console.log(req.body);
    console.log(req.connection.remoteAddress);
    if(req.params.page == "study1P1"){
      userEmail = req.body.email;
      try{
        con.query(`INSERT INTO decision_making (user_id) VALUE ('${req.body.email}');`, function(err){
          if(err)  {res.status(400).send("error");console.log("happened");throw err;}
          res.statusCode = 201;
        });
      }catch(err){
        res.status(400);
      }

      //res.redirect('/study1P1.html');
    }
    if(req.params.page == "study1P2"){

      if(Array.isArray(req.body.characteristic) ){
        req.body.characteristic.forEach(function(characteristic){
            console.log(characteristic);
            con.query(`UPDATE decision_making SET study1_${characteristic} = 1 WHERE user_id = ${userEmail} ;`, function(err){
                if (err) throw err;
            });
        });
      }else{
        con.query(`UPDATE decision_making SET study1_${req.body.characteristic} = 1 WHERE user_id = ${userEmail} ;`, function(err){
            if (err) throw err;
        });
      }

      res.redirect('/study2P1.html');
    }
    if(req.params.page == "study2P1"){
      res.redirect('/study3P1.html');
    }
    if(req.params.page == "study3P1"){
      res.redirect('/study3P2.html');
    }
    if(req.params.page == "study3P2"){
      res.redirect('/study3P3.html');
    }
    if(req.params.page == "study3P3"){
      res.redirect('/thankYouPage.html');
    }
    if(req.params.page == "times"){
      res.status(200);
    }
});
