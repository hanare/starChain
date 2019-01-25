var express = require('express');
var router = express.Router();

const bitcoinMessage = require('bitcoinjs-message');

/* GET home page. */
router.post('/validate', async function (req, res, next) {
    let address = req.body.address;
    let signature = req.body.signature;
    let mempool = req.app.locals.mempool;
    let isValid = false;
    
    if (mempool.requestExist(address)) {
        //console.log("TRUEEE_---------------------------------");
        let request = mempool.requestObjectReturn(address);
        let message = request.message;
        //console.log("address ", address, " message ", message, "  signature ", signature);
        try {
            //console.log("in try");
            isValid = await bitcoinMessage.verify(message, address, signature);
            //console.log("after verify");
            //console.log("isValid ", isValid);
            if (isValid) {

                //console.log("request ", request);
                let status = {};
                status.address = request.walletAddress;
                status.requestTimeStamp = request.requestTimeStamp;
                status.message = request.message;
                status.validationWindow = request.validationWindow;
                status.messageSignature = true;
                let validTx = { registerStar: true, status: status };
                mempool.addValidTranscation(validTx, address);
                res.send(validTx);
            }
            else{
                res.send(JSON.stringify({error:"Invalid request data"}));
            }
        } catch (err) {
            res.send(JSON.stringify({ error: "Something is wrong with your data" }));
        }
    }
    else {

        res.send(JSON.stringify({ error: "Sorry Request has either expired or doesn't exist" }))
    }




});

module.exports = router;


 