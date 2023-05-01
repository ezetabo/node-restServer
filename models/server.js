import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { router } from "../routes/usuarios.js";
import { dbConnection } from '../database/config.js';

dotenv.config();


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //conectar DB
        this.ConectarDB();

        //middlewares
        this.middlewares()

        //rutas de la aplicacion
        this.routes();
    }

    async ConectarDB(){
        await dbConnection();
    }

    middlewares() {

        //cors
        this.app.use(cors());

        // lectura y parseo del body
        this.app.use(express.json());

        //directorio publico
        this.app.use(express.static('public'));
    }

    routes() {        
        this.app.use(this.usuariosPath,router);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`)
        });
    }


}


export {
    Server
}