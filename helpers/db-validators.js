import Role from '../models/role.js';
import Usuario from '../models/usuario.js';

const esRolValido = async (rol = '') =>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no es valido`)
    }
}

const existeMail = async (correo = '') =>{
    const existe = await Usuario.findOne({correo});
    if(existe){
        throw new Error(`El correo ${correo} ya existe`)
    }
}

const existeID = async (id) =>{
    const existe = await Usuario.findById(id);
    if(!existe){
        throw new Error(`El ID ${id} no existe`)
    }
}

export{
    esRolValido,
    existeMail,
    existeID    
}