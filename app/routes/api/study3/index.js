var express = require("express");
var router = express.Router();

router.use("/p1_candidate",function(req,res,next){
  console.log("test2");
  next();
}, require("./p1_candidate") );
router.use("/p1_times", require("./p1_times") );
router.use("/p2", require("./p2") );
router.use("/p3", require("./p3") );

module.exports = router;
