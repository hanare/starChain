let BlockChain = require('./BlockChain');
let chain = new BlockChain.Blockchain();
chain.getBlockByHash("1e9a5561bc31b40c006f047d86ce74bf25ec2b352bc223c185d2a7abb122797f").then(block => {
    //console.log("block found ",block.body);
    //let b =  JSON.parse(block);
   // console.log("parsed object",b);
    let storyDecoded = new Buffer(block.body.star.story, 'hex').toString();
    block.body.star.storyDecoded = storyDecoded;
    //console.log("BLOCK FOUND ", block);
    //res.send(block);
  }).catch(err => {
      console.log("Error",err);
   
  });

 