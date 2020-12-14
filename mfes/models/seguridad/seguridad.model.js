var MongoDB = require('../dbm');
var ObjectID = require("mongodb").ObjectID;
var bcrypt = require('bcryptjs');

class SeguridadModel {
    constructor() {
      this.collection = null;
        MongoDB.getDb().then(async (db)=>{
          this.collection =  await db.collection('usuarios');
          if (process.env.ENSURE_INDEX == "1") {
            await this.collection.createIndex({ "email": 1 }, { unique: true });
          }
        }
      ).catch((ex)=>{
          throw(ex);
        }
      )
    }
    async addUsuario( data ) {
      const {email, password, direccion, nombre} = data;
      try {
        let nuevo = {
          "direccion":direccion,
          "nombre": nombre,
          "email": email,
          "password": bcrypt.hashSync(password, 10),
          "lastlogin": 0,
          "lastpwdchg": 0,
          "pwdexp": new Date().getTime() + (1000*60*60*24*365), /* mils, s , m, h, d */
          "oldpwd":[],
          "roles":["public"]
        }
        let rslt = await this.collection.insertOne(nuevo);
        return rslt;
      } catch(ex){
        throw(ex);
      }
    }
  
    async getUserByEmail(email){
      try{
        const filter = {"email":email};
        let User = await this.collection.findOne(filter);
        return User;
      }catch(ex){
        throw(ex);
      }
    }
    async comparePassword(rawPswd, crptoPswd){
      try{
        //return bcrypt.compareSync(rawPswd, crptoPswd);
        return await bcrypt.compare(rawPswd, crptoPswd);
      }catch(ex){
        throw(ex);
      }
    }
  
  }
  
  module.exports = SeguridadModel;
  