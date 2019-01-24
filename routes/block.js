var express = require('express');
var router = express.Router();
var Block = require('../helper/Block');

//var BlockChain = require('../helper/BlockChain');


router.get('/:height', function (req, res, next) {
    let height = req.params.height;
    let chain = req.app.locals.bchain;
    chain.getBlock(height).then(block => {
        //console.log("Blck ", block);
        res.send(block);
    }).catch(err => {
        //console.log(err);
        res.send(JSON.stringify({ error: "Block not found " }))
    });
    //res.send(height)
});
router.post('/', function (req, res, next) {
    let mempool = req.app.locals.mempool;
    //console.log("BODY---------------", req);
    let reqBody = req.body;
    let chain = req.app.locals.bchain;

    //console.log("Body ", reqBody);
    if (!(mempool.isRegisterStar(reqBody.address))) {
        res.send(JSON.stringify({ error: "Block is not validated " }));
    }

    // const encoded = new Buffer(myString).toString('hex'); // 
    // const decoded = new Buffer(encoded, 'hex').toString();
    //console.log("STORY==========", reqBody.star.story)
    let encodeStory = new Buffer(reqBody.star.story).toString('hex');
    reqBody.star.story = encodeStory;
    let block = new Block.Block(reqBody);
    //console.log("BLOCK ", block);
    chain.addBlock(block).then(block => {
        mempool.invalidateTranscation(reqBody.address);
        res.send(block);
    }).catch(err => {
        res.send(JSON.stringify({ error: "Sorry could not add block to the chain" }));
    });
})

module.exports = router;
