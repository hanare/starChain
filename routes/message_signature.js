var express = require('express');
var router = express.Router();

const bitcoinMessage = require('bitcoinjs-message');

/* GET home page. */
router.post('/validate', function (req, res, next) {
    let address = req.body.address;
    let signature = req.body.signature;
    let mempool = req.app.locals.mempool;
    let isValid = false;

    mempool.setRequest(address);
    //   try{
    //     isValid=bitcoinMessage.verify(message, address, signature);
    //   }catch(err){
    //       res.send(JSON.stringify({error:"Something is wrong with your data"}));
    //   } 
    let request = mempool.requestObjectReturn(address);
    console.log("request ", request);
    let status = {};
    status.address = request.walletAddress;
    status.requestTimeStamp = request.requestTimeStamp;
    status.message = request.message;
    status.validationWindow = request.validationWindow;
    status.messageSignature = true;
    let validTx = { registerStar: true, status: status };
    mempool.addValidTranscation(validTx, address);
    res.send(JSON.stringify(validTx));

});

module.exports = router;


//H3o1a6UFM3n8BaErzNps8pAsIE7Fnw9Py1nBUMlAHHbYUZlzUBgYPi/ApfVe0Q1DNXkZY9sZ7EO+6nKx1JN3lYY=
//1Mu49quXA5uuBEu6JMJxqhrK5531oB4jeS:1:starRegistry
//1Mu49quXA5uuBEu6JMJxqhrK5531oB4jeS