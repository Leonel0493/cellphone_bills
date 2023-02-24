import { Sequelize } from "sequelize";

export const pgResources = new Sequelize('resources', 'postgres', 'K@therin3_24', {
  host: 'localhost',
  dialect: 'postgres'
});

export const pgCellphoneBills = new Sequelize('cellphonebills', 'postgres', 'K@therin3_24', {
  host: 'localhost',
  dialect: 'postgres'
});