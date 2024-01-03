DROP DATABASE IF EXISTS school_db;
CREATE DATABASE school_db
       COLLATE utf8mb4_general_ci;
create table school_db.cabinets
(
    id        int auto_increment
        primary key,
    floor     tinyint    default 1 not null,
    places    int                  not null,
    heWorks   tinyint(1) default 0 not null,
    isDeleted tinyint(1) default 0 not null
);

create table school_db.education_activities
(
    id    int auto_increment
        primary key,
    title tinytext not null
);

create table school_db.property_lessons
(
    id       int                  not null
        primary key,
    duration time                 not null,
    isActive tinyint(1) default 0 not null,
    constraint property_lessons_education_activities_id_fk
        foreign key (id) references education_activities (id)
            on update cascade on delete cascade
);

create table school_db.users
(
    id        bigint                              not null
        primary key,
    firstName tinytext                            not null,
    lastName  tinytext                            null,
    username  tinytext                            null,
    createdAt timestamp default CURRENT_TIMESTAMP not null
);

create table school_db.teachers
(
    id             bigint               not null
        primary key,
    experience     float      default 0 not null,
    schoolSubjects json                 not null,
    heWorks        tinyint(1) default 0 not null,
    heFired        tinyint(1) default 0 null,
    constraint teachers_users_id_fk
        foreign key (id) references users (id)
            on update cascade on delete cascade
);

create table school_db.time_schedule
(
    id       bigint auto_increment
        primary key,
    lesson   int                  not null,
    teacher  bigint               not null,
    cabinet  int                  not null,
    date     date                 not null,
    isActive tinyint(1) default 0 not null,
    constraint time_schedule_cabinets_id_fk
        foreign key (cabinet) references cabinets (id),
    constraint time_schedule_education_activities_id_fk
        foreign key (lesson) references education_activities (id)
            on update cascade,
    constraint time_schedule_teachers_id_fk
        foreign key (teacher) references teachers (id)
            on update cascade
);

create table school_db.user_state
(
    id     bigint   not null
        primary key,
    action tinytext null,
    param  tinytext null,
    data   text     null,
    constraint user_state_users_id_fk
        foreign key (id) references users (id)
            on update cascade on delete cascade
);
