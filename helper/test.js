let BlockChain = require('./BlockChain');
let chain = new BlockChain.Blockchain();
chain.getBlockByHash("1e9a5561bc31b40c006f047d86ce74bf25ec2b352bc223c185d2a7abb122797f").then(block => {
    console.log("block found ",block.body);
    //let b =  JSON.parse(block);
   // console.log("parsed object",b);
    let storyDecoded = new Buffer(block.body.star.story, 'hex').toString();
    block.body.star.storyDecoded = storyDecoded;
    console.log("BLOCK FOUND ", block);
    //res.send(block);
  }).catch(err => {
      console.log("Error",err);
    //res.send(JSON.stringify({ error: "Error while searching the block" }));
  });


  ///3acb59ee42b7d975a88e02339aa7cd4228598ea37ce227387575dbf4e4935d4a

  ///1e9a5561bc31b40c006f047d86ce74bf25ec2b352bc223c185d2a7abb122797f