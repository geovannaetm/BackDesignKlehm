import Carrinho from '../models/Carrinho.js';
import ProdutoUnidade from '../models/ProdutoUnidade.js';

class CarrinhoController {
    // Obtém todos os itens do carrinho do usuário logado
    async index(req, res) {
        try {
            const itens = await Carrinho.findAll({
                where: { usuario_id: req.usuarioId },
                include: [{
                    model: ProdutoUnidade,
                    as: 'produtoUnidade',
                    include: ['produto']
                }],
            });
            
            return res.status(200).json(itens);
        } catch (error) {
            console.error('Erro ao buscar carrinho:', error);
            return res.status(500).json({ 
                error: 'Erro ao buscar carrinho',
                details: error.message 
            });
        }
    }

    // Adiciona um item ao carrinho
    async addItem(req, res) {
        const { produto_unidade_id, quantidade = 1 } = req.body;

        console.log("usuario id:", req.usuarioId)
        console.log("produto_unidade_id", produto_unidade_id)
        console.log("quantidade", quantidade)
        
        if (!produto_unidade_id) {
            return res.status(400).json({ error: 'ID do produto é obrigatório' });
        }
    
        if (quantidade <= 0) {
            return res.status(400).json({ error: 'Quantidade deve ser maior que zero' });
        }
    
        try {
            // Verifica se o produto_unidade existe e tem estoque
            const produtoUnidade = await ProdutoUnidade.findByPk(produto_unidade_id);
            if (!produtoUnidade) {
                return res.status(404).json({ error: 'Produto não encontrado' });
            }
    
            // Verifica estoque
            if (produtoUnidade.quantidade_estoque < quantidade) {
                return res.status(400).json({ 
                    error: 'Quantidade indisponível em estoque',
                    estoque_disponivel: produtoUnidade.quantidade_estoque
                });
            }
    
            // Verifica se já existe no carrinho
            let item = await Carrinho.findOne({
                where: {
                    usuario_id: req.usuarioId,
                    produto_unidade_id
                }
            });
    
            if (item) {
                // Se já existe, atualiza a quantidade
                const novaQuantidade = item.quantidade + quantidade;
                
                // Verifica estoque novamente
                if (produtoUnidade.quantidade_estoque < novaQuantidade) {
                    return res.status(400).json({ 
                        error: 'Quantidade total indisponível em estoque',
                        estoque_disponivel: produtoUnidade.quantidade_estoque,
                        quantidade_atual_no_carrinho: item.quantidade
                    });
                }
                
                item.quantidade = novaQuantidade;
                await item.save();
                return res.status(200).json(item);
            } else {
                // Se não existe, cria novo item
                item = await Carrinho.create({
                    usuario_id: req.usuarioId,
                    produto_unidade_id,
                    quantidade
                });
                return res.status(201).json(item);
            }
        } catch (error) {
            console.error('Erro ao adicionar item:', error);
            return res.status(500).json({ 
                error: 'Erro ao adicionar item ao carrinho',
                details: error.message 
            });
        }
    }

    // Atualiza a quantidade de um item no carrinho
    async updateItem(req, res) {
        const { produto_unidade_id } = req.params;
        const { quantidade } = req.body;

        if (quantidade === undefined || quantidade === null) {
            return res.status(400).json({ error: 'Quantidade é obrigatória' });
        }

        try {
            const item = await Carrinho.findOne({
                where: {
                    usuario_id: req.usuarioId,
                    produto_unidade_id
                },
                include: [{
                    model: ProdutoUnidade,
                    as: 'produtoUnidade'
                }]
            });

            if (!item) {
                return res.status(404).json({ error: 'Item não encontrado no carrinho' });
            }

            // Verifica estoque se for aumentar a quantidade
            if (quantidade > item.quantidade) {
                const diferenca = quantidade - item.quantidade;
                if (item.produtoUnidade.quantidade_estoque < diferenca) {
                    return res.status(400).json({ 
                        error: 'Quantidade indisponível em estoque',
                        estoque_disponivel: item.produtoUnidade.quantidade_estoque
                    });
                }
            }

            if (quantidade <= 0) {
                await item.destroy();
                return res.status(204).send();
            }

            item.quantidade = quantidade;
            await item.save();
            
            return res.status(200).json(item);
        } catch (error) {
            console.error('Erro ao atualizar item:', error);
            return res.status(500).json({ 
                error: 'Erro ao atualizar item do carrinho',
                details: error.message 
            });
        }
    }

    // Remove um item do carrinho
    async removeItem(req, res) {
        const { produto_unidade_id } = req.params;

        try {
            const item = await Carrinho.findOne({
                where: {
                    usuario_id: req.usuarioId,
                    produto_unidade_id
                }
            });

            if (!item) {
                return res.status(404).json({ error: 'Item não encontrado no carrinho' });
            }

            await item.destroy();
            return res.status(204).send();
        } catch (error) {
            console.error('Erro ao remover item:', error);
            return res.status(500).json({ 
                error: 'Erro ao remover item do carrinho',
                details: error.message 
            });
        }
    }

    // Limpa todo o carrinho do usuário
    async clearCart(req, res) {
        try {
            await Carrinho.destroy({
                where: { usuario_id: req.usuarioId }
            });
            
            return res.status(204).send();
        } catch (error) {
            console.error('Erro ao limpar carrinho:', error);
            return res.status(500).json({ 
                error: 'Erro ao limpar carrinho',
                details: error.message 
            });
        }
    }
}

export default new CarrinhoController();