const { checkData, errMessage } = require("../errController");
const userController = require("../DL/user.controller");
const documentsServices = require("./documents.services");
const bcrypt = require("bcrypt");
const { createToken } = require("../jwt");
const fs = require("fs")

const SALTROUNDS = Number(process.env.SALTROUNDS);

const getUser = async (email,proj) => {
  const user = await userController.readOne({ email },proj);
  if (!user && !user.isActive) throw errMessage.USER_NOT_FOUND;
  return user;
};
const getUserForRegister = async (email) => {
  const user = await userController.readOne({ email });
  if (user) throw errMessage.USER_IS_EXIST;
  return user;
};

const createUser = async (data) => {
  checkData(data, ["fullName", "email", "password"]);
  await getUserForRegister(data.email);
  data.password = bcrypt.hashSync(data.password, SALTROUNDS);
  const firstStorage = await documentsServices.createDocuments({
    name: "my_storage",
    type: "directory",
  });
  fs.mkdirSync(`uploads/${data.email}`)
  fs.mkdirSync(`uploads/${data.email}/my_storage`)
  data.my_storage = firstStorage;
  return await userController.create(data);
};

const login = async (data) => {
    checkData(data, ["email", "password"]);
    const user = await getUser(data.email, "+password");
    const isEqual = bcrypt.compareSync(data.password, user.password);
    if (!isEqual) throw errMessage.PASSWORDS_ARE_NOT_CORRECT;
    const token = createToken(user.email);
    return token;
  };
  
module.exports = {getUser,createUser,login}