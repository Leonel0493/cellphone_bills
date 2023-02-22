import bycript from "bcryptjs";
import { Users } from "../../models/auth/users.model.js";
import { response, request } from "express";
import { VerifyUser } from "../../libs/auth/user.commons.js";

export const RegisterUser = async (request, response) => {
  try {
    const { username, password, idEmployee } = request.body;
    const salt = await bycript.genSalt(10);
    let pwdcrypt = await bycript.hash(password, salt);
    
    const user = await Users.create({
      user_name: username,
      password: pwdcrypt,
      id_employee: parseInt(idEmployee),
      enabled: true
    });

    res.json(user);
    let exist = await VerifyUser(username);

    response.json(exist);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const Autenticate = async (request, response) => {
  try {
    const { username, password} = request.body;
    
    const user = await Users.findOne({
      where: {user_name: username}
    });

    let pass = await bycript.compare(user.password, password);


  } catch (error) {
    console.error(error);
  }
};