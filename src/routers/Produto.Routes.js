import { Router } from 'express';
import produtoController from '../controllers/Produto.Controller.js';

const routerProduto = new Router();

routerProduto.get('/', produtoController.index);
routerProduto.post('/', produtoController.store);
routerProduto.get('/:id', produtoController.show);
routerProduto.put('/:id', produtoController.update);
routerProduto.delete('/:id', produtoController.delete);

export default routerProduto;
