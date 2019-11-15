
const _ = require('lodash');
const Op = Models.Sequelize.Op;
const RoleService = require('../role/role.service');
const StreamService = require('../stream/stream.service');
const CourseService = require('../course/course.service');

module.exports = {
    getMobileSettings
}


async function getMobileSettings() {
    const result = await _getMobileSettings();
    return result;
}

async function _getMobileSettings() {

    return {
        roleList: await RoleService.getRoleList(),
        streamList: await StreamService.getStreamList(),
        courseList: await CourseService.getSubjectAndChapterWiseCourseList()
    }
}