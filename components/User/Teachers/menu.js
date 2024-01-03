require('dotenv').config();
const locale = require('../../../locale').default;
const {send, deleteLastMSG} = require('../../Helpers/index');
const {PropertyLesson, EducationActivity, Teacher, User} = require('../../../sequelize');

module.exports = {
    function: async (ctx, bot, teacherId) => {
        try {
            const teacher = await Teacher.findByPk(teacherId, {
                include: [{
                    model: User,
                    attributes: ['firstName', 'username'],
                    as: 'id_user'
                }]
            });
            let schoolSubjects = '';
            const allLessons = await EducationActivity.findAll({
                include: [{
                    model: PropertyLesson,
                    where: {
                        isActive: true
                    },
                    include: [],
                    as: 'property_lesson'
                }],
            });
            for (const lesson of allLessons) {
                for (const subjectId of teacher.dataValues.schoolSubjects) {
                    if (subjectId === lesson.dataValues.id) {
                        schoolSubjects = schoolSubjects + `\n${lesson.dataValues.title}`
                    }
                }
            }
            await send(ctx, bot, locale.teacherMenu.emoji, []);
            await deleteLastMSG(ctx, bot, 1);
            return await send(ctx, bot, locale.teacherMenu.text(
                teacher.dataValues['id_user'].dataValues.firstName,
                teacher.dataValues['id_user'].dataValues.username,
                teacher.dataValues.experience,
                schoolSubjects,
                teacher.dataValues.heWorks
            ), [
                [{text: locale.teacherMenu.buttons.changeWork(teacher.dataValues.heWorks), callback_data: `changeWorkStatusTeacher_${teacherId}`},
                    {text: locale.teacherMenu.buttons.fired, callback_data: `confirmDeleteTeacher_${teacherId}`}],
                [{text: locale.teacherMenu.buttons.back, callback_data: `teachersList`}]
            ]);
        } catch (e) {
            console.log(e)
        }
    },
    callBack: 'teacherMenu_number',
    type: 'regEx',
    regEx: /^teacherMenu_[0-9]+$/,
    extract: 'teacherMenu_',
    isWork: true,
    file: `${__dirname}/${__filename}`
}