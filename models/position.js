'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Position extends Model {
    static associate(models) {
      this.hasMany(models.Employee, { foreignKey: 'position_id' });
    }
  }

  Position.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Position',
    tableName: 'positions',
    timestamps: false
  });

  return Position;
};