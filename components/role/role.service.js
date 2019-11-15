
const _ = require('lodash');
const Op = Models.Sequelize.Op;

module.exports = {
    getRoleDetailsByRoleId,
    getRoleDetailsByRoleName,
    getRoleList
}


async function getRoleDetailsByRoleId(roleId) {
    const roleDetails = await _getRoleDetailsByRoleId(roleId);
    if(!roleDetails) {
        throw _throwErrorValueNotFound(`role id ${roleId}`)
    }
    return roleDetails;
}

async function getRoleDetailsByRoleName(role) {
    const roleDetails = await _getRoleDetailsByRoleName(role);
    if(!roleDetails) {
        throw _throwErrorValueNotFound(`role ${role}`)
    }
    return roleDetails;
}

async function getRoleList() {
    return await _getRoleList();
}


function _getRoleList() {
    const query = `
        select 
            r.role_id as "roleId",
            r.name as "key",
            r.display_name as "displayName"
        from role r
        where r.is_active = true
        `
        return Models.sequelize.query(query, {
            type: Models.sequelize.QueryTypes.SELECT
        })
}

function _getRoleDetailsByRoleId(roleId) {
    const query = `
        select 
            r.role_id as "roleId",
            r.name,
            r.display_name as "displayName"
        from role r
        where r.role_id = ${roleId} and r.is_active = true
        `
        return Models.sequelize.query(query, {
            type: Models.sequelize.QueryTypes.SELECT
        })
        .then(data => {
            return data && _.size(data) > 0 ? _.head(data) : null;
        });
}



function _getRoleDetailsByRoleName(role) {
    const query = `
        select 
            r.role_id as "roleId",
            r.name,
            r.display_name as "displayName"
        from role r
        where r.name = '${role}' and r.is_active = true
        `
        return Models.sequelize.query(query, {
            type: Models.sequelize.QueryTypes.SELECT
        })
        .then(data => {
            return data && _.size(data) > 0 ? _.head(data) : null;
        });
}

function _throwErrorValueNotFound(value) {
    return {
        type: Error.ValueNotFound,
        details : {
            value
        }
    }
}