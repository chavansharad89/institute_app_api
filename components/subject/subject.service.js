
const _ = require('lodash');
const Op = Models.Sequelize.Op;
const Error = require('../../utils/Error');

module.exports = {
    deleteSubject,
    getSubjectDetailsBySubjectId,
    addSubject,
    updateSubject,
    getSubjectList,
    getCourseDetailsByCourseId
}


async function addSubject(subjectDetailsToAdd) {
    const {name, courseId, streamId} = subjectDetailsToAdd;
    const existingSubjectDetails = await getSubjectDetailsBySubjectNameAndCourseId(name, courseId);
    console.log("existingSubjectDetails");
    console.log(existingSubjectDetails);
    if(existingSubjectDetails) {
        throw _throwAlreadyExistsError(`Subject '${name}'`);
    }

    const addedSubjectDetails = await _addSubject(name, courseId, streamId);
    return {
        subjectId : addedSubjectDetails.subjectId
    }
}

async function updateSubject(subjectId, detailsToUpdate) {
    const existingSubjectDetails = await _getSubjectDetailsBySubjectId(subjectId);
    if(!existingSubjectDetails) {
        throw _throwNotFoundError(`Subject Id ${subjectId}`);
    }
    await _updateSubject({
        displayName: detailsToUpdate.name,
        ...detailsToUpdate
    },{subjectId});
    return {
        subjectId
    }
}
async function deleteSubject(subjectId) {
    await getSubjectDetailsBySubjectId(subjectId);
    await _deleteSubject(subjectId, courseId);
    return true;
}

async function getSubjectDetailsBySubjectId(subjectId) {
    const subjectDetails = await _getSubjectDetailsBySubjectId(subjectId);

    if(!subjectDetails) {
        throw _throwNotFoundError(`Subject Id ${subjectId}`);
    } 

    return subjectDetails;
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


function _getSubjectDetailsBySubjectId(subjectId) {
    const query = `

    select 
        s.subject_id as "subjectId",
        s.name,
        s.course_id as "courseId",
        c.display_name as "courseName"
    
        from subject s

        join course c
        on c.course_id = s.course_id and c.is_deleted = false

        where s.subject_id = ${subjectId}
        
    `
    return Models.sequelize.query(query, {
        type: Models.sequelize.QueryTypes.SELECT
    });
}

function getSubjectDetailsBySubjectNameAndCourseId(subjectName, courseId) {
    const query = `

    select 
        s.subject_id as "subjectId",
        s.name,
        s.course_id as "courseId",
        c.display_name as "courseName"
    
        from subject s

        join course c
        on c.course_id = s.course_id and c.is_deleted = false

        where s.name = '${subjectName}' and s.course_id = ${courseId}
        
    `
    return Models.sequelize.query(query, {
        type: Models.sequelize.QueryTypes.SELECT
    })
    .then(data => {
        return data && _.size(data) > 0 ? _.head(data): null;
    });
}

function getSubjectList() {
    const query = `

    select 
        s.subject_id as "subjectId",
        s.name,
        s.display_name as "displayName",
        s.course_id as "courseId",
        c.display_name as "courseName"
    
        from subject s

        join course c
        on c.course_id = s.course_id and c.is_deleted = false

        where s.is_deleted = false
        
    `
    return Models.sequelize.query(query, {
        type: Models.sequelize.QueryTypes.SELECT
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
        details: {
            value
        }
    }
}

function _deleteSubject(subjectId, courseId) {
    return Models
        .Subject
        .update({
            is_active : false
        }, {
            subjectId,
            courseId
        });
}

function _addSubject(name, courseId, streamId) {
    return Models
        .Subject
        .create({
            name,
            displayName: name,
            courseId,
            streamId
        })
        .then(addedSubjectDetails => addedSubjectDetails.get({plain: true}));
}