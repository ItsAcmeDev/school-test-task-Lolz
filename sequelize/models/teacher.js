const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('teacher', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    experience: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    schoolSubjects: {
      type: DataTypes.JSON,
      allowNull: false
    },
    heWorks: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    heFired: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'teachers',
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
    ]
  });
};
