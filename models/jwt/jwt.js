module.exports = (sequelize, DataTypes) => {
    const Jwt = sequelize.define('Jwt', {
        jwtId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'jwt_id'
        },
        accountId: {
            type: DataTypes.INTEGER,
            field: 'account_id'
        },
        token: DataTypes.TEXT,
        revoked: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            field: 'revoked'
        }
    }, {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        freezeTableName: true,
        tableName: 'jwt'
    });

    Jwt.associate = (models) => {
        Jwt.belongsTo(models.Account, {
            foreignKey: 'accountId',
            targetKey: 'accountId'
        });
    };

    return Jwt;
};