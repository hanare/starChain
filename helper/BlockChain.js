/* ===== Blockchain Class ==========================
|  Class with a constructor for new blockchain 		|
|  ================================================*/

const SHA256 = require('crypto-js/sha256');
const LevelSandbox = require('./LevelSandbox.js');
const Block = require('./Block.js');

class Blockchain {

    constructor() {
        this.bd = new LevelSandbox.LevelSandbox();
        this.generateGenesisBlock();
    }

    // Helper method to create a Genesis Block (always with height= 0)
    // You have to options, because the method will always execute when you create your blockchain
    // you will need to set this up statically or instead you can verify if the height !== 0 then you
    // will not create the genesis block
    generateGenesisBlock() {
        // Add your code here
        let self = this;
        this.getBlockHeight().then(height => {
            //console.log("height ----------",height);
            if (height < 0) {
                let firstBlock = new Block.Block("This the genesis Block");
                self.addBlock(firstBlock).then(data => { console.log("First Block Added "); });
            }
        });

    }


    // Get block height, it is a helper method that return the height of the blockchain
    getBlockHeight() {
        // Add your code here
        let self = this;
        return new Promise((resolve) => {
            self.bd.getBlocksCount().then(c => {
                //console.log("height =====",c);
                resolve(c - 1)

            })
        });
    }

    // Add new block
    addBlock(newBlock) {
        // Add your code here
        let block = newBlock;
        let self = this;
        return new Promise((resolve, reject) => {
            self.getBlockHeight().then(height => {
                block.height = height + 1;
                block.time = new Date().getTime().toString().slice(0, -3);
                if (block.height > 0) {
                    block.previousBlockHash = self.getBlock(height).then(_block => {
                        return _block.hash
                    }).then(hash => {
                        block.previousBlockHash = hash;
                        block.hash = SHA256(JSON.stringify(block)).toString();
                        self.bd.addLevelDBData(block.height, JSON.stringify(block).toString()).then(data => {
                            resolve(data);
                        }).catch(err => {
                            reject(err);
                        });
                    });
                } else {
                    block.hash = SHA256(JSON.stringify(block)).toString();
                    self.bd.addLevelDBData(block.height, JSON.stringify(block).toString()).then(data => {
                        resolve(data);
                    }).catch(err => {
                        reject(err);
                    });
                }
            });
        });
    }

    // Get Block By Height
    getBlock(height) {
        // Add your code here
        //console.log("block ",height);
        let self = this;
        return new Promise((resolve, reject) => {
            self.bd.getLevelDBData(height).then(block => {
                if (block)
                    resolve(JSON.parse(block));
            }).catch(err => {
                reject(err);
            })
        });
    }

    // Validate if Block is being tampered by Block Height
    async validateBlock(height) {
        // Add your code here
        let self = this;

        let currentBlock = await self.getBlock(height).then(block => { return block });
        let currentBlockHash = currentBlock.hash;
        currentBlock.hash = "";
        let calculatedHash = SHA256(JSON.stringify(currentBlock)).toString();
        if (calculatedHash == currentBlockHash)
            return Promise.resolve(true)
        else {
            // console.log("not valid block ");
            return Promise.resolve(false)
        }
    }

    // Validate Blockchain
    async validateChain() {
        let self = this;
        // let p = Promise.resolve();
        // console.log("before  ");
        let h = await self.getBlockHeight().then(h => { return h; });
        let promises = [];
        // console.log("after height ", h);
        let block0 = await self.getBlock(0).then(b => { return b });
        let valid0 = await self.validateBlock(0).then(r => { return r; });
        // console.log("valid ", valid, " at i ", i)
        if (!valid0)
            promises.push(Promise.resolve(0));
        // console.log("BLOCK 0 ", block0);
        for (let i = 1; i <= h; i++) {
            let valid = await self.validateBlock(i).then(r => { return r; });
            // console.log("valid ", valid, " at i ", i)
            if (!valid)
                promises.push(Promise.resolve(i));

            let block = await self.getBlock(i).then(b => { return b });
            // console.log("  block ", i, " ", block);
            if (block0.hash !== block.previousBlockHash) promises.push(Promise.resolve(i));
            block0 = block;
            // console.log("block at " + (i) + " " + block);

        }

        // console.log("List of promises ", promises);
        return Promise.all(promises);

    }

    async getBlockByHash(hash) {
        //console.log("HASH ",hash);
        let self=  this;
        let h = await self.getBlockHeight().then(h => { console.log("Error");return h; }).catch(err=>{
            console.log(err);
            return Promise.resolve(false);
        });
        //console.log("HEIGHT ",h);
        let block = {
            previousBlockHash: "true"
        };
        let found = false;
        for (let i = h; i >= 0 && block.previousBlockHash != undefined && !found; i--) {
            block = await self.getBlock(i).then(b => { return b });
            //console.log("BLOCK ",block.hash);
            if (block.hash == hash) {
                found = true;
                return Promise.resolve(block);
            }

        }
        //console.log("end ");
        return Promise.resolve(false);
    }

    async getBlockByAddress(address) {
        //console.log("Address ",address);
        let self=  this;
        let blocks = [];
        let h = await self.getBlockHeight().then(h => { return h; });
        let block ={};
        for (let i = h; i >= 0; i--) {
            block = await self.getBlock(i).then(b => { return b });
            
            if (block.body.address == address) {
                blocks.push(block);
            }
        }
        return Promise.resolve(blocks);

    }
}

module.exports.Blockchain = Blockchain;
