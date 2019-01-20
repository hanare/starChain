var express = require('express');
var router = express.Router();

// const Client = require('bitcoin-core');
// const client = new Client({ 
//     network: 'regtest',
//     password: 'prince',
//     username: 'prince'
//  });

 


/* GET users listing. */
router.post('/', function (req, res, next) {

    let test =  req.app.locals.test;
    let mempool =  req.app.locals.mempool;

    let walletAddress = req.body.address;
    console.log("address ",walletAddress);
    let requestObject;
    if(!mempool.requestExist(walletAddress)){
        requestObject= mempool.setRequest(walletAddress)
    }
    else{
        requestObject = mempool.requestObjectReturn(walletAddress);
    }
    res.send(requestObject);

    //res.send('respond with a resource');
});

module.exports = router;
// function(req,res){
//     var test =  req.app.locals.test;
// };


//2N1P8tQZC3kaJECQcmDG9eKL2dRuUhvtj4R
//mv4rnyY3Su5gjcDNzbMLKBQkBicCtHUtFB send them back
//https://coinfaucet.eu/en/btc-testnet/
//2MzqmQdubDuzFu3SZ77vCucpBhfTJXrzh1y
//DEBUG=starChain:* npm start




   //console.log("client ",client);
    //client.getInfo().then(([body, headers]) => console.log("body and header",body, headers));
    //console.log("get balance ",)
    // client.getBalance(address,0).then(data=>{
    //     console.log("balance",data);
    // })
    // client.command('getwalletinfo').then (data => { res.send(JSON.stringify(data)); })

    //client.command('getaddressinfo',address).then (data => { res.send(JSON.stringify(data)); })