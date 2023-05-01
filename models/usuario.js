import { Schema,model} from "mongoose";

const UsuarioSchema = Schema({
    nombre:{
        type: String,
        require: [true,'El nombre es requerido']
    },
    correo:{
        type: String,
        require: [true,'El correo es requerido'],
        unique: true
    },
    password:{
        type: String,
        require: [true,'La contraseña es requerido']     
    },
    img:{
        type: String
    },
    rol:{
        type: String,
        require: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }

});
    


UsuarioSchema.methods.toJSON = function(){
    const {__v,password,...usuario} = this.toObject();
    return usuario;
}



export default model('usuarios', UsuarioSchema);