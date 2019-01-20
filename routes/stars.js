var express = require('express');
var router = express.Router();
var BlockChain = require('../helper/BlockChain');
var chain = new BlockChain.Blockchain();

router.get('/hash:hash', function (req, res, next) {
  let starHash = req.params.hash;

  chain.getBlockByHash(starHash).then(block => {
    let storyDecoded = new Buffer(block.body.story, 'hex').toString();
    block.body.storyDecoded = storyDecoded;
    res.send(block);
  }).catch(err => {
    res.send(JSON.stringify({ error: "Error while searching the block" }));
  });
});
router.get('/address:address', function (req, res, next) {
  let address = req.params.address;
  chain.getBlockByAddress(starHash).then(blocks => {
    await blocks.forEach((block, index, arr) => {
      let storyDecoded = new Buffer(block.body.story, 'hex').toString();
      block.body.storyDecoded = storyDecoded;
      arr[index] = block;
    });

    res.send(blocks);
  }).catch(err => {
    res.send(JSON.stringify({ error: "Error while searching the block" }));
  });
  res.send(address);
});
module.exports = router;
