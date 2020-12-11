// {{host}}/api/productos/
const express = require("express");
let router = express.Router();

// let productModel = require('../../models/productos.model')();

const ProductModelClass = require('../../models/productos/productos.model');
const mdbProductModel = new ProductModelClass();



router.get(
    '/all', async(req, res)=>{
        try{
            const resultado = await mdbProductModel.getAll();
            res.status(200).json(resultado);
        }
       catch(ex){
           console.log(ex);
           res.status(500).json("Algo paso");
       }
    }
);

//Ruta para obtener solo Jeans 
router.get(
  '/jeans', async (req, res)=>{
    try{
      const resultado = await mdbProductModel.getJeans();
      res.status(200).json(resultado);
  }
 catch(ex){
     console.log(ex);
     res.status(500).json("Algo paso");
 }
  }
)

//fin de la ruta de Jeans 

//ruta para obtener todas las Blusas 

router.get(
  '/blusas', async (req, res)=>{
    try{
      const resultado = await mdbProductModel.getBlusas();
      res.status(200).json(resultado);
  }
 catch(ex){
     console.log(ex);
     res.status(500).json("Algo paso");
 }
  }
)
//fin de la ruta de obtener Blusas 

router.get(
    '/one/:id', async (req, res)=>{
  
    try{
        let { id } = req.params;
        let oneDocument = await mdbProductModel.getById(id);
        res.status(200).json(oneDocument);
    }
    catch(ex){
        console.log(ex);
        res.status(500).json({"msg": "Algo salio mal"});
    }
});
router.get(
    '/blusa/one/:id', async (req, res)=>{
  
    try{
        let { id } = req.params;
        let oneDocument = await mdbProductModel.getBlusaById(id);
        res.status(200).json(oneDocument);
    }
    catch(ex){
        console.log(ex);
        res.status(500).json({"msg": "Algo salio mal"});
    }
});

router.get(
    '/sku/:skuid', async(req, res)=>{
        try{
            const {skuid} = req.params;
            let resultado = await mdbProductModel.getByAtributos({sku:skuid});
            res.status(200).json(resultado);
        }
        catch(ex){
            console.log(ex);
            res.status(500).json({"msg":"Algo salio mal"});
        }
    }
);

router.get(
    '/stock/:stock', async(req, res)=>{
        try{
            let {stock} = req.params;
            stock = Number(stock);
            let resultado = await mdbProductModel.getByAtributos({stock: {"$gte": stock}});
            res.status(200).json(resultado);
        }
        catch(ex){
            console.log(ex);
            res.status(500).json({"msg":"Algo salio mal"});
        }
    }
);

router.get('/top', (req, res)=>{
  productModel.getTopTen( (err, productos)=>{
    if (err) {
      console.log(err);
      return res.status(503).json({ "error": "Algo salio mal." });
    }
    return res.status(200).json(productos);
  }
  );
});

router.post('/new', async (req, res)=>{
  try{
    let { nombre, descripcion, categoria, precio} = req.body;
    precio = Number(precio);
    var rslt = await mdbProductModel.addOne({ nombre, descripcion, categoria, precio});
    res.status(200).json(rslt);
  }catch(ex){
    console.log(ex);
    res.status(500).json({ "msg": "Algo Paso Mal." });
  }
});

router.put(
    '/upd/:id', async(req, res)=>{
        try{
            let {id} = req.params;
            let {nombre, descripcion, categoria, precio} = req.body;
            precio = Number(precio);
            let resultado = await mdbProductModel.updateById(id, nombre, descripcion, categoria, precio);
            res.status(200).json(resultado);
        }
        catch(ex){
            console.log(ex);
            res.status(500).jsonI({"msg": "Algo salio mal"});
        }
    }
);
router.put(
    '/upd/blusa/:id', async(req, res)=>{
        try{
            let {id} = req.params;
            let {color, talla_s, talla_m, talla_l, talla_xl, img, cod_color} = req.body;
            let resultado = await mdbProductModel.updateBlusaById(id, color, talla_s, talla_m, talla_l, talla_xl, img, cod_color);
            res.status(200).json(resultado);
        }
        catch(ex){
            console.log(ex);
            res.status(500).jsonI({"msg": "Algo salio mal"});
        }
    }
);
router.put(
    '/upd/jean/:id', async(req, res)=>{
        try{
            let {id} = req.params;
            let {color, talla_3, talla_5, talla_7, talla_9, talla_11, talla_13, talla_15, cod_color, img} = req.body;
            let resultado = await mdbProductModel.updateJeanById(id, color, talla_3, talla_5, talla_7, talla_9, talla_11, talla_13, talla_15, cod_color, img);
            res.status(200).json(resultado);
        }
        catch(ex){
            console.log(ex);
            res.status(500).jsonI({"msg": "Algo salio mal"});
        }
    }
);

router.put('/sales/:id', async (req, res) => {
    try {
      let { id } = req.params;
      let { stock, sales } = req.body;
      sales = Number(sales);
      stock = Number(stock);
      let rslt = await mdbProductModel.updateSales(id, stock, sales);
      res.status(200).json(rslt);
    } catch (ex) {
      console.log(ex);
      res.status(500).json({ "msg": "Algo Paso Mal." });
    }
  });

  router.put('/blusas/add/:id', async (req, res) => {
    try {
      let { id } = req.params;
      //id = Number(id);
      let { color, talla_s, talla_m, talla_l, talla_xl, img, cod_color } = req.body;
      let rslt = await mdbProductModel.addBlusas(id, color, talla_s, talla_m, talla_l, talla_xl, img, cod_color );
      res.status(200).json(rslt);
    } catch (ex) {
      console.log(ex);
      res.status(500).json({ "msg": "Algo Paso Mal." });
    }
  });
  router.put('/jeans/add/:id', async (req, res) => {
    try {
      let { id } = req.params;
      //id = Number(id);
      let { color, talla_3, talla_5, talla_7, talla_9, talla_11, talla_13, talla_15, cod_color, img } = req.body;
      let rslt = await mdbProductModel.addJeans(id, color, talla_3, talla_5, talla_7, talla_9, talla_11, talla_13, talla_15, cod_color, img );
      res.status(200).json(rslt);
    } catch (ex) {
      console.log(ex);
      res.status(500).json({ "msg": "Algo Paso Mal." });
    }
  });
  
      
router.delete(
    '/del/:id', async (req, res)=>{
        try{
            let {id} = req.params;
            let resultado = await mdbProductModel.removeById(id);
            res.status(200).json(resultado)

        }
        catch(ex){
            console.log(ex);
            res.status(500).json({'msg':"Algo salio mal"});
        }

    }
);
router.put(
  '/upd/:id/:ide', async(req, res)=>{
    try{
      let {id, ide} = req.params;
      let resultado = await mdbProductModel.updSDoc(id, ide);
      res.status(200).json(resultado)

  }
  catch(ex){
      console.log(ex);
      res.status(500).json({'msg':"Algo salio mal"});
  }
  }
);


router.get('/rstock/:stock', async (req, res) => {
    try {
      let { stock } = req.params;
      stock = Number(stock);
      // $gte == greater than or equal | where stock >= 250
      // $lte == less than or equal  | where stock <= 250
      // $lt = less than  | where stock  < 250
      // $gt = greater than | where stock > 250
      // $ne = not equal to | where stock <> 250
  
      //timestamp // Cantidad de Segundos Transcurridos desde el EPOC
      //EPOC = 1970-01-01 00:00:00
      // Rango de Fechas | between tm1 and tm2 | fecha >= tm1 and fecha <= tm2
  
      let rsltset = await mdbProductModel.getByAttibutes({ stock: { "$lte": stock } });
      res.status(200).json(rsltset);
    } catch (ex) {
      console.log(ex);
      res.status(500).json({ "msg": "Algo Paso Mal." });
    }
  });// get sku/:skuid
  
  
  router.get('/stockrange/:stock1/:stock2', async (req, res) => {
    try {
      let { stock1, stock2 } = req.params;
      stock1 = Number(stock1);
      stock2 = Number(stock2);
      // Busqueda por rango || and 
      let rsltset = await mdbProductModel.getByAttibutes({ stock: { "$gte": stock1, "$lte": stock2 } });
      res.status(200).json(rsltset);
    } catch (ex) {
      console.log(ex);
      res.status(500).json({ "msg": "Algo Paso Mal." });
    }
  });// get sku/:skuid
  
  
  router.get('/categories/byname/:category', async (req, res) => {
    try {
      let { category } = req.params;
      category = category.toLowerCase();
      let rsltset = await mdbProductModel.getByAttibutesProjected({categories: category}, {"sku":1, "name":1,"price":1});
      res.status(200).json(rsltset);
    } catch (ex) {
      console.log(ex);
      res.status(500).json({ "msg": "Algo Paso Mal." });
    }
  });// get sku/:skuid

module.exports = router;