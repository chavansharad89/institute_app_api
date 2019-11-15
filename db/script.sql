DROP DATABASE if exists institute_app;
CREATE DATABASE institute_app;


DROP TABLE IF EXISTS role;
CREATE TABLE role(
    role_id                      INT         AUTO_INCREMENT          PRIMARY KEY,
    name                            VARCHAR(255)                    NOT NULL,
    display_name                    VARCHAR(255)                    NOT NULL,
    is_active                       INT                             NOT NULL        DEFAULT true,
    created_at                      DATETIME                        NOT NULL,
    updated_at                      DATETIME                                        DEFAULT now()
);


Insert into role (name, display_name, created_at) values ( 'admin', 'Admin', now()),
('institute', 'Institute', now()),('student', 'Student', now()); 

DROP TABLE IF EXISTS account;
CREATE TABLE account(
    account_id                      INT         AUTO_INCREMENT          PRIMARY KEY,
    phone_number                    VARCHAR(255),
    email                           VARCHAR(255),
    password                        VARCHAR(255)                        NOT NULL,
    role_id                         INT                             NOT NULL,
    is_active                       INT                             NOT NULL        DEFAULT true,
    created_at                      DATETIME                        NOT NULL,
    updated_at                      DATETIME                                        DEFAULT now(),
    CONSTRAINT account_role_id_fkey FOREIGN KEY (role_id)
    REFERENCES role (role_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
);

INSERT INTO account (phone_number, email, password, role_id, created_at) values 
('1234567890', 'admin@rajsir.com', '$2a$10$IyFok3BypwEfaQ/14qOf1OjMJV0QHd6k5ZzDumxcgHqa8kEmNoEne', 1, now());

DROP TABLE IF EXISTS jwt;
CREATE TABLE jwt (
    jwt_id                          INT         AUTO_INCREMENT   PRIMARY KEY,
    account_id                      INT                             NOT NULL,
    token                           TEXT                            NOT NULL,
    revoked                         BOOLEAN                         NOT NULL    DEFAULT FALSE,
    created_at                      DATETIME                        NOT NULL,
    updated_at                      DATETIME                                    DEFAULT now(),
    CONSTRAINT jwt_account_id_fkey FOREIGN KEY (account_id)
    REFERENCES account (account_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
);

DROP TABLE IF EXISTS level;
CREATE TABLE level (
    level_id                        INT         AUTO_INCREMENT      PRIMARY KEY,
    name                            VARCHAR(255)                        NOT NULL,
    display_name                    VARCHAR(255)                     NOT NULL,
    created_at                      DATETIME                        NOT NULL DEFAULT now(),
    updated_at                      DATETIME 
);


INSERT INTO level (name, display_name) values ('primary', 'Primary (1st To 4th)'),
('secondary', 'Secondary (5th To 10th)'), 
('higher-secondary', 'Higher Secondary (11th / 12th)'),
('graduation', 'Graduation');

DROP TABLE IF EXISTS course;
CREATE TABLE course (
    course_id                   INT         AUTO_INCREMENT      PRIMARY KEY,
    name                        VARCHAR(255)                             NOT NULL,
    display_name                VARCHAR(255)                        NOT NULL,
    is_deleted                  BOOLEAN                             NOT NULL     DEFAULT FALSE,
    created_at                  DATETIME                            NOT NULL     DEFAULT now(),
    updated_at                  DATETIME          
);

INSERT INTO course (name, display_name) values ('1','1st Standard'), ('2','2nd Standard'),('3','3rd Standard'),
('4','4th Standard'),('5','5th Standard'),('6','6th Standard'),('7','7th Standard'),('8','8th Standard'),
('9','9th Standard'),('10','10th Standard'), ('11','11th Standard'),('12','12th Standard');



DROP TABLE stream if exits;
CREATE TABLE stream (
    stream_id                       INT          AUTO_INCREMENT              PRIMARY KEY,
    name                            VARCHAR(255)                 NOT NULL,
    display_name                    VARCHAR(255)                 NOT NULL,
    is_deleted                      BOOLEAN                      NOT NULL   DEFAULT false,
    created_at                      DATETIME                     NOT NULL,
    updated_at                      DATETIME                                DEFAULT now()
);

INSERT INTO stream (name, display_name, created_at) values ('science', 'Science', now()), ('arts', 'Arts', now()), ('commerce', 'Commerce', now());

DROP TABLE IF EXISTS subject;
CREATE TABLE subject (
    subject_id                  INT         AUTO_INCREMENT      PRIMARY KEY,
    name                        VARCHAR(255)                        NOT NULL,
    display_name                VARCHAR(255)                        NOT NULL,
    stream_id                   INT,
    course_id                   INT                                 NOT NULL,
    is_deleted                  BOOLEAN                             NOT NULL     DEFAULT FALSE,
    created_at                  DATETIME                            NOT NULL,
    updated_at                  DATETIME                                         DEFAULT now(),
    CONSTRAINT subject_course_id_fkey FOREIGN KEY (course_id)
    REFERENCES course (course_id) MATCH SIMPLE
    ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT subject_stream_id_fkey FOREIGN KEY (stream_id)
    REFERENCES stream (stream_id) MATCH SIMPLE
    ON UPDATE NO ACTION ON DELETE NO ACTION
);



INSERT INTO subject (name, display_name, stream_id, course_id, is_deleted, created_at)
select 'Mathematics and statistics 1' as name, 'Mathematics and statistics 1' as display_name,
( select stream_id from stream where name = 'science'), ( select course_id from course where name = '11') as court_id, false , now();


INSERT INTO subject (name, display_name, stream_id, course_id, is_deleted, created_at)
select 'Mathematics and statistics 2' as name, 'Mathematics and statistics 2' as display_name,
( select stream_id from stream where name = 'science'), ( select course_id from course where name = '11') as court_id, false , now();


INSERT INTO subject (name, display_name, stream_id, course_id, is_deleted, created_at)
select 'Physics' as name, 'Physics' as display_name,
( select stream_id from stream where name = 'science'), ( select course_id from course where name = '11') as court_id, false , now();


INSERT INTO subject (name, display_name, stream_id, course_id, is_deleted, created_at)
select 'Chemistry' as name, 'Chemistry' as display_name,
( select stream_id from stream where name = 'science'), ( select course_id from course where name = '11') as court_id, false , now();


INSERT INTO subject (name, display_name, stream_id, course_id, is_deleted, created_at)
select 'Biology' as name, 'Biology' as display_name,
( select stream_id from stream where name = 'science'), ( select course_id from course where name = '11') as court_id, false , now();


INSERT INTO subject (name, display_name, stream_id, course_id, is_deleted, created_at)
select 'Biology 2' as name, 'Biology 2' as display_name,
( select stream_id from stream where name = 'science'), ( select course_id from course where name = '11') as court_id, false , now();


INSERT INTO subject (name, display_name, stream_id, course_id, is_deleted, created_at)
select 'Information Teachnology' as name, 'Information Teachnology' as display_name,
( select stream_id from stream where name = 'science'), ( select course_id from course where name = '11') as court_id, false , now();


INSERT INTO subject (name, display_name, stream_id, course_id, is_deleted, created_at)
select 'Agriculture Science and Technology' as name, 'Mathematics and statistics 1' as display_name,
( select stream_id from stream where name = 'science'), ( select course_id from course where name = '11') as court_id, false , now();


INSERT INTO subject (name, display_name, stream_id, course_id, is_deleted, created_at)
select 'Animal Science and Technology' as name, 'Mathematics and statistics 1' as display_name,
( select stream_id from stream where name = 'science'), ( select course_id from course where name = '11') as court_id, false , now();


INSERT INTO subject (name, display_name, stream_id, course_id, is_deleted, created_at)
select 'History' as name, 'History' as display_name,
( select stream_id from stream where name = 'arts'), ( select course_id from course where name = '11') as court_id, false , now();


INSERT INTO subject (name, display_name, stream_id, course_id, is_deleted, created_at)
select 'Geography' as name, 'Geography' as display_name,
( select stream_id from stream where name = 'arts'), ( select course_id from course where name = '11') as court_id, false , now();


INSERT INTO subject (name, display_name, stream_id, course_id, is_deleted, created_at)
select 'Mathematics and statistics 1' as name, 'Mathematics and statistics 1' as display_name,
( select stream_id from stream where name = 'arts'), ( select course_id from course where name = '11') as court_id, false , now();


INSERT INTO subject (name, display_name, stream_id, course_id, is_deleted, created_at)
select 'Mathematics and statistics 2' as name, 'Mathematics and statistics 2' as display_name,
( select stream_id from stream where name = 'arts'), ( select course_id from course where name = '11') as court_id, false , now();


INSERT INTO subject (name, display_name, stream_id, course_id, is_deleted, created_at)
select 'Geology 1' as name, 'Geology 1' as display_name,
( select stream_id from stream where name = 'arts'), ( select course_id from course where name = '11') as court_id, false , now();


INSERT INTO subject (name, display_name, stream_id, course_id, is_deleted, created_at)
select 'Geology 2' as name, 'Geology 2' as display_name,
( select stream_id from stream where name = 'arts'), ( select course_id from course where name = '11') as court_id, false , now();


INSERT INTO subject (name, display_name, stream_id, course_id, is_deleted, created_at)
select 'Political Science' as name, 'Political Science' as display_name,
( select stream_id from stream where name = 'arts'), ( select course_id from course where name = '11') as court_id, false , now();


INSERT INTO subject (name, display_name, stream_id, course_id, is_deleted, created_at)
select 'Child Development' as name, 'Child Development' as display_name,
( select stream_id from stream where name = 'arts'), ( select course_id from course where name = '11') as court_id, false , now();


INSERT INTO subject (name, display_name, stream_id, course_id, is_deleted, created_at)
select 'Textiles' as name, 'Textiles' as display_name,
( select stream_id from stream where name = 'arts'), ( select course_id from course where name = '11') as court_id, false , now();


INSERT INTO subject (name, display_name, stream_id, course_id, is_deleted, created_at)
select 'Sociology' as name, 'Sociology' as display_name,
( select stream_id from stream where name = 'arts'), ( select course_id from course where name = '11') as court_id, false , now();


INSERT INTO subject (name, display_name, stream_id, course_id, is_deleted, created_at)
select 'Philosophy' as name, 'Philosophy' as display_name,
( select stream_id from stream where name = 'arts'), ( select course_id from course where name = '11') as court_id, false , now();


INSERT INTO subject (name, display_name, stream_id, course_id, is_deleted, created_at)
select 'Logic' as name, 'Logic' as display_name,
( select stream_id from stream where name = 'arts'), ( select course_id from course where name = '11') as court_id, false , now();


INSERT INTO subject (name, display_name, stream_id, course_id, is_deleted, created_at)
select 'Psychology' as name, 'Psychology' as display_name,
( select stream_id from stream where name = 'arts'), ( select course_id from course where name = '11') as court_id, false , now();


INSERT INTO subject (name, display_name, stream_id, course_id, is_deleted, created_at)
select 'Information Technology' as name, 'Information Technology' as display_name,
( select stream_id from stream where name = 'arts'), ( select course_id from course where name = '11') as court_id, false , now();


INSERT INTO subject (name, display_name, stream_id, course_id, is_deleted, created_at)
select 'Economics 1' as name, 'Economics 1' as display_name,
( select stream_id from stream where name = 'commerce'), ( select course_id from course where name = '11') as court_id, false , now();

INSERT INTO subject (name, display_name, stream_id, course_id, is_deleted, created_at)
select 'Economics 2' as name, 'Economics 2' as display_name,
( select stream_id from stream where name = 'commerce'), ( select course_id from course where name = '11') as court_id, false , now();

INSERT INTO subject (name, display_name, stream_id, course_id, is_deleted, created_at)
select 'Book-Keeping and Accountancy' as name, 'Book-Keeping and  Accountancy' as display_name,
( select stream_id from stream where name = 'commerce'), ( select course_id from course where name = '11') as court_id, false , now();

INSERT INTO subject (name, display_name, stream_id, course_id, is_deleted, created_at)
select 'Organization of Commerce and Management' as name, 'Organization of Commerce and Management' as display_name,
( select stream_id from stream where name = 'commerce'), ( select course_id from course where name = '11') as court_id, false , now();

INSERT INTO subject (name, display_name, stream_id, course_id, is_deleted, created_at)
select 'Secretarial Practice' as name, 'Secretarial Practice' as display_name,
( select stream_id from stream where name = 'commerce'), ( select course_id from course where name = '11') as court_id, false , now();



INSERT INTO subject (name, display_name, stream_id, course_id, is_deleted, created_at)
select 'Co–operation' as name, 'Co–operation' as display_name,
( select stream_id from stream where name = 'commerce'), ( select course_id from course where name = '11') as court_id, false , now();


INSERT INTO subject (name, display_name, stream_id, course_id, is_deleted, created_at)
select 'Information Technology' as name, 'Information Technology' as display_name,
( select stream_id from stream where name = 'commerce'), ( select course_id from course where name = '11') as court_id, false , now();


DROP TABLE IF EXISTS chapter;
CREATE TABLE chapter (
    chapter_id                  INT         AUTO_INCREMENT      PRIMARY KEY,
    name                        VARCHAR(255)                             NOT NULL,
    subject_id                  INT                                 NOT NULL,
    is_deleted                  BOOLEAN                             NOT NULL     DEFAULT FALSE,
    created_at                  DATETIME            NOT NULL,
    updated_at                  DATETIME                                         DEFAULT now(),
    CONSTRAINT chapter_subject_id_fkey FOREIGN KEY (subject_id)
    REFERENCES subject (subject_id) MATCH SIMPLE
    ON UPDATE NO ACTION ON DELETE NO ACTION
);

INSERT INTO chapter (name, subject_id, created_at) values('Limits', 1, now()):

DROP TABLE IF EXISTS address;
CREATE TABLE address (
    address_id                   INT        AUTO_INCREMENT      PRIMARY KEY,
    address_line_1               VARCHAR(255)                   NOT NULL,
    address_line_2               VARCHAR(255),
    landmark                     VARCHAR(255),
    city_name                    VARCHAR(255)                   NOT NULL,
    state_name                   VARCHAR(255)                   NOT NULL,
    country_name                 VARCHAR(255)                   NOT NULL,
    is_active                    BOOLEAN                        NOT NULL        DEFAULT true,
    zip_code                     VARCHAR(10),
    created_at                  DATETIME            NOT NULL,
    updated_at                  DATETIME                                    DEFAULT now()
);


DROP TABLE IF EXISTS contact;
CREATE TABLE contact (
    contact_id                      INT      AUTO_INCREMENT              PRIMARY KEY,
    primary_number                  VARCHAR(12)                      NOT NULL,
    secondary_number                VARCHAR(12),
    is_deleted                      BOOLEAN                         NOT NULL    DEFAULT FALSE,
    created_at                      DATETIME            NOT NULL,
    updated_at                      DATETIME                                    DEFAULT now()
);



DROP TABLE IF EXISTS institute;
CREATE TABLE institute (
    institute_id                          INT       AUTO_INCREMENT      PRIMARY KEY,
    name                                  VARCHAR(255)           NOT NULL,
    email                                 VARCHAR(255),
    phone_number                          VARCHAR(25),
    address                               TEXT,
    account_id                            INT                 NOT NULL,
    is_active                            BOOLEAN             NOT NULL     DEFAULT true,
    created_at                            DATETIME            NOT NULL,
    updated_at                            DATETIME                      ,
    CONSTRAINT institute_account_id_fkey FOREIGN KEY (account_id)
    REFERENCES account (account_id) MATCH SIMPLE
    ON UPDATE NO ACTION ON DELETE NO ACTION
);


DROP TABLE IF EXISTS institute_contact_mapping;
CREATE TABLE institute_contact_mapping (
    institute_contact_mapping_id          INT       AUTO_INCREMENT      PRIMARY KEY,
    institute_id                          INT,
    first_name                            VARCHAR(255)             NOT NULL,
    last_name                             VARCHAR(255)               NOT NULL,
    phone_number                          VARCHAR(25),
    is_active                            BOOLEAN             NOT NULL     DEFAULT true,
    created_at                            DATETIME            NOT NULL,
    updated_at                            DATETIME  ,
    CONSTRAINT institutecontact_mapping_institute_id_fkey FOREIGN KEY (institute_id)
    REFERENCES institute (institute_id) MATCH SIMPLE
    ON UPDATE NO ACTION ON DELETE NO ACTION
);


ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';


DROP TABLE IF EXISTS student;
CREATE TABLE student (
    student_id                      INT AUTO_INCREMENT      PRIMARY KEY,
    first_name                      VARCHAR(255)                    NOT NULL,
    account_id                      INT                             NOT NULL,
    last_name                       VARCHAR(255)                    NOT NULL,
    course_id                       INT                             NOT NULL,
    phone_number                    VARCHAR(25)                     NOT NULL,
    address                         TEXT                         ,
    is_active                       BOOLEAN                         NOT NULL DEFAULT true,
    created_at                      DATETIME            NOT NULL,
    updated_at                      DATETIME                                    DEFAULT now(),
    CONSTRAINT student_course_id_fkey FOREIGN KEY (course_id)
    REFERENCES course (course_id) MATCH SIMPLE
    ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT student_account_id_fkey FOREIGN KEY (account_id)
    REFERENCES account (account_id) MATCH SIMPLE
    ON UPDATE NO ACTION ON DELETE NO ACTION
);

DROP TABLE IF EXISTS student_parent_mapping;
CREATE TABLE student_parent_mapping (
    student_parent_mapping_id       INT AUTO_INCREMENT      PRIMARY KEY,
    student_id                      INT                             NOT NULL,
    first_name                      VARCHAR(255)                    NOT NULL,
    last_name                       VARCHAR(255)                    NOT NULL,
    phone_number                    VARCHAR(25)                     NOT NULL,
    is_active                       BOOLEAN                         NOT NULL DEFAULT true,
    created_at                      DATETIME            NOT NULL,
    updated_at                      DATETIME                                    DEFAULT now(),
    CONSTRAINT student_parent_mapping_student_id_fkey FOREIGN KEY (student_id)
    REFERENCES student (student_id) MATCH SIMPLE
    ON UPDATE NO ACTION ON DELETE NO ACTION
);


DROP TABLE IF EXISTS session;
CREATE TABLE session (
    session_id                      INT AUTO_INCREMENT              PRIMARY KEY,
    name                            VARCHAR(255)                    NOT NULL,
    start_time                      DATETIME                        NOT NULL,
    end_time                        DATETIME                        NOT NULL,
    course_id                        INT                             NOT NULL,
    subject_id                      INT                             NOT NULL,
    chapter_id                      INT                             NOT NULL,
    description                     TEXT                           ,
    account_id                      INT                             NOT NULL,
    is_active                       BOOLEAN                         NOT NULL DEFAULT true,
    created_at                      DATETIME            NOT NULL,
    updated_at                      DATETIME                                    DEFAULT now(),
    CONSTRAINT session_account_id_fkey FOREIGN KEY (account_id)
    REFERENCES account (account_id) MATCH SIMPLE
    ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT session_subject_id_fkey FOREIGN KEY (subject_id)
    REFERENCES subject(subject_id) MATCH SIMPLE
    ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT session_chapter_id_fkey FOREIGN KEY (chapter_id)
    REFERENCES chapter(chapter_id) MATCH SIMPLE
    ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT session_course_id_fkey FOREIGN KEY (course_id)
    REFERENCES course(course_id) MATCH SIMPLE
    ON UPDATE NO ACTION ON DELETE NO ACTION

);