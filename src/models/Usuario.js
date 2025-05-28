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

}