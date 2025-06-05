import Produto from '../models/Produto.js';
import ProdutoUnidade from '../models/ProdutoUnidade.js';

class ProdutoController {
    async index(req, res) {
        try {
            const produtos = await Produto.findAll({
                include: [{ model: ProdutoUnidade, as: 'unidades' }]
            });
            return res.status(200).json(produtos);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao listar produtos' });
        }
    }

    async show(req, res) {
        const { id } = req.params;

        try {
            const produto = await Produto.findByPk(id, {
                include: [{ model: ProdutoUnidade, as: 'unidades' }]
            });

            if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });

            return res.status(200).json(produto);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar produto' });
        }
    }

    async store(req, res) {
        const { sessao, nome_do_produto, descricao, foto, unidades } = req.body;

        try {
            const produto = await Produto.create({ sessao, nome_do_produto, descricao, foto });

            if (unidades && unidades.length > 0) {
                for (const unidade of unidades) {
                    await ProdutoUnidade.create({
                        ...unidade,
                        produto_id: produto.id
                    });
                }
            }

            return res.status(201).json({ produto });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao criar produto' });
        }
    }

    async update(req, res) {
        const { id } = req.params;
        const { sessao, nome_do_produto, descricao, foto } = req.body;

        try {
            const produto = await Produto.findByPk(id);
            if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });

            produto.sessao = sessao ?? produto.sessao;
            produto.nome_do_produto = nome_do_produto ?? produto.nome_do_produto;
            produto.descricao = descricao ?? produto.descricao;
            produto.foto = foto ?? produto.foto;

            await produto.save();

            return res.status(200).json(produto);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao atualizar produto' });
        }
    }

    async delete(req, res) {
        const { id } = req.params;

        try {
            const produto = await Produto.findByPk(id);
            if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });

            await ProdutoUnidade.destroy({ where: { produto_id: id } });
            await produto.destroy();

            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao deletar produto' });
        }
    }
}

export default new ProdutoController();
