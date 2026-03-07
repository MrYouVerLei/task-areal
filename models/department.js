'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    static associate(models) {
      this.hasMany(models.Employee, { foreignKey: 'department_id' });
    }
  }

  Department.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Department',
    tableName: 'departments',
    timestamps: false
  });

  return Department;
};