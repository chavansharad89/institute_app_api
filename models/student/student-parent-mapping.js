module.exports = (sequelize, DataTypes) => {
    const StudentParentMapping = sequelize.define('StudentParentMapping', {
        studentParentMappingId: {   
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'student_parent_mapping_id'
        },
        studentId: {   
            type: DataTypes.INTEGER,
            field: 'student_id'
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
        tableName: 'student_parent_mapping'
    });

    return StudentParentMapping;
};