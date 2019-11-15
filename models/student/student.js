module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define('Student', {
        studentId: {   
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'student_id'
        },
        accountId: {
            type: DataTypes.INTEGER,
            field: 'account_id'
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
        address:  DataTypes.STRING,        
        courseId: { 
            type: DataTypes.INTEGER,
            field: 'course_id'
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
        tableName: 'Student'
    });

    return Student;
};