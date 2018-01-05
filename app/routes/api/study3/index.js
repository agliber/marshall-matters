var express = require("express");
var router = express.Router();


router.use("/p1", require("./p1") );
router.use("/p2", require("./p2") );
router.use("/p3", require("./p3") );

module.exports = router;
