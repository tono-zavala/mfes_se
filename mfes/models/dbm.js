
// ocupamos un driver mongodb
let MongoClient = require('mongodb').MongoClient;
let db= null;

module.exports = class MongoDBModel {
    static async getDb(){
        if(!db){
            try{
                let conexion = await MongoClient.connect(process.env.MONGOURI,{});
                db = conexion.db(process.env.MONGODB);
                return db;
            }
            catch(ex){
                console.log(ex);
                throw(ex)
                //process.exit(1);
            }
        }
        else{
            return db;
        }
    }
    
};