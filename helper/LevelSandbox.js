/* ===== Persist data with LevelDB ==================
|  Learn more: level: https://github.com/Level/level |
/===================================================*/

const level = require('level');
const chainDB = './chaindata';
class LevelSandbox {

    constructor() {
        this.db = level(chainDB);
    }

    // Get data from levelDB with key (Promise)
    getLevelDBData(key) {
        let self = this;
        return new Promise(function (resolve, reject) {
            // Add your code here, remember in Promises you need to resolve() or reject()
            self.db.get(key, function (err, value) {
                if (value)
                    resolve(value);
                else
                    reject(err);
            })
        });
    }

    // Add data to levelDB with key and value (Promise)
    addLevelDBData(key, value) {
        let self = this;
        let _key = key;
        let _value = value;
        //console.log("key ",key," value ",value);
        return new Promise(function (resolve, reject) {
            // Add your code here, remember in Promises you need to resolve() or reject() 
            self.db.put(_key, _value,function(err){
                if(!err)
                resolve(_value);
                else
                reject("Error!! Could not add block ",err);
            });
           
        });
        
        //return self.db.put(_key, _value);
        
    }

    // Method that return the height
    getBlocksCount() {
        let self = this;
        //console.log("LEVELSANDBOX  getBlocksCount");
        return new Promise(function (resolve, reject) {
            // Add your code here, remember in Promises you need to resolve() or reject()
            let count = 0;

            self.db.createReadStream().on('data', function (data) {
                count++;
            }).on('error', function (err) {
                console.log('Oh my!', err)
                reject("Error");
            }).on('close', function () {
                console.log('Stream closed')
            }).on('end', function () {
                if (count >= 0)
                    resolve(count);
                console.log('Stream ended')
            })

        });
    }
}

module.exports.LevelSandbox = LevelSandbox;
