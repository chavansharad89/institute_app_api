module.exports = load;

function load(app, express) {
    //Account
    app.use('/mobile', require('../components/account').mobileRoutes(express));

    //Setting
    app.use('/mobile/settings', require('../components/setting').mobileRoutes(express));

    //Student
    app.use('/mobile/student', require('../components/student').mobileRoutes(express));
    
    //Institute
    app.use('/mobile/institute', require('../components/institute').mobileRoutes(express));

    //Session
    app.use('/mobile/session', require('../components/session').mobileRoutes(express));

    //Chapter
    app.use('/mobile/chapter', require('../components/chapter').mobileRoutes(express));

    //Subject
    app.use('/mobile/subject', require('../components/subject').mobileRoutes(express));
    
    //Course
    app.use('/mobile/course', require('../components/course').mobileRoutes(express));

    //Stream
    app.use('/mobile/stream', require('../components/stream').mobileRoutes(express));
}