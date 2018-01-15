var http = require("http");
var mysql = require("mysql");
var sessions = require("client-sessions");
var bodyParser = require("body-parser");
var express = require("express");
var helmet = require("helmet");

var app = express();
//80,'104.236.240.117'
var server = app.listen(80,'104.236.240.117',function(err){
  if(err){throw err;}
  console.log("server listening on port: 80" );
});

app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({extended:false}));

app.use(sessions({
  cookieName : "surveySession",
  secret : "***REMOVED***",
  duration: 30 * 60 * 1000,
  activeDuration: 10 * 60 * 1000
}));

app.use(helmet.noCache() );
app.use("*",require("./validateUserSession") );
app.use( express.static("../") );


var con = mysql.createConnection({
  host : "localhost",
  user : "root",
  password : "***REMOVED***",
  database : "interview_factors"
});

app.set("connection",con);

con.connect(function(err){
  if(err) throw err;
  console.log("connected to mysql dbms");
});

//app.use("*",require())
app.use("/api", require("./routes/api") );
