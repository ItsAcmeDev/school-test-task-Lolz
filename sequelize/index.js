const DataTypes = require('sequelize').DataTypes;
const {Sequelize} = require('sequelize');
require('dotenv').config();

// Sequelize
const sequelize = new Sequelize(process.env.DBNAME, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    logging: false
})

// Sequelize options
const params = [sequelize, DataTypes];

// Sequelize Pagination
const withPagination = require("sequelize-pagination");

// Sequelize pagination options
const options = {
    methodName: 'paginate',
    primaryKey: 'id',
    oneBaseIndex: true,
};

// Models
const User = require('./models/user')(...params);
const User_state = require('./models/user_state')(...params);
const Cabinet = require('./models/cabinet')(...params)
const Teacher = require('./models/teacher')(...params)
const TimeSchedule = require('./models/time_schedule')(...params)
const EducationActivity = require('./models/education_activity')(...params)
const PropertyLesson = require('./models/property_lesson')(...params)

// Pagination
withPagination(options)(Cabinet);
withPagination(options)(Teacher);
withPagination(options)(TimeSchedule);
withPagination(options)(EducationActivity);

// Foreign Keys
TimeSchedule.belongsTo(Cabinet, { as: "cabinet_cabinet", foreignKey: "cabinet"});
Cabinet.hasMany(TimeSchedule, { as: "time_schedules", foreignKey: "cabinet"});
PropertyLesson.belongsTo(EducationActivity, { as: "id_education_activity", foreignKey: "id"});
EducationActivity.hasOne(PropertyLesson, { as: "property_lesson", foreignKey: "id"});
TimeSchedule.belongsTo(EducationActivity, { as: "lesson_education_activity", foreignKey: "lesson"});
EducationActivity.hasMany(TimeSchedule, { as: "time_schedules", foreignKey: "lesson"});
TimeSchedule.belongsTo(Teacher, { as: "teacher_teacher", foreignKey: "teacher"});
Teacher.hasMany(TimeSchedule, { as: "time_schedules", foreignKey: "teacher"});
Teacher.belongsTo(User, { as: "id_user", foreignKey: "id"});
User.hasOne(Teacher, { as: "teacher", foreignKey: "id"});
User_state.belongsTo(User, { as: "id_user", foreignKey: "id"});
User.hasOne(User_state, { as: "user_state", foreignKey: "id"});

// Export Models
module.exports = {
    User_state,
    User,
    PropertyLesson,
    Cabinet,
    Teacher,
    TimeSchedule,
    EducationActivity
}