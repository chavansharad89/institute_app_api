
const _ = require('lodash');
const Op = Models.Sequelize.Op;
const AccountService = require('../account/account.service');
const CourseService = require('../course/course.service');
const Error = require('../../utils/Error');

module.exports = {
    registerStudent,
    getStudentDetailsByStudentId
}


async function registerStudent(studentDetailsToRegister) {
    const {
        firstName,
        lastName,
        courseId,
       // address,
        email,
        password,
        parentDetails,
        phoneNumber
    } = studentDetailsToRegister;
    const accountDetailsByEmail = email ? await AccountService.getAccountDetailsByEmailOrPhoneNumber(email): null;
    if(accountDetailsByEmail) {
        throw _throwValueAlreadyExistsError(`Email ${email}`);
    }
    const accountDetailsByPhoneNumber = phoneNumber ? await AccountService.getAccountDetailsByEmailOrPhoneNumber(phoneNumber): null;
    if(accountDetailsByPhoneNumber) {
        throw _throwValueAlreadyExistsError(`Phone Number ${phoneNumber}`);
    }
    await CourseService.getCourseDetailsByCourseId(courseId);
    //address = Object.keys(address).join();
    const accountDetails = await AccountService.addAccount({
        phoneNumber,
        email,
        password,
        role : 'student'
    });

    const addedStudentData = await _addStudent({
        firstName,
        lastName,
        courseId,
        accountId: accountDetails.accountId,
      //  address,
        phoneNumber
    });
    console.log(addedStudentData);
    await addStudentParentMapping(addedStudentData.studentId, parentDetails);
    
    return {
        studentId: addedStudentData.studentId
    };
}


async function getStudentDetailsByStudentId(studentId) {
    const studentDetails = await _getStudentDetailsByStudentId(studentId);
    if(studentDetails) {
        throw _throwValueNotFoundError(`student Id ${studentId}`);
    }
    return studentDetails;
}   

function addStudentParentMapping(studentId, parentDetails) {
    return Models
        .StudentParentMapping
        .create({
            studentId,
            ...parentDetails
        })
        .then(addreStudentDetails => addreStudentDetails.get({plain: true}));
}

function _addStudent(studentDataToAdd) {
    return Models
        .Student
        .create(studentDataToAdd)
        .then(addreStudentDetails => addreStudentDetails.get({plain: true}));
}

function _getStudentDetailsByStudentId(studentId) {
    const query = `
        select 
            s.student_id as "studentId",
            s.first_name as "firstName",
            s.last_name as "lastName",
            s.address,
            s.parent_details as "parentDetails",
            s.contact_number as "contactNumber"
        from student s
        join student_parent_mapping spm 
        on s.student_id = spm.student_id and 
        where s.is_active = true and s.student_id = ${studentId}
    `;

    return Models.sequelize.query(query, {
        type: Models.sequelize.QueryTypes.SELECT
    })
    .then(data => {
        return data && _.size(data) > 0 ? _.head(data) : null;
    });
}


function _throwValueNotFoundError(value) {
    return {
        type: Error.ValueNotFound,
        details: {
            value
        }
    }
}

function _throwValueAlreadyExistsError(value) {
    return {
        type: Error.ValueAlreadyExists,
        details: {
            value
        }
    }
}