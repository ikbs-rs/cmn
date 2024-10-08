import abstractModel from "../models/Abstruct.js";
import { uniqueId, parId } from "../middleware/utility.js";
import abstructQuery from "../middleware/model/abstructQuery.js";
import { getToken } from "../security/jwt/tokenJWT.js";
import bcrypt from "bcryptjs";

const saltRounds = 10

const add = async (objName, objData) => {
  console.log(objName, "HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH", objData.id)
  try {
    if (objName == "cmn_par") {
      if (!objData.code || objData.code !== null) {
        const _broj = await parId();
        objData.code = `tkl_${_broj}`
      }
    }
    if (!objData.id || objData.id !== null) {
      objData.id = await uniqueId();
    }
    // Mozda mi ovo ne treba jer dolazi sa fronta !!!
    if (objName === "adm_user") {
      const hashedPassword = await bcrypt.hash(objData.password, saltRounds);
      objData.password = hashedPassword;
    }
    const sqlQuery = await abstructQuery.getInsertQuery(objName, objData);
    const result = await abstractModel.add(sqlQuery);
    return objData.id; //result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getAll = async (objName) => {
  try {
    const result = await abstractModel.find(objName);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getById = async (objName, id) => {
  try {
    const result = await abstractModel.findById(objName, id);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getByStext = async (objName, value) => {
  try {
    const result = await abstractModel.findByStext(objName, value);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const update = async (objName, objData) => {
  try {
    console.log("***************update*****************", objData)
    const sqlQuery = await abstructQuery.getUpdateQuery(objName, objData);
    const result = await abstractModel.update(sqlQuery);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const remove = async (objName, id) => {
  try {
    const result = await abstractModel.remove(objName, id);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
//******************************* */
const getItem = async (objName, item, objId) => {
  try {
    const result = await abstractModel.findItem(objName, item, objId);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getIdByItem = async (objName, item, itemValue) => {
  try {
    const result = await abstractModel.findIdbyItem(objName, item, itemValue);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const setItem = async (objName, item, items) => {
  try {
    const result = await abstractModel.setItem(objName, item, items);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

//************************** */

const signup = async (objName, objData) => {
  try {
    objData.id = await uniqueId();
    const token = await getToken(objData.id, objData.username)
    const item = {
      id: objData.id,
      username: objData.username,
      token: token,
    };
    const user = await add(objName, objData);
    return item;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default {
  add,
  getAll,
  getById,
  getByStext,
  update,
  remove,
  getItem,
  getIdByItem,
  setItem,
  signup,
};
