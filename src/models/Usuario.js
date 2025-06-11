import Sequelize, { Model } from 'sequelize';

export default class Usuario extends Model {
    static init(sequelize) {
        super.init({
            nome: Sequelize.STRING,
            email: Sequelize.STRING,
            senha: Sequelize.STRING,
        }, {
            sequelize,
            tableName: 'usuario',
            timestamps: false,
        }
        )
        return this;
    }

    static associate(models) {
        this.hasMany(models.Carrinho, {
            foreignKey: 'usuario_id',
            as: 'carrinho'
        });
    }
}