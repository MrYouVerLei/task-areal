'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Department, { foreignKey: 'department_id' });
      this.belongsTo(models.Position, { foreignKey: 'position_id' });
    }
  }
  Employee.init({
    last_name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    first_name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    patronymic: {
      allowNull: false,
      type: DataTypes.STRING
    },
    birth_date: {
      allowNull: false,
      type: DataTypes.DATEONLY
    },
    passport: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    phone: {
      allowNull: false,
      type: DataTypes.STRING
    },
    address: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    salary: {
      allowNull: false,
      type: DataTypes.DECIMAL
    },
    hire_date: {
      allowNull: false,
      type: DataTypes.DATEONLY
    },
    is_working: {
      allowNull: false,
      defaultValue: true,
      type: DataTypes.BOOLEAN
    },
    department_id: DataTypes.INTEGER,
    position_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Employee',
    tableName: 'employees',
    timestamps: false
  });
  return Employee;
};