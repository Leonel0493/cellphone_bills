import { request, response } from "express";
import { Permissions } from "../../models/auth/permissions.model.js";
import config from "../../config.js";
import { VerifyUserById } from "../../libs/auth/user.commons.js";

export const AddPermissions = async (req = request, res = response) => {
  try {
    const { idRoles, idUser } = req.body;

    let userExist = await VerifyUserById(idUser);

    if (userExist === null || userExist === false) {
      return res
        .status(401)
        .json({ message: `The user that you send not exist.` });
    }

    const permissions = idRoles.map((idrol) => {
      return {
        id_rol: idrol,
        id_user: idUser,
        id_system: config.SYS_ID,
        enabled: true,
      };
    });

    const result = await Permissions.bulkCreate(permissions);

    if (result) {
      return res.json(result);
    }

    return res.status(401).json({
      message: `Sorry we do not save the permission in this moment, please contact with IT Department.`,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
