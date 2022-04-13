require('dotenv').config();
const express = require('express');
const cors = require('cors');
const user = require('../routes/user-routes');
const auth = require('../routes/auth-routes');
const { dbConnection } = require('../db/config-db');



class Server {

    constructor(){  
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/user';
        this.authPath = '/api/auth';
        //Conectar a la BD
        this.connectDB();
        //Middlewares
        this.middlewares();
        //Rutas de mi aplicacion!
        this.routes();
    }
    async connectDB(){
        await dbConnection();
    }
    middlewares(){
        //cors
        this.app.use(cors());
        //Lectura y parseo del body
        this.app.use(express.json());
        //Directorio publico
        this.app.use(express.static('public'))
    }
    routes(){
        this.app.use(this.authPath, auth);
       this.app.use(this.userPath, user);
    }
    listening(){
        this.app.listen( this.port, ()=>{
            console.log('Corriendo el puerto', this.port);
        });
    }

}

module.exports = Server;