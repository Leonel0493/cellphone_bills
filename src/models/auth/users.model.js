import { DataTypes } from "sequelize";
import { pgResources } from "../../context_db.js";

export const Users = pgResources.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_name: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(260),
      allowNull: false,
    },
    id_employee: {
      type: DataTypes.INTEGER,
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
    tableName: "users",
    timestamps: false,
  }
)