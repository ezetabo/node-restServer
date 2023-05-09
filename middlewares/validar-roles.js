import { response } from "express";


const esAdmin = (req, res = response, next) => {
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token previamente'
        });
    }

    const { rol, nombre } = req.usuario;
    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no es administrador - No tiene permisos para realizar esto`
        });
    }

    next();

}

const tieneRol = (...roles) => {
    return (req, res,next)=>{
        if(!req.usuario){
            return res.status(500).json({
                msg:'Se quiere verificar el rol sin validar el token previamente'
            });
        }

        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg:`El rol ${req.usuario.rol} no es un rol valido, roles validos: ${roles}`
            });
        }
        next();

    }
}


export {
    esAdmin,
    tieneRol
}