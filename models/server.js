import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { router } from "../routes/usuarios.js";

dotenv.config();


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.usuariosPath = '/api/usuarios';

        //middlewares
        this.middlewares()

        //rutas de la aplicacion
        this.routes();
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
            console.log(`Example app listening on port ${this.port}`)
        });
    }


}


export {
    Server
}
