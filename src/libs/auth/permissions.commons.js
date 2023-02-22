import { Permissions } from "../../models/auth/permissions.model.js";
import config from "../../config.js";

/**
 * * Return all roles from user
 * @param {BigInteger} idUser 
 * @returns {BigInt[] | null}
 */
export const GetRolesByUser = async (idUser) => {
  try {
    console.log("llegue al common");
    var result = await Permissions.findAll({
      attributes: ["id_rol"],
      where: {
        id_user: parseInt(idUser),
        id_system: parseInt(config.SYS_ID),
        enabled: true,
      },
      raw: true,
    });

    return result.map(idRol => idRol.id_rol);
  } catch (error) {
    console.log(error);
  }
};
