import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import './database/ModelConnection.js';
import homeRoutes from './routers/Home.Routes.js';
import usuarioRouters from './routers/Usuario.routers.js';
import produtoRoutes from './routers/Produto.Routes.js';
import carrinhoRoutes from './routers/Carrinho.Routes.js';


dotenv.config();

class App {
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    routes() {
        this.app.use('/', homeRoutes);
        this.app.use('/usuario', usuarioRouters);
        this.app.use('/produtos', produtoRoutes);
        this.app.use('/carrinho', carrinhoRoutes);
    }
}

export default new App().app;