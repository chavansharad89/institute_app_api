const _ = require('lodash');
const Op = Models.Sequelize.Op;
const Constant = require('../../utils/Constant');

module.exports = {
    createSession,
    editSession,
    getSessionDetailsBySessionId,
    getSessionList
}

/////////////////////////////////PUBLIC FUNCTION /////////////////////////////////////////

async function createSession(accountId, sesstionDetailsToAdd) {
    let {name, startTime, endTime, streamId = null, courseId, subjectId, chapterId, description} = sesstionDetailsToAdd;
    
    _startTime = new Date(startTime);
    _endTime = new Date(endTime);


    // const sessionDetails = await _getSessionDetailsByNameStartTimeAndEndTimeAndAccountId(
    //     accountId, 
    //     name,
    //     _startTime,
    //     _endTime
    // );
    
    // if(sessionDetails) {
    //     throw _throwValueAlreadyExistsError(`Session for start time ${startTime} and end time ${endTime} `)
    // }
    const {session_id} = await _createSession({
        accountId, 
        name, 
        startTime, 
        endTime, 
        streamId,
        courseId, 
        subjectId, 
        chapterId,
        description
    });
    return {
        session_id
    };
}

async function editSession(sessionId, sessionDataToUpdate) {
    const sessionDetails = await getSessionDetailsBySessionId(sessionId);
    if(!sessionDetails) {
        throw _throwValueNotFoundError(`Session id ${sessionId}`)
    }
    await _updateSession(sessionId, sessionDataToUpdate);
    return {sessionId};
}


async function getSessionList(accountId, role, pageId =1, limit = 10) {
    const sessionList = await _getSessionList(accountId, role, pageId, limit);
    return sessionList;
}

async function getSessionDetailsBySessionId(sessionId) {
    const sessionList = await _getSessionDetailsBySessionId(sessionId);
    return sessionList;
}


async function _getSessionList(accountId, role, pageId, limit) {    
    const offset = (pageId - 1) * limit;
    const whereCluaseQuery = role === Constant.ROLES.INSTITUTE ? ` and s.account_id = ${accountId} ` : '';
    const query = `
            select 
                s.session_id as "sessionId",
                s.name,
                s.start_time as "startTime",
                s.end_time as "endTime",
                s.course_id as "couseId",
                cr.display_name as "couseName",
                sj.subject_id as "subjectId",
                sj.display_name as "subjectName",
                c.chapter_id as "chapterId",
                c.name as "chapterName"
            
                from session s
                
                join account a
                on s.account_id = a.account_id and a.is_active = true

                join role r
                on r.role_id = a.role_id and r.is_active = true

                join course cr
                on s.course_id = cr.course_id and cr.is_deleted = false

                join subject sj
                on sj.subject_id = s.subject_id and sj.is_deleted = false

                join chapter c
                on s.chapter_id = c.chapter_id and c.is_deleted = false

                where s.is_active = true ${whereCluaseQuery}
                
                limit ${limit} offset ${offset}
    `;
    
    return Models.sequelize.query(query, {
        type: Models.sequelize.QueryTypes.SELECT
    });
}


async function _getSessionDetailsBySessionId(sessionId) {
    const query = `

    select 
    s.session_id as "sessionId",
    s.name,
    s.start_time as "startTime",
    s.end_time as "endTime",
    s.course_id as "couseId",
    cr.display_name as "couseName",
    sj.subject_id as "subjectId",
    sj.display_name as "subjectName",
    c.chapter_id as "chapterId",
    c.name as "chapterName"

    from session s
    
    join account a
    on s.account_id = a.account_id and a.is_active = true

    join role r
    on r.role_id = a.role_id and r.is_active = true

    join course cr
    on s.course_id = cr.course_id and cr.is_deleted = false

    join subject sj
    on sj.subject_id = s.subject_id and sj.is_deleted = false

    join chapter c
    on s.chapter_id = c.chapter_id and c.is_deleted = false

    where s.is_active = true and s.session_id = ${sessionId}
    `;

    
    return Models.sequelize.query(query, {
        type: Models.sequelize.QueryTypes.SELECT
    });
}


function _getSessionDetailsByNameStartTimeAndEndTimeAndAccountId(
    accountId, 
    name,
    startTime,
    endTime
) {
    const query = `
    
    select 
    s.session_id as "sessionId",
    s.name,
    s.start_time as "startTime",
    s.end_time as "endTime",
    s.course_id as "couseId",
    cr.display_name as "couseName",
    sj.subject_id as "subjectId",
    sj.display_name as "subjectName",
    c.chapter_id as "chapterId",
    c.name as "chapterName"

    from session s
    
    join account a
    on s.account_id = a.account_id and a.is_active = true

    join role r
    on r.role_id = a.role_id and r.is_active = true

    join course cr
    on s.course_id = cr.course_id and cr.is_deleted = false

    join subject sj
    on sj.subject_id = s.subject_id and sj.is_deleted = false

    join chapter c
    on s.chapter_id = c.chapter_id and c.is_deleted = false

    where s.is_active = true
        and s.name = ${name}
        and s.account_id = ${accountId}
        and s.start_time = CAST(${startTime} AS DATETIME)
        and s.end_time = CAST(${endTime} AS DATETIME)`
    
    return Models.sequelize.query(query, {
        type: Models.sequelize.QueryTypes.SELECT
    })
    .then(data => {
        return data && _.size(data) > 0? _.head(data) : null;
    });
}

async function _createSession(sessionDataToAdd) {

    const addedSessionDetails = await _addSession(sessionDataToAdd);
    return {
        sessionId: addedSessionDetails.sessionId
    }
}


function _addSession(sessionDataToAdd) {
    return Models
        .Session
        .create(sessionDataToAdd)
        .then(sessionDetails => sessionDetails.get({plain: true}));
}

function _updateSession(sessionId, sessionDataToUpdate) {
    return Models
        .Session
        .update(sessionDataToUpdate,{sessionId});
}

function _throwValueNotFoundError(value) {
    return {
        type: Error.ValueNotFound,
        details: {
            value
        }
    }
    
}