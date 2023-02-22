import { DataTypes } from "sequelize";
import { pgResources } from "../../resources_db.js";

export const Countries = pgResources.define(
  "countries",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    country: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    phoneid: {
      type: DataTypes.STRING(4),
      allowNull: false,
    },
    flag: {
      type: DataTypes.BLOB,
      allowNull: true,
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
    schema: "catalogs",
    tableName: "countries",
    timestamps: false,
  }
);
