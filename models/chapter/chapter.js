module.exports = (sequelize, DataTypes) => {
    const Chapter = sequelize.define('Chapter', {
        chapterId: {   
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'chapter_id'
        },
        name: {
            type: DataTypes.INTEGER,
            field: 'name'
        },
        subjectId: {
            type: DataTypes.INTEGER,
            field: 'subject_id'
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
        tableName: 'chapter'
    });

    return Chapter;
};