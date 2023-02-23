import { DataTypes } from 'sequelize';
import { pgResources } from '../../context_db.js';

export const Roles = pgResources.define(
  "roles",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rol: {
      type: DataTypes.STRING(25),
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
      defaultValue: pgResources.literal("CURRENT_TIMESTAMP"),
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
    schema: "auth",
    tableName: "roles",
    timestamps: false,
  }
)