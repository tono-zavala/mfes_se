var MongoDB = require('../dbm');
var ObjectID = require('mongodb').ObjectID;


class ProductsModel{
    constructor(){
      this.collection = null
      MongoDB.getDb()
       .then (
         (db)=>{
           this.collection = db.collection("mfes_mdb");
         }
      )
       .catch((ex)=>{
        throw(ex);
      });
    }

    async getAll(){
      try {
        let rslts = await this.collection.find({}).toArray();
        return rslts;
      }catch(ex){
        throw(ex);
      }
    }

    async addOne( document ) {
      try{
        var result = await this.collection.insertOne(document);
        return result;
      }catch(ex){
        throw(ex);
      }
    }

    async getById(id){
        try{
            const _id = new ObjectID(id);
            let oneDoc = await this.collection.findOne({_id});
            return oneDoc;
        } 
        catch(ex){
            console.log(ex);
            throw(ex);
        }
    }
    async getByIdSubdocumentos(id){
        try{
            const _id = new ObjectID(id);
            let oneDoc = await this.collection.find({_id}).project({"_id":0,"colores":1}).toArray();
            return oneDoc;
        } 
        catch(ex){
            console.log(ex);
            throw(ex);
        }
    }

    async getBlusaById(id){
        try{
            const _id = new ObjectID(id);
            let oneDoc = await this.collection.find({"colores.ide":_id}).project({colores: { $elemMatch :{ide:_id}}}).toArray();
            return oneDoc;
        } 
        catch(ex){
            console.log(ex);
            throw(ex);
        }
    }

    async removeById(id){
        try{
            const _id = new ObjectID(id);
            let resultado = await this.collection.deleteOne({_id});
            return resultado;

        }
        catch(ex){
            console.log(ex);
            throw(ex);
        }
    }

    async updateById(id, nombre, descripcion, categoria, precio){
        try{
            const _id = new ObjectID(id);
            const updOps = {"$set": {nombre, descripcion, categoria, precio}};
            let updDoc = await this.collection.findOneAndUpdate({_id}, updOps,{returnOriginal: false});
            return updDoc;

        }
        catch(ex){
            console.log(ex);
            throw(ex);
        }
    }
    async updateBlusaById(id, color, talla_s, talla_m, talla_l, talla_xl, img, cod_color){
        try{
            talla_s = Number(talla_s);
            talla_m = Number(talla_m);
          talla_l = Number(talla_l);
        talla_xl = Number(talla_xl);
            const _id = new ObjectID(id);
            const updOps = {"$set": {"colores.$":{ide:_id, color, talla_s, talla_m, talla_l, talla_xl, img, cod_color}}};
            let updDoc = await this.collection.findOneAndUpdate({"colores.ide":_id}, updOps,{returnOriginal: false});
            return updDoc;

        }
        catch(ex){
            console.log(ex);
            throw(ex);
        }
    }
    async updateJeanById(id, color, talla_3, talla_5, talla_7, talla_9, talla_11, talla_13, talla_15, cod_color, img){
        try{
            talla_3 = Number(talla_3);
            talla_5 = Number(talla_5);
            talla_7 = Number(talla_7);
            talla_9 = Number(talla_9);
            talla_11 = Number(talla_11);
            talla_13 = Number(talla_13);
            talla_15 = Number(talla_15);
            // const _id = new ObjectID(id);
            const updOps = {"$set": {"colores.$":{ide:_id, color, talla_3, talla_5, talla_7, talla_9, talla_11, talla_13, talla_15, cod_color, img}}};
            let updDoc = await this.collection.findOneAndUpdate({"colores.ide":_id}, updOps,{returnOriginal: false});
            return updDoc;

        }
        catch(ex){
            console.log(ex);
            throw(ex);
        }
    }

    async updateSales(id, stock, sales) {
        try {
          const _id = new ObjectID(id);
          // UPDATE TABLE SET attr = val, attr = val where attr = val;
          const updOps = { "$inc": { "stock": (stock*-1), "sales": sales } };
          let updDoc = await this.collection.findOneAndUpdate({ _id }, updOps, { returnOriginal: false });
          return updDoc;
        } catch (ex) {
          throw (ex);
        }
      }

// los atributos deben ser un objeto JSON
    async getByAtributos(atributos){
        try{
            let docs = await this.collection.find(atributos).toArray();
            return docs;
        }
        catch(ex){
            consoloe.log(ex);
            throw(ex);

        }

    };

// Proyecciones (conjunto especifico de datos del conjunto global)
  // SELECT _id, sku, name, price from productos;
  // {"_id":1,"sku":1, "name":1, "price":1}
  async getByAttibutesProjected(attributes, projection) {
    try {
      let docs = await this.collection.find(attributes).project(projection).toArray();
      return docs;
    } catch (ex) {
      throw (ex);
    }
  }
  async addBlusas(id, color, talla_s=0, talla_m=0, talla_l=0, talla_xl=0, img, cod_color ){
    try {
    talla_s = Number(talla_s);
    talla_m = Number(talla_m);
    talla_l = Number(talla_l);
    talla_xl = Number(talla_xl);
    
      const UpdOps = {"$push": {colores:{ide:new ObjectID(), color, talla_s, talla_m, talla_l, talla_xl, img, cod_color}}};
      const _id = new ObjectID(id);
      let updDoc = await this.collection.findOneAndUpdate({ _id }, UpdOps, { returnOriginal: false});
      return updDoc;
    }catch(ex){
      throw(ex);
    }
  }
  async addJeans(id, color, talla_3=0, talla_5=0, talla_7=0, talla_9=0, talla_11=0, talla_13=0, talla_15=0, cod_color, img){
    try {
    talla_3 = Number(talla_3);
    talla_5 = Number(talla_5);
    talla_7 = Number(talla_7);
    talla_9 = Number(talla_9);
    talla_11 = Number(talla_11);
    talla_13 = Number(talla_13);
    talla_15 = Number(talla_15);
      const UpdOps = {"$push": {colores:{ide:new ObjectID(), color, talla_3, talla_5, talla_7, talla_9, talla_11, talla_13, talla_15, cod_color, img}}};
      const _id = new ObjectID(id);
      let updDoc = await this.collection.findOneAndUpdate({ _id }, UpdOps, { returnOriginal: false});
      return updDoc;
    }catch(ex){
      throw(ex);
    }
  }

  async addCategorySet(id, category) {
    try {
      let _category = category.toLowerCase();
      const UpdOps = { "$addToSet": { categories: _category } };
      const _id = new ObjectID(id);
      let updDoc = await this.collection.findOneAndUpdate({ _id }, UpdOps, { returnOriginal: false });
      return updDoc;
    } catch (ex) {
      throw (ex);
    }
  }

}
module.exports = ProductsModel;