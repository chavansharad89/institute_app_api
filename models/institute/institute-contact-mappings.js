module.exports = (sequelize, DataTypes) => {
    const InstituteContactMapping = sequelize.define('InstituteContactMapping', {
        instituteContactMappingId: {   
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'institute_contact_mapping_id'
        },
        firstName: {
            type: DataTypes.STRING,
            field: 'first_name'
        },
        lastName: {
            type: DataTypes.STRING,
            field: 'last_name'
        },
        phoneNumber:{
            type: DataTypes.STRING,
            field: 'phone_number'
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
        tableName: 'institute_contact_mapping'
    });

    return InstituteContactMapping;
};