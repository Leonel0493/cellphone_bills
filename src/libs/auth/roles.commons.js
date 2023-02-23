import { Roles } from "../../models/auth/roles.model.js";
import { Op } from "sequelize";

/**
 * * function that review if the user have until one rol
 * @param {string[]} roles_aray
 * @param {string[]} idroles_array
 * @returns {boolean | null}
 */
export const CompareRoles = async (roles_aray, idroles_array) => {
  try {
    const result = await Roles.findAll({
      attributes: ["rol"],
      where: {
        id: {
          [Op.or]: idroles_array,
        },
        enabled: true,
      },
      raw: true,
    });

    let roles = result.map((role) => role.rol);

    let isDev = roles.includes("Dev");

    if (isDev) {
      return true;
    }

    let haveRole = roles.find((rol) => {
      console.log(rol);
      let r = roles_aray.includes(rol);
      if (r) {
        return true;
      }
    });
    console.log(haveRole, roles_aray, roles);

    return haveRole ? true : false;
  } catch (error) {
    return null;
  }
};
