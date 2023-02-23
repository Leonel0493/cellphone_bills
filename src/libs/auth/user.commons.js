import { Users } from "../../models/auth/users.model.js";

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
