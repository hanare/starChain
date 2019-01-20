var express = require('express');
var router = express.Router();
var Block = require('../helper/Block');

var BlockChain = require('../helper/BlockChain');
var chain = new BlockChain.Blockchain();


router.get('/:height', function (req, res, next) {
    let height = req.params.height;

    // chain.getBlockHeight(height).then(block =>{
    //     res.send(block);
    // }).catch(err=>{
    //     res.send(JSON.stringify({error:"Block not found "}))
    // });  
    res.send(height)
});
router.post('/', function (req, res, next) {
    let mempool = req.app.locals.mempool;
    console.log("BODY---------------",req);
    let reqBody = req.body;

    console.log("Body ", reqBody);
    if (!(mempool.isRegisterStar(reqBody.address))) {
        res.send(JSON.stringify({ error: "Block is not validated " }));
    }

    // const encoded = new Buffer(myString).toString('hex'); // encoded === 54686973206973206d7920737472696e6720746f20626520656e636f6465642f6465636f646564
    // const decoded = new Buffer(encoded, 'hex').toString();
    console.log("STORY==========",reqBody.star.story)
    let encodeStory = new Buffer(reqBody.star.story).toString('hex');
    reqBody.star.story = encodeStory;
    let block = new Block.Block(reqBody);
    console.log("BLOCK ", block);
    chain.addBlock(block).then(block => {
        res.send(block);
    }).catch(err => {
        res.send(JSON.stringify({ error: "Sorry could not add block to the chain" }));
    });
})

module.exports = router;
