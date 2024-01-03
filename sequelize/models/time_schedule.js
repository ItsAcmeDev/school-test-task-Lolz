const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('time_schedule', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    lesson: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'education_activities',
        key: 'id'
      }
    },
    teacher: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'teachers',
        key: 'id'
      }
    },
    cabinet: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cabinets',
        key: 'id'
      }
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'time_schedule',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "time_schedule_cabinets_id_fk",
        using: "BTREE",
        fields: [
          { name: "cabinet" },
        ]
      },
      {
        name: "time_schedule_education_activities_id_fk",
        using: "BTREE",
        fields: [
          { name: "lesson" },
        ]
      },
      {
        name: "time_schedule_teachers_id_fk",
        using: "BTREE",
        fields: [
          { name: "teacher" },
        ]
      },
    ]
  });
};
