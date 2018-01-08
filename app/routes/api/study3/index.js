var express = require("express");
var router = express.Router();


router.use("/p1times", require("./p1times") );
router.use("/p1choice", require("./p1choice") );
router.use("/p2", require("./p2") );
router.use("/p3", require("./p3") );

module.exports = router;
