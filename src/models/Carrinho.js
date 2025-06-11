import Sequelize, { Model } from 'sequelize';

export default class Carrinho extends Model {
    static init(sequelize) {
        super.init({
            usuario_id: {
                type: Sequelize.INTEGER,
                primaryKey: true // Faz parte da chave primária composta
            },
            produto_unidade_id: {
                type: Sequelize.INTEGER,
                primaryKey: true // Faz parte da chave primária composta
            },
            quantidade: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 1
            }
        }, {
            sequelize,
            tableName: 'carrinho',
            timestamps: false,
            underscored: true,
            // Opções para chave primária composta
            primaryKey: ['usuario_id', 'produto_unidade_id']
        });

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Usuario, {
            foreignKey: 'usuario_id',
            as: 'usuario'
        });
        
        this.belongsTo(models.ProdutoUnidade, {
            foreignKey: 'produto_unidade_id',
            as: 'produtoUnidade'
        });
    }
}