import {DataTypes} from 'sequelize';
import { pgCellphoneBills } from '../../context_db.js';

export const Brands = pgCellphoneBills.define(
  'cellphone_brands',
  {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    brand:{
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    created_by: {
      type: DataTypes.STRING(25),
      allowNull: false,
      defaultValue: "system",
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: pgCellphoneBills.literal("CURRENT_TIMESTAMP"),
    },
    modified_by: {
      type: DataTypes.STRING(25),
      allowNull: true,
    },
    modified_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    schema: "catalogs",
    tableName: "cellphone_brands",
    timestamps: false,
  }
)