import { Users } from "../../models/auth/users.model.js";
import jwt from "jsonwebtoken";
import cfg from "../../config.js";

/**
 * * Verify that user exist using username
 * @param {string} username
 * @returns {boolean | null}
 */
export const VerifyUserByUserName = async (username) => {
  try {
    const records = await Users.count({
      where: { user_name: username },
    });

    return records > 0 ? true : false;
  } catch (error) {
    return null;
  }
};

/**
 * * Verify that user exist using id
 * @param {Bigint} iduser
 * @returns {boolean | null}
 */
export const VerifyUserById = async (iduser) => {
  try {
    const record = await Users.count({
      where: { id: iduser },
    });

    return record > 0 ? true : false;
  } catch (error) {
    return null;
  }
};

/**
 * * Get the user name for current user
 * @param {string} token
 * @returns {string} user_name
 */
export const GetLoggedName = async (token) => {
  try {
    const decoded = jwt.verify(token, cfg.SECRET);
    const username = await Users.findOne({
      attributes: ["user_name"],
      where: {
        id: decoded.id,
      },
      raw: true,
    });

    return username.user_name;
  } catch (error) {
    return null;
  }
};
