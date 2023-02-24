import { request, response } from "express";
import { where } from "sequelize";
import { GetLoggedName } from "../../libs/auth/user.commons.js";
import {
  BrandExistById,
  BrandExistByName,
} from "../../libs/catalog/brands.utils.js";
import { Brands } from "../../models/catalog/brand.model.js";

/**
 * * Get all active brands
 * @param {request} req
 * @param {response} res
 * @returns {object[]}
 */
export const GetAllBrands = async (req = request, res = response) => {
  try {
    const allBrands = await Brands.findAll({
      where: {
        enabled: true,
      },
      raw: true,
    });

    return res.json(allBrands);
  } catch (error) {
    return res.status(500).json(error);
  }
};

/**
 * * Get brand information by id
 * @param {request} req
 * @param {response} res
 * @returns {object[]}
 */
export const GetBrandById = async (req = request, res = response) => {
  try {
    const id = req.params.id;
    const brand = await Brands.findOne({
      where: {
        id: id,
        enabled: true,
      },
    });

    if (brand) {
      return res.json(brand);
    }

    return res
      .status(404)
      .json({ message: `Sorry we did not found your brand.` });
  } catch (error) {
    return res.status(500).json(error);
  }
};

/**
 * * Save a single brand in database
 * @param {request} req
 * @param {response} res
 * @returns {object}
 */
export const SaveBrand = async (req = request, res = response) => {
  try {
    const { brand } = req.body;

    const match = await BrandExistById(brand);

    if (match || match === null) {
      return res
        .status(403)
        .json({ message: `The brand ${brand} is already exist` });
    }

    let user_name = await GetLoggedName(req.headers["x-access-token"]);

    const _brand = await Brands.create({
      brand: brand,
      created_by: user_name,
      enabled: true,
    });

    if (_brand) {
      return res.json(_brand);
    }

    return res
      .status(403)
      .json({ message: `Sorry we didn't save the brand, please try again` });
  } catch (error) {
    return res.status(500).json(error);
  }
};

/**
 * * Update a single brand in database
 * @param {request} req
 * @param {response} res
 * @returns {object}
 */
export const UpdateBrand = async (req = request, res = response) => {
  try {
    const { idBrand, brand } = req.body;

    const match = await BrandExistById(idBrand);

    if (match == false || match === null) {
      return res
        .status(403)
        .json({ message: `The brand ${brand} not exist in records` });
    }

    let user_name = await GetLoggedName(req.headers["x-access-token"]);

    const _brand = await Brands.update(
      {
        brand: brand,
        modified_by: user_name,
        modified_at: Date.now(),
      },
      {
        where: { id: idBrand, enabled: true },
      }
    );

    if (_brand[0] === 1) {
      return res.json(_brand);
    }

    return res
      .status(403)
      .json({ message: `Sorry we didn't update the brand, please try again` });
  } catch (error) {
    return res.status(500).json(error);
  }
};

/**
 * * Disbale brand in database
 * @param {request} req
 * @param {response} res
 * @returns {object}
 */
export const DisableBrand = async (req = request, res = response) => {
  try {
    const idBrand = req.params.id;

    const match = await BrandExistById(idBrand);

    if (match == false || match === null) {
      return res
        .status(403)
        .json({ message: `The brand ${brand} not exist in records` });
    }

    let user_name = await GetLoggedName(req.headers["x-access-token"]);

    const _brand = await Brands.update(
      {
        enabled: false,
        modified_by: user_name,
        modified_at: Date.now(),
      },
      {
        where: { id: idBrand, enabled: true },
      }
    );

    if (_brand[0] === 1) {
      return res.json(_brand);
    }

    return res
      .status(403)
      .json({ message: `Sorry we didn't delete the brand, please try again` });
  } catch (error) {
    return res.status(500).json(error);
  }
};
