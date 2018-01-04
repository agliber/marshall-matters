var express = require("express");
var router = express.Router();
var Cookies = require("js-cookie");


router.post("/p1_times", function(req,res,next){

    console.log(req.body);
    console.log(Cookies.get('times') );
    res.status(200);
} );


module.exports = router;
