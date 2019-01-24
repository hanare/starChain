var express = require('express');
var router = express.Router();
 
router.post('/', function (req, res, next) {

    //let test = req.app.locals.test;
    let mempool = req.app.locals.mempool;

    let walletAddress = req.body.address;
    //console.log("address ", walletAddress);
    let requestObject;
    if (!mempool.requestExist(walletAddress)) {
        requestObject = mempool.setRequest(walletAddress)
    }
    else {
        requestObject = mempool.requestObjectReturn(walletAddress);
    }
    res.send(requestObject);
});

module.exports = router;
