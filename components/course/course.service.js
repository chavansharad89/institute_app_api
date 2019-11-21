
const _ = require('lodash');
const Op = Models.Sequelize.Op;

const SubjectService = require('../subject/subject.service');
const ChapterService = require('../chapter/chapter.service');
const Error = require('../../utils/Error');

module.exports = {
    deleteCourse,
    getCourseDetailsByCourseId,
    addCourse,
    updateCourse,
    getSubjectAndChapterWiseCourseList
}


async function addCourse(name) {
    const existingCourseDetails = await getCourseDetailsByCourseName(name);
    if(existingCourseDetails) {
        throw _throwAlreadyExistsError(`Course '${name}'`);
    }

    const couseDetails = await _addCourse({name, displayName: name});
    return {
        courseId: couseDetails.courseId
    };
}

async function updateCourse(courseId, detailsToUpdate) {
    const existingCourseDetails = await _getCourseDetailsByCourseId(courseId);
    if(!existingCourseDetails) {
        throw _throwNotFoundError(`Course Id ${courseId}`);
    }
    await _updateCourse({
        displayName: detailsToUpdate.name,
        ...detailsToUpdate
    },{CourseId});
    return {
        CourseId
    }
}
async function deleteCourse(courseId) {
    await getCourseDetailsByCourseId(courseId);
    await _deleteCourse(courseId);
    return true;
}

async function getCourseDetailsByCourseId(courseId) {
    const courseDetails = await _getCourseDetailsByCourseId(courseId);

    if(!courseDetails) {
        throw _throwNotFoundError(`Course Id ${courseId}`);
    } 

    return courseDetails;
}


function _getCourseDetailsByCourseId(courseId) {
    const query = `

    select 
        c.course_id as "CourseId",
        c.name,
        c.display_name as "courseName"
    
        from course c

        where c.course_id = ${courseId} and c.is_deleted = false
        
    `
    return Models.sequelize.query(query, {
        type: Models.sequelize.QueryTypes.SELECT
    })
    .then(data => {
        return data && _.size(data) > 0 ? _.head(data) : null;
    });
}

function getCourseDetailsByCourseName(courseName) {
    const query = `

    select 
        c.course_id as "CourseId",
        c.name,
        c.display_name as "courseName"
    
        from course c
        where c.display_name = '${courseName}' and c.is_deleted = false
        
    `
    return Models.sequelize.query(query, {
        type: Models.sequelize.QueryTypes.SELECT
    })
    .then(data => {
        return data && _.size(data) > 0 ? _.head(data): null;
    });
}

function _throwNotFoundError(value) {
    return {
        type: Error.ValueNotFound,
        details: {
            value
        }
    }
}

function _throwAlreadyExistsError(value) {
    return {
        type: Error.ValueAlreadyExists,
        details : {
            value
        }
    }
}

function _deleteCourse(courseId) {
    return Models
        .Course
        .update({
            isDeleted : true
        }, {
            where: {courseId}
        });
}

function _addCourse(courseDataToAdd) {
    return Models
        .Course
        .create(courseDataToAdd)
        .then(addedCouseDetails => addedCouseDetails.get({plain: true}));
}

function _getCourseList() {
    const query = `

    select 
        c.course_id as "courseId",
        c.name as "key",
        c.display_name as "displayName"
    
        from course c
        where  c.is_deleted = false
        
    `
    return Models.sequelize.query(query, {
        type: Models.sequelize.QueryTypes.SELECT
    });
}

async function getSubjectAndChapterWiseCourseList() {
    const [courseList, subjectList, chapterList] = await Promise.all([
        _getCourseList(),
        SubjectService.getSubjectList(),
        ChapterService.getChapterList()
    ]);

    return _formatResult(courseList, subjectList, chapterList);


    function _formatResult(courseList, subjectList, chapterList) {
        return _.map(courseList, (course) => {
            const filteredSubjectList = _.filter(subjectList, (subject) => {
                return subject.courseId === course.courseId
            });
            
            return {
                courseId: course.courseId,
                displayName: course.displayName,
                subjectList : _.map(filteredSubjectList, (subject) => {
                    const filteredChapterList = _.filter(chapterList, (chapter) => {
                        return chapter.subjectId === subject.subjectId
                    });
                    return {
                        subjectId: subject.subjectId,
                        displayName: subject.displayName,
                        chapterList: filteredChapterList
                    }
                })
            }
        });
    }
}