import { Users } from "../../models/auth/users.model";

/**
 * * Verify that the user exists
 * @param {string} username
 * @returns {boolean}
 */
export const VerifyUser = async (username) => {
  try{
    const records = await Users.count({
      where: {user_name: username}
    });

    return records > 0 ? true : false; 
  }
  catch(error){
    return false;
  }
}