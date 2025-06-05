import Sequelize, { Model } from 'sequelize';

export default class ProdutoUnidade extends Model {
    static init(sequelize) {
        super.init({
            tamanho: Sequelize.STRING,
            preco: Sequelize.FLOAT,
            quantidade_estoque: Sequelize.INTEGER,
        }, {
            sequelize,
            tableName: 'produto_unidade',
            timestamps: false,
        });

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Produto, {
            foreignKey: 'produto_id',
            as: 'produto'
        });
    }
}
