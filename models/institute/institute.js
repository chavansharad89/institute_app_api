module.exports = (sequelize, DataTypes) => {
    const Institute = sequelize.define('Institute', {
        instituteId: {   
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'institute_id'
        },
        accountId: {
            type: DataTypes.INTEGER,
            field: 'account_id'
        },
        name: DataTypes.STRING,
        phoneNumber:{
            type: DataTypes.STRING,
            field: 'phone_number'
        },
        email: DataTypes.STRING,
        address: DataTypes.STRING,
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            field: 'is_active'
        }
    }, {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        freezeTableName: true,
        tableName: 'institute'
    });

    return Institute;
};