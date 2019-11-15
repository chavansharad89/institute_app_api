module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define('Account', {
        accountId: {   
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'account_id'
        },
        phoneNumber:{
            type: DataTypes.STRING,
            field: 'phone_number'
        },
        
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        roleId: { 
            type: DataTypes.INTEGER,
            field: 'role_id'
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            field: 'is_active'
        }
    }, {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        freezeTableName: true,
        tableName: 'account'
    });

    return Account;
};