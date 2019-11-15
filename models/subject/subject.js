module.exports = (sequelize, DataTypes) => {
    const Subject = sequelize.define('Subject', {
        subjectId: {   
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'subject_id'
        },
        name: {
            type: DataTypes.INTEGER,
            field: 'name'
        },
        displayName:{
            type: DataTypes.STRING,
            field: 'display_name'
        },
        streamId: {
            type: DataTypes.INTEGER,
            field: 'stream_id'
        },
        courseId: {
            type: DataTypes.INTEGER,
            field: 'course_id'
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
        tableName: 'subject'
    });

    return Subject;
};