
const _ = require('lodash');
const Op = Models.Sequelize.Op;

module.exports = {
    deleteStream,
    getStreamDetailsByStreamId,
    addStream,
    updateStream,
    getStreamList
}


async function addStream(name) {
    const existingStreamDetails = await getStreamDetailsByStreamName(name);
    if(existingStreamDetails) {
        throw _throwAlreadyExistsError(`Stream '${name}'`);
    }

    await _addStream({name, displayName: name});
}

async function updateStream(streamId, detailsToUpdate) {
    const existingStreamDetails = await _getStreamDetailsByStreamId(streamId);
    if(!existingStreamDetails) {
        throw _throwNotFoundError(`Stream Id ${streamId}`);
    }
    await _updateStream({
        displayName: detailsToUpdate.name,
        ...detailsToUpdate
    },{streamId});
    return {
        streamId
    }
}
async function deleteStream(streamId) {
    await getStreamDetailsByStreamId(streamId);
    await _deleteStream(streamId);
    return true;
}

async function getStreamDetailsByStreamId(streamId) {
    const StreamDetails = await _getStreamDetailsByStreamId(streamId);

    if(!StreamDetails) {
        throw _throwNotFoundError(`Stream Id ${streamId}`);
    } 

    return StreamDetails;
}

async function getStreamList() {
    return await _getStreamList();
}


function _getStreamList() {
    const query = `

    select 
        s.stream_id as "streamId",
        s.name as "key",
        s.display_name as "displayName"
    
        from stream s
        where s.is_deleted = false
        
    `
    return Models.sequelize.query(query, {
        type: Models.sequelize.QueryTypes.SELECT
    });
}

function _getStreamDetailsByStreamId(streamId) {
    const query = `

    select 
        s.Stream_id as "streamId",
        s.name,
        s.display_name as "StreamName"
    
        from stream s

        where s.Stream_id = ${streamId} and s.is_active = true
        
    `
    return Models.sequelize.query(query, {
        type: Models.sequelize.QueryTypes.SELECT
    });
}

function getStreamDetailsByStreamName(streamName) {
    const query = `

    select 
        s.stream_id as "streamId",
        s.name,
        s.display_name as "StreamName"
    
        from stream s
        where s.display_name = ${streamName} and s.is_active = true
        
    `
    return Models.sequelize.query(query, {
        type: Models.sequelize.QueryTypes.SELECT
    });
}

function _throwNotFoundError(value) {
    return Utils.Error.handleError().defaultError(`${value} Not Found`);
}

function _throwAlreadyExistsError(value) {
    return Utils.Error.handleError().defaultError(`${value} already exists`);
}

function _deleteStream(streamId, streamId) {
    return Models
        .Stream
        .update({
            is_active : false
        }, {
            streamId
        });
}

function _addStream(StreamDataToAdd) {
    return Models
        .Stream
        .create(StreamDataToAdd);
}