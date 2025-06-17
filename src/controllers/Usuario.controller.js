import Usuario from "../models/Usuario.js";
import jwt from "jsonwebtoken";

class UsuarioController {
    async store(req, res) {
        const { nome, email, senha } = req.body;
        console.log(req.body)

        try {
            const usuario = await Usuario.create({ nome, email, senha })
            return res.status(201).json(usuario)
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Erro ao criar usuário' })
        }
    }


    async index(req, res) {
        try {
            const usuarios = await Usuario.findAll()
            return res.status(200).json(usuarios)
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Erro ao listar usuários' })
        }
    }


    async show(req, res) {
        const { email } = req.params;
        try {
            const usuario = await Usuario.findOne({ where: { email } })
            if (!usuario) {
                return res.status(404).json({ error: 'Usuário não encontrado' })
            }
            return res.status(200).json(usuario)
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar usuário' })
        }
    }

    async update(req, res) {
        const { email } = req.params;
        const { nome, senha } = req.body;

        try {
            const usuario = await Usuario.findOne({ where: { email } })
            if (!usuario) {
                return res.status(404).json({ error: 'Usuário não encontrado' })
            }

            usuario.nome = nome || usuario.nome;
            usuario.senha = senha || usuario.senha;

            await usuario.save();
            return res.status(200).json(usuario)
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao atualizar usuário' })
        }
    }

    async delete(req, res) {
        const { id } = req.params;

        try {
            const usuario = await Usuario.findByPk(id);
            if (!usuario) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            await usuario.destroy();
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao deletar usuário' });
        }
    }


  async login(req, res) {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    if (usuario.senha !== senha) {
      return res.status(401).json({ error: 'Usuário ou senha inválida' });
    }

    const token = jwt.sign(
      {
        id: usuario.id,     // importante
        nome: usuario.nome,
        email: usuario.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    // retornando o token e dados, incluindo id se quiser (pode ajudar no front)
    return res.status(200).json({ token, nome: usuario.nome, email: usuario.email, id: usuario.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao realizar login' });
  }
}



}


export default new UsuarioController();