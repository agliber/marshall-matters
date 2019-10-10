var http = require("http");
var mysql = require("mysql");
var sessions = require("client-sessions");
var bodyParser = require("body-parser");
var express = require("express");
var helmet = require("helmet");
require('dotenv').config();

var app = express();

var port = process.env.PORT;
var server = app.listen(port,function(err){
  if(err){throw err;}
  console.log(`server listening on port: ${port}`);
});

app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({extended:false}));

console.log(process.env.SESSION_SECRET);
app.use(sessions({
  cookieName : "surveySession",
  secret : process.env.SESSION_SECRET,
  duration: 30 * 60 * 1000,
  activeDuration: 10 * 60 * 1000
}));

app.use(helmet.noCache() );
app.use("*",require("./validateUserSession") );
app.use( express.static("../") );


var con = mysql.createConnection({
  host : process.env.DB_HOST,
  user : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : "interview_factors"
});

app.set("connection",con);

con.connect(function(err){
  if(err) throw err;
  console.log("connected to mysql dbms");
});

//app.use("*",require())
app.use("/api", require("./routes/api") );
