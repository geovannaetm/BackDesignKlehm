import { Router } from "express";
import usuarioController from "../controllers/Usuario.Controller.js";

const routerUsuario = new Router();

routerUsuario.post('/login', usuarioController.login);

routerUsuario.get('/', usuarioController.index);
routerUsuario.post('/', usuarioController.store);
routerUsuario.get('/:email', usuarioController.show);
routerUsuario.put('/:email', usuarioController.update);
routerUsuario.delete('/:id', usuarioController.delete);

export default routerUsuario;