import Usuario from '../models/usuario.js'
import { response } from "express";
import  jwt  from "jsonwebtoken";
import * as dotenv from 'dotenv';
dotenv.config();

const validarJWT = async(req,res = response, next)=>{
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            msg: 'Debe ingresar el token'
        });
    }
   try {
    const {uid} = jwt.verify(token,process.env.SECRETORPRIVATEKEY);  
    const usuario =  await Usuario.findById(uid);
    
    if(!usuario){
        
        return res.status(401).json({
            msg:'Token no valido - El usuario no existe en la DB'
        });
    }

    if(!usuario.estado){
        return res.status(401).json({
            msg:'Token no valido - Usuario inactivo'
        });
    }

    req.usuario = usuario;   
    next();
   } catch (error) {
    console.log(error);
    res.status(401).json({
        msg: 'Token no valido'
    });
   }
   
}


export{
    validarJWT
}