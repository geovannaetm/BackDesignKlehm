import express from 'express';
import CarrinhoController from '../controllers/Carrinho.Controller.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = express.Router();

// Aplica authMiddleware apenas nas rotas que precisam de autenticação
router.get('/', authMiddleware, CarrinhoController.index); // Listar itens (autenticado)
router.post('/', authMiddleware, CarrinhoController.addItem); // Adicionar item (autenticado)
router.put('/:produto_unidade_id', authMiddleware, CarrinhoController.updateItem); // Atualizar quantidade (autenticado)
router.delete('/:produto_unidade_id', authMiddleware, CarrinhoController.removeItem); // Remover item específico (autenticado)
router.delete('/', authMiddleware, CarrinhoController.clearCart); // Limpar carrinho (autenticado)

// Se tivesse rotas públicas, ficariam sem o middleware:
// router.get('/public', CarrinhoController.metodoPublico);

export default router;