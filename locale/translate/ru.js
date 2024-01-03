module.exports = {
    errorMessage: {
        text: '☹️ Нам очень жаль! \nСлучилась непредвиденная ошибка, попробуйте повторить действие позже.',
    },
    IDoNotUnderstand: '☹️ Я не понимаю тебя. Воспользуйся меню, если оно пропало напиши /start',
    clearState: {
        text: `❌ Действие было отменено.`,
        buttons: {
            backToMenu: '⬅️ В главное меню'
        }
    },
    mainMenu: {
        emoji: `🔭`,
        text: (firstName) => {
            return `<b>${firstName}</b>, приветик!\n\n` +
                `Ну что, давай поучимся? Используй меню ниже для управления:`
        },
        buttons: {
            teachers: '👨‍🏫 Педагогический состав',
            lessons: '📚 Предметы',
            cabinets: '💼 Кабинеты',
            schedule: '🌈 Расписание',
        }
    },
    // Lessons
    allLessons: {
        emoji: '📚',
        text: (countLesson) => {
            return `Сейчас в нашей школе доступно ${countLesson} предмет(а/ов)\n\n`
        },
        buttons: {
            add: '➕ Добавить предмет',
            back: '⬅️ Назад',
            noData: '👀 Похоже, что тут пусто ...'
        }
    },
    addLesson: {
        emoji: '📝',
        text: 'Сейчас ты добавишь новый предмет в нашу школу\n| 1) Введи название предмета:',
        buttons: {
          cancel: '❌ Отменить'
        },
        handlerOne: {
            alreadyExist: 'Упс.. Такой предмет уже есть в нашей школе, попробуй добавить другой',
            text: (title) => {
                return `Сейчас ты добавишь новый предмет в нашу школу\n` +
                    `| 1) ${title}\n` +
                    `| 2) Введи длительность урока в формате чч:мм:сс :`
            }
        },
        handlerTwo: {
            errorData: 'Введи длительность урока в формате чч:мм:сс\n\nПример:\n' +
                '<i>| 0:40:12 — 40 минут, 12 секунд</i>',
            emoji: '✅',
            text: 'Урок успешно добавлен в нашу школу',
            buttons: {
                back: '⬅️ Назад'
            }
        }
    },
    lessonMenu: {
        emoji: '📖',
        text: (lessonName, lessonDuration) => {
            return `Урок <b>${lessonName}</b>\n` +
                `Продолжительность: <b>${lessonDuration}</b>\n` +
                `<i>| Время приведенно в формате ЧЧ:ММ:СС</i>`
        },
        buttons: {
            delete: '🗑️ Удалить',
            editDuration: '⌛ Изменить продолжительность',
            back: '⬅️ Назад'
        }
    },
    editLessonDuration: {
        emoji: '⌛',
        text: 'Хорошо, введи время в формате чч:мм:сс :',
        buttons: {
            cancel: '❌ Отменить'
        },
        handlerTwo: {
            errorData: 'Введи длительность урока в формате чч:мм:сс\n\nПример:\n' +
                '<i>| 0:40:12 — 40 минут, 12 секунд</i>',
            emoji: '✅',
            text: 'Продолжительность урока успешно изменена!',
            buttons: {
                back: '⬅️ Назад'
            }
        }
    },
    deleteLesson: {
        emoji: '❌',
        text: 'Ты точно уверен, что хочешь удалить предмет?',
        buttons: {
            yes: '❌ Да',
            no: '✅ Нет',
            back: '⬅️ Назад'
        },
        lessonDeleted: (lessonName) => {
            return `Урок ${lessonName} был удалён 😒`
        }
    },
    // Cabinets
    allCabinets: {
        emoji: '🏠',
        text: (countCabinets) => {
            return `Сейчас в нашей школе ${countCabinets} кабинет(а/ов)\n\n`
        },
        buttons: {
            cabinet: (id, places, floor) => {return `Кабинет №${id} | ${places} мест(а) |  ${floor}й этаж`},
            add: '➕ Добавить кабинет',
            back: '⬅️ Назад',
            noData: '👀 Похоже, что тут пусто ...'
        }
    },
    addCabinet: {
        emoji: '📝',
        text: 'Сейчас ты добавишь новый кабинет:\n' +
            '| 1) Введи номер кабинета:',
        buttons: {
            cancel: '❌ Отменить'
        },
        handlerOne: {
            emoji: '📝',
            text: (number) => {
                return 'Сейчас ты добавишь новый кабинет:\n' +
                    `| 1) ${number}\n` +
                    '| 2) Введи этаж, на котором находится кабинет:'
            },
            cabinetAlreadyExist: 'Упс.. Кабинет с таким номером уже существует..',
            notNumber: 'Введите число обозначающию номер кабинета!',
            notMinus: 'Счисление начинается с 0, номер кабинета не может быть отрицательным!',
        },
        handlerTwo: {
            emoji: '📝',
            text: (number, floor) => {
                return 'Сейчас ты добавишь новый кабинет:\n' +
                    `| 1) ${number}\n` +
                    `| 2) ${floor}\n` +
                    '| 3) Введи вместимость кабинета:\n' +
                    '<i>// 1 место — 1 ученик</i>'
            },
            floorNotFound: 'Упс.. Такого этажа нет! В нашей школе только 10 этажей, включая цокальный.',
            notNumber: 'Введите цифру обозначающию этаж! От 0 до 10:',
            notMinus: 'Этаж не может быть отрицательным!',
        },
        handlerThree: {
            emoji: '✅',
            text: 'Кабинет успешно добавлен!',
            notNumber: 'Введите цифру обозначающию количество мест!',
            notMinus: 'Количество мест не может быть отрицательным!',
            buttons: {
                goToCabinet: 'Перейти к кабинету'
            }
        }
    },
    cabinetMenu: {
        emoji: '🏛',
        text: (id, floor, places, status) => {
            return `Кабинет <b>№${id}</b>\n` +
                `Этаж: <b>${floor}й</b>\n` +
                `Вместимость: <b>${places} ученик(а/ов)</b>\n\n` +
                `${status === true ? '✅ Кабинет работает' : '❌ Кабинет не работает'}`
        },
        buttons: {
            delete: '🗑️ Удалить кабинет',
            changePlaces: '🪑 Изменить кол-во мест',
            changeWork: (status) => {return status === false ? '✅ Открыть кабинет' : '❌ Закрыть кабинет'},
            back: '⬅️ Назад'
        }
    },
    deleteCabinet: {
        emoji: '❌',
        text: 'Ты точно уверен, что хочешь удалить этот кабинет?',
        buttons: {
            yes: '❌ Да',
            no: '✅ Нет',
            back: '⬅️ Назад'
        },
        cabinetDeleted: (cabinetNumber) => {
            return `Кабинет №${cabinetNumber} был удалён 😒`
        }
    },
    changeCabinetPlaces: {
        emoji: '🧮',
        text: 'Окей, введи новое кол-во мест в кабинете:',
        buttons: {
            cancel: '❌ Отмена'
        },
        handler: {
            emoji: '✅',
            text: 'Кол-во мест изменено!',
            notNumber: 'Введите цифру обозначающию количество мест!',
            notMinus: 'Количество мест не может быть отрицательным!',
            buttons: {
                goToCabinet: 'Перейти к кабинету'
            }
        }
    },
    // Teachers
    allTeachers: {
        emoji: '👨‍🏫',
        text: (countTeachers) => {
            return `Сейчас в нашей школе ${countTeachers} учител(ь/я/ей)\n\n`
        },
        buttons: {
            add: '➕ Добавить учителя',
            back: '⬅️ Назад',
            noData: '👀 Похоже, что тут пусто ...'
        }
    },
    addTeacher: {
        emoji: '👨‍⚕️',
        text: 'Сейчас мы добавим нового учителя в нашу школу!\n' +
            '| 1) Введи айди учителя:',
        buttons: {
            cancel: '❌ Отмена'
        },
        handlerOne: {
            errorEmoji: '❌',
            notFound: 'В нашей базе нет такого человека!',
            notNumber: 'Id состоит только из цифр!',
            teacherAlreadyExist: 'Учитель уже добавлен в нашу базу данных. Попробуй другого:',
            text: (id) => {
                return 'Сейчас мы добавим нового учителя в нашу школу!\n' +
                    `| 1) ${id}\n` +
                    `| 2) Введи опыт учителя:`
            }
        },
        handlerTwo: {
            errorEmoji: '❌',
            notNumber: 'Опыт счисляется в годах, а годы состоят из цифр!',
            text: (id, experience) => {
                return 'Сейчас мы добавим нового учителя в нашу школу!\n' +
                    `| 1) ${id}\n` +
                    `| 2) ${experience}\n` +
                    `| 3) Отметьте снизу те предметы, которые способен вести учитель:`
            },
            buttons: {
                next: 'Продолжить ➡️'
            }
        },
        handlerThree: {
            text: 'Учитель успешно добавлен!',
            buttons: {
                back: '⬅️ Назад'
            }
        }
    },
    teacherMenu: {
        emoji: '🎓',
        text: (firstName, username, experience, schoolSubjects, work) => {
            return `Учитель <b>${firstName}</b>\n\n` +
                `Username: <b>@${username}</b>\n` +
                `⌛ Опыт работы: <b>${experience} год(а)/лет</b>\n` +
                `Сейчас: <b>${work === true ? '✅ Работает' : '❌ Не работает'}</b>\n\n` +
                `Специализация:<b>${schoolSubjects}</b>`
        },
        buttons: {
            fired: '💼 Уволить',
            changeWork: (work) => work === false ? '✅ Вызвать в школу' : '❌ Отпустить',
            back: '⬅️ Назад'
        }
    },
    deleteTeacher: {
        emoji: '❌',
        text: 'Ты точно уверен, что хочешь уволить этого учителя?',
        buttons: {
            yes: '❌ Да',
            no: '✅ Нет',
            back: '⬅️ Назад'
        },
        teacherDeleted: (firstName) => {
            return `Учитель ${firstName} был уволен 😒`
        }
    },
    // All schedule
    allSchedule: {
        emoji: '🌞',
        text: 'Рассписание на сегодня:',
        buttons: {
            cell: (cabinetId, lessonTitle, teacherName)=> {return `№${cabinetId} | ${lessonTitle} | ${teacherName}`},
            add: '➕ Добавить предмет в рассписание',
            back: '⬅️ Назад',
            noData: '👀 Похоже, что тут пусто ...'
        }
    },
    addSchedule: {
        emoji: '🦊',
        text: 'Сейчас добавим новый урок в рассписание\n' +
            '| 1) Выбери предмет:',
        buttons: {
            noData: '👀 Похоже, что в нашей школе пока нет предметов',
            cancel: '❌ Отменить'
        },
        handlerOne: {
            text: (lesson) => {
                return 'Сейчас добавим новый урок в рассписание\n' +
                    `| 1) Предмет: <b>${lesson}</b>\n` +
                    '| 2) Выбери учителя, который будет проводить урок:'
            }
        },
        handlerTwo: {
            text: (lesson, teacherName) => {
                return 'Сейчас добавим новый урок в рассписание\n' +
                    `| 1) Предмет: <b>${lesson}</b>\n` +
                    `| 2) Учитель: <b>${teacherName}</b>\n` +
                    '| 3) Выбери кабинет, в котором будет проходить урок:'
            }
        },
        handlerThree: {
            emoji: '☃️',
            text: 'Ты успешно добавил предмет в расписание!',
            buttons: {
                back: '⬅️ Назад'
            }
        }
    },
    scheduleMenu: {
        emoji: '🌤',
        text: (lessonName, lessonDuration, cabinetId, cabinetFloor, cabinetPlaces, teacherName) => {
            return `Урок <b>${lessonName}</b>\n` +
                `Длительность урока: ${lessonDuration}\n\n` +
                `Кабинет <b>№${cabinetId}</b>\n` +
                `Этаж: <b>${cabinetFloor}</b>\n` +
                `Мест: <b>${cabinetPlaces}</b>\n\n` +
                `Урок проводит <b>${teacherName}</b>`
        },
        buttons: {
            delete: '🗑️ Удалить предмет из расписания',
            back: '⬅️ Назад'
        }
    },
    deleteSchedule: {
        emoji: '❌',
        text: 'Ты точно уверен, что хочешь уволить этот предмет из расписания?',
        buttons: {
            yes: '❌ Да',
            no: '✅ Нет',
            back: '⬅️ Назад'
        },
        scheduleDeleted: `Предмет был удалён из расписания 😒`
    },
}