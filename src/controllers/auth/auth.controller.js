import jwt from "jsonwebtoken";
import { Users } from "../../models/auth/users.model.js";
import { response, request } from "express";
import { VerifyUser } from "../../libs/auth/user.commons.js";
import * as crypto from "../../libs/general/crypto.commons.js";
import { GetRolesByUser } from "../../libs/auth/permissions.commons.js";
import config from "../../config.js";

export const RegisterUser = async (req = request, res = response) => {
  try {
    const { username, password, idEmployee } = req.body;

    // * validate that user not exist.
    let userExist = await VerifyUser(username);

    if (userExist) {
      res.status(401).json({
        message: `The user ${username} allready exist please select other username.`,
      });
    }

    // * get encrypt password
    let pwdcrypt = await crypto.EncryptData(password);

    // * Save user in data base
    const user = await Users.create({
      user_name: username,
      password: pwdcrypt,
      id_employee: parseInt(idEmployee),
      enabled: true,
    });

    res.json({ id: user.id });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const Autenticate = async (req = request, res = response) => {
  try {
    const { username, password } = req.body;

    // * validate if user exist
    let exist = await VerifyUser(username);

    if (!exist) {
      res
        .status(401)
        .json({ message: `The user ${username} not exist please verify.` });
    }

    // * get user info
    const user = await Users.findOne({
      where: { user_name: username },
      raw: true,
    });

    // * check if the password is correct
    let isSame = await crypto.CompareInfo(password, user.password);

    if (!isSame) {
      res
        .status(401)
        .json({ message: `The password do not match, please try again` });
    }

    // * get all roles
    let roles = await GetRolesByUser(user.id);

    const token = jwt.sign(
      {
        id: user.id,
      },
      config.SECRET,
      {
        expiresIn: 86400,
      }
    );

    res.json({token});
  } catch (error) {
    res.status(500).json(error);
  }
};
