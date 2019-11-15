const _ = require('lodash');
const Op = Models.Sequelize.Op;
const Error = require('../../utils/Error');
const AccountService = require('../account/account.service');

module.exports = {
    registerInstitute
}

/////////////////////////////////PUBLIC FUNCTION /////////////////////////////////////////

async function registerInstitute(instituteDetailsToAdd) {
    let {
        name,
        address,       
        email,
        password,
        contactPersonDetails,
        phoneNumber,
    } = instituteDetailsToAdd;

    
    const accountDetailsByEmail = await AccountService.getAccountDetailsByEmailOrPhoneNumber(email);
    if(accountDetailsByEmail) {
        throw _throwValueAlreadyExistsError(`Email ${email}`);
    }
    const accountDetailsByPhoneNumber = await AccountService.getAccountDetailsByEmailOrPhoneNumber(phoneNumber);
    if(accountDetailsByPhoneNumber) {
        throw _throwValueAlreadyExistsError(`Phone Number ${phoneNumber}`);
    }

    const addedAccountDetails = await AccountService.addAccount({
        phoneNumber,
        email,
        password,
        role : 'institute'
    });

    address = _.compact(Object.values(address)).join( );
    const addedInstituteDetails = await _addInstitute({
        name, 
        address,
        email,
        phoneNumber,
        accountId: addedAccountDetails.accountId
    });

    if(contactPersonDetails && contactPersonDetails.firstName) {
        await _addInstituteContactMapping({instituteId: addedInstituteDetails.instituteId, ...contactPersonDetails});
    }
    
    return {
        instituteId: addedInstituteDetails.instituteId
    };
}



function _addInstitute(institudeDataToAdd) {
    return Models
        .Institute
        .create(institudeDataToAdd)
        .then(addedInstituteDetails => addedInstituteDetails.get({plain: true}));
}


function _addInstituteContactMapping(institudeDataToAdd) {
    return Models
        .InstituteContactMapping
        .create(institudeDataToAdd)
        .then(addedInstituteDetails => addedInstituteDetails.get({plain: true}));
}
function _throwValueAlreadyExistsError(value) {
    return {
        type: Error.ValueAlreadyExists,
        details: {
            value
        }
    }
}