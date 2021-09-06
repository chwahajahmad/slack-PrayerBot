export { };
const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db.conn');

const weekly_prayer_data = db.define(
  'weekly_prayer_data',
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fiqah: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  },
);
module.exports = weekly_prayer_data;