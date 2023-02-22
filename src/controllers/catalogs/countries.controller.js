import { Countries } from '../../models/catalogs/countries.model.js'

export const GetAll = async (req, res) => {
  console.log('Hola')
  const countries = await Countries.findAll();
  console.log("countries");
  res.json(countries);
} 