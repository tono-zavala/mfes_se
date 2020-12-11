const express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');
let SecurityModel = require("../../models/seguridad/seguridad.model");
let SecModel = new SecurityModel();

// Login
router.post(
    '/login', async (req, res)=>{
        try{
            let {email, password}=req.body;
            let User = await SecModel.getUserByEmail(email);
            
            if(!User){
                console.log("Usuario no exite: "+email);
                res.status(401).json({"error":"No se pueden validar sus credenciales"});
            }else{
                let validarPwd = await SecModel.comparePassword(password, User.password);
                if(validarPwd){
                    let {_id, email, roles } = User;
                    let token = await jwt.sign({_id,email, roles}, process.env.JWT_SECRET);
                    res.status(200).json({"jwt": token, user: {_id, email, roles }});
                }else{
                    console.log("Contrase;a Incorrecta:" +email);
                    res.status(401).json({"eroor":"No se pueden Validar sus credenciales"});
                }
            }
            
        }catch(ex){
            console.log(ex);
            res.status(500).json({"msg":"Algo salio mal"})
        }
    }
);

router.post(
    '/signin', async (req, res)=>{
        try{
            let {email, password}=req.body;
            let resultado = await SecModel.addUsuario({email, password});
            res.status(200).json(resultado);
        }catch(ex){
            consolo.log(ex); 
            res.status(500).json({"msg":"Algo salio mal"});
        }
    }
);
module.exports = router;