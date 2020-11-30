var express = require('express');
var router = express.Router();


let passport = require('passport');
let passportJWT = require('passport-jwt'); 


let extractJWT =passportJWT.ExtractJwt;
let strategyJWT = passportJWT.Strategy;


passport.use(
    new strategyJWT(
        {
            jwtFromRequest:extractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
    
        },
        (payload, next)=>{
            var user = payload;
            return next(null,user);
        }
    )
);

const jwtAuthMiddleware = passport.authenticate('jwt', {session:false});


const productosRutas = require ('./api/productosdb');
const seguridadRutas = require('./api/seguridad');
router.use('/seguridad', seguridadRutas);
router.use('/productos', jwtAuthMiddleware, productosRutas); 

router.get(
    '/version', (req, res)=>{
        let misdatos ={
            app: "Maite Fashion E-Shop",
            version: "0.0.0.1",
            estado: "alfa",
            fecha: "27/11/2020",
            autores: "Los foraneos"
        }
        res.status(200).json(misdatos);
    }
);



module.exports = router;