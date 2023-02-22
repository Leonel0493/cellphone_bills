import { request, response } from "express";
import jwt from "jsonwebtoken";
import cfg from "../config.js";
import { GetRolesByUser } from "../libs/auth/permissions.commons.js";
import { CompareRoles } from "../libs/auth/roles.commons.js";

/**
 * * middleware that validate if token is correct
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns {status}
 */
export const tokenValidator = (req = request, res = response, next) => {
  try {
    const token = req.headers["x-access-token"];

    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, cfg.SECRET);

    next();
  } catch (error) {
    return res.status(403).json({ message: "Unauthorize access!" });
  }
};

/**
 * * middleware that verify if the user have the correct role
 * @param {string} roles 
 * @returns {status}
 */
export const tokenRoleValidator = async (roles) => {
  return async function (req = request, res = response, next) {
    try {
      const token = req.headers["x-access-token"];

      if (!token) {
        return res.status(403).json({ message: "No token provided" });
      }

      const decoded = jwt.verify(token, cfg.SECRET);

      const roles_id = await GetRolesByUser(decoded.id);

      const haveRol = await CompareRoles(roles.split(','), roles_id);

      if(haveRol === null || haveRol === false){
        return res.status(403).json({ message: "Unauthorize access!" });
      }

      next();
    } catch (error) {
      return res.status(403).json({ message: "Unauthorize access!" });
    }
  };
};
