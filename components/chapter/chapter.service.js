
const _ = require('lodash');
const Op = Models.Sequelize.Op;
const SubjectService = require('../subject/subject.service');
const CourseService = require('../course/course.service');

const Error = require('../../utils/Error');

module.exports = {
    addChapter,
    getChapterDetailsByChapterId,
    deleteChapter,
    getChapterList
}


async function addChapter(name, subjectId, courseId) {
    
    const [existingCourseDetails, existingSubjectDetails] = await Promise.all([
        SubjectService.getCourseDetailsByCourseId(courseId),
        SubjectService.getSubjectDetailsBySubjectId(subjectId)
    ]);
    const existingChapterDetails = await _getChapterDetailsByChapterNameSubjectIdAndCourseId(name, subjectId, courseId);
    if(existingChapterDetails) {
        throw _throwAlreadyExistsError(`chapter name ${name}`);
    }
    const addedChapterDetails = await _addChapter({name, subjectId, courseId});
    return {
        chapterId: addedChapterDetails.chapterId
    };
}

async function deleteChapter(chapterId) {
    await getChapterDetailsByChapterId(chapterId);
    await _deleteChapter(chapterId);
    return true;
}

async function getChapterDetailsByChapterId(chapterId) {
    const chapterDetails = await _getChapterDetailsByChapterId(chapterId);
    if(!chapterDetails) {
        throw _throwNotFoundError(`ChapterId ${chapterId}`);
    } 
    return chapterDetails;
}

function getChapterList() {
    const query = `

    select 
        c.chapter_id as "chapterId",
        c.name as "displayName",
        c.subject_id as "subjectId"
        from chapter c
        where  c.is_deleted = true
        
    `
    return Models.sequelize.query(query, {
        type: Models.sequelize.QueryTypes.SELECT
    });
}

function _getChapterDetailsByChapterId(chapterId) {
    const query = `

    select 
        c.chapter_id as "chapterId",
        c.name,
        s.subject_id as "subjectId",
        cr.course_id as "courseId"    
        from course c

        where c.chapter_id= ${chapterId} and  c.is_active = true
        
    `
    return Models.sequelize.query(query, {
        type: Models.sequelize.QueryTypes.SELECT
    });
}

function _getChapterDetailsByChapterNameSubjectIdAndCourseId(name, subjectId, courseId) {
    const query = `

    select 
        c.chapter_id as "chapterId",
        c.name,
        c.subject_id as "subjectId"  
        from chapter c

        where c.name = '${name}' and c.subject_id = ${subjectId} and c.is_deleted = false
        
    `
    return Models.sequelize.query(query, {
        type: Models.sequelize.QueryTypes.SELECT
    })
    .then(data => {
        return data && _.size(data) > 0 ? _.head(data) : null;
    });
}
function _throwNotFoundError(value) {
    return Utils.Error.handleError().defaultError(`${value} Not Found`);
}

function _throwAlreadyExistsError(value) {
    return {
        type: Error.ValueAlreadyExists,
        details: {
            value
        }
    }
}

function _deleteChapter(chapterId) {
    return Models
        .Chapter
        .update({
            is_active : false
        }, {
            chapterId
        });
}

function _addChapter(chapterDataToAdd) {
    return Models
        .Chapter
        .create(chapterDataToAdd);
}