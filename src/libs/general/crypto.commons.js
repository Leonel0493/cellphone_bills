import bycrypt from "bcryptjs";

const salt = await bycrypt.genSalt(10);

/**
 * * Encrypt the parammeter 
 * @param {string} info 
 * @returns {string}
 * @returns {null} when error happend
 */
export const EncryptData = async (info) => {
  try{
    let cryptInfo = await bycrypt.hash(info, salt);

    return cryptInfo;
  }
  catch(error){
    return null;
  }
}

/**
 * * Compare the no crypted info with the crypted
 * @param {string} info 
 * @param {string} cryptInfo 
 * @returns {boolean}
 * @returns {null} when error happend
 */
export const CompareInfo = async (info, cryptInfo) => {
  try{
    let isSame = await bycrypt.compare(info, cryptInfo);

    return isSame;
  }
  catch(error){
    return null;
  }
}