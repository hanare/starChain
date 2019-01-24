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


///dbe0df8baa2ffaae98b7489dfe69440663c50825246545d8f68bb135c068bc08
/// 058d151f2613193c25eed362797290e4d2a8f9dd52258e594f65cd45ba8cf4ce


///5c8da8199189c675f5a1c82db2f4c9ca4090d0444cd63569f354734c3471561a
/// c487139ac015e1743e669a9c0fef34259b18c7bc7deeb384fd0d60413f0f59e4