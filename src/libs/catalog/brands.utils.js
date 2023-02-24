import { Brands } from "../../models/catalog/brand.model.js";

/**
 * * Validate if brand is register in DB by id
 * @param {string} brandName
 * @returns {boolean | null}
 */
export const BrandExistByName = async (brandName) => {
  try {
    const found = await Brands.count({
      where: {
        brand: brandName,
      },
    });

    return found > 0 ? true : false;
  } catch (error) {
    return null;
  }
};

/**
 * * Validate if brand is register in DB by id
 * @param {bigint} id
 * @returns {boolean | null}
 */
export const BrandExistById = async (id) => {
  try {
    const found = await Brands.count({
      where: {
        id: id,
      },
    });

    return found > 0 ? true : false;
  } catch (error) {
    return null;
  }
};
