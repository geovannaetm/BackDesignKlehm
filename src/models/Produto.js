import Sequelize, { Model } from 'sequelize';

export default class Produto extends Model {
    static init(sequelize) {
        super.init({
            sessao: Sequelize.STRING,
            nome_do_produto: Sequelize.STRING,
            descricao: Sequelize.TEXT,
            foto: Sequelize.STRING,
        }, {
            sequelize,
            tableName: 'produto',
            timestamps: false,
        });

        return this;
    }

    static associate(models) {
        this.hasMany(models.ProdutoUnidade, {
            foreignKey: 'produto_id',
            as: 'unidades'
        });
    }
}
