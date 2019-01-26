var express = require('express');
var router = express.Router();
//var BlockChain = require('../helper/BlockChain');

 

router.get('/hash::hash', function (req, res, next) {
  let starHash = req.params.hash;
  //console.log("star hash ", starHash);
  let chain =  req.app.locals.bchain;
  chain.getBlockByHash(starHash).then(block => {
    let storyDecoded = new Buffer(block.body.star.story, 'hex').toString();
    block.body.star.storyDecoded = storyDecoded;
    //console.log("BLOCK FOUND ", block);
    res.send(block);
  }).catch(err => {
    res.send({ error: "Error while searching the block" });
  });
});
router.get('/address::address', function (req, res, next) {
  let address = req.params.address;
  let chain =  req.app.locals.bchain;
  chain.getBlockByAddress(address).then(blocks => {
   // console.log("Blocks ",blocks);
    blocks.forEach((block, index, arr) => {
    //  console.log(block);
      let storyDecoded = new Buffer(block.body.star.story, 'hex').toString();
      block.body.star.storyDecoded = storyDecoded;
      arr[index] = block;
    });
   // console.log("BLOCKS ", blocks)
    res.send(blocks);
  }).catch(err => {
   // console.log("errr",err);
    res.send({ error: "Error while searching the block" });
  });
  //res.send(address);
});
module.exports = router;
