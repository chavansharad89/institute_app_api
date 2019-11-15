module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define('Course', {
        courseId: {   
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'course_id'
        },
        name: {
            type: DataTypes.INTEGER,
            field: 'name'
        },
        displayName:{
            type: DataTypes.STRING,
            field: 'display_name'
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            field: 'is_deleted'
        }
    }, {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        freezeTableName: true,
        tableName: 'course'
    });

    return Course;
};