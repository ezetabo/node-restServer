import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
dotenv.config();

const generarJWT = (uid='')=>{
    return new Promise((resolve, reject)=>{
        const payload = {uid};
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY,{
            expiresIn: '4h'
        },(err,token)=>{
            if(err){
                console.log(err);
                reject('No se logro generar el token');
            }else{
                resolve(token);
            }
        })
    });
}

export{
    generarJWT
}