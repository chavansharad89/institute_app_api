module.exports = (sequelize, DataTypes) => {
    const Session = sequelize.define('Session', {
        sessionId: {   
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'session_id'
        },
        accountId: {
            type: DataTypes.INTEGER,
            field: 'account_id'
        },
        name: {
            type: DataTypes.STRING,
            field: 'name'
        },
        startTime: {
            type: DataTypes.DATE,
            field: 'start_time'
        },
        endTime:{
            type: DataTypes.DATE,
            field: 'end_time'
        },
        subjectId:{
            type:  DataTypes.STRING,
            field: 'subject_id'
        },
        courseId: { 
            type: DataTypes.INTEGER,
            field: 'course_id'
        },
        chapterId: { 
            type: DataTypes.INTEGER,
            field: 'chapter_id'
        },
        description: DataTypes.STRING,
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            field: 'is_active'
        }
    }, {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        freezeTableName: true,
        tableName: 'session'
    });

    return Session;
};