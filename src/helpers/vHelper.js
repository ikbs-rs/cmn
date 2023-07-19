import vModel from "../models/vModel.js";

const saltRounds = 10

const getCmnLinkV = async (objName, lang) => {
  try { 
    const result = await vModel.getCmnLinkV(objName, lang);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getLista = async (objName, stm, lang) => {
  try { 
    const result = {}
    switch (stm) {
      case "cmn_objlink_v":
          result = await vModel.getCmnLinkV(objName, lang); 
          break;
      case "cmn_objatts_v":
          result = await vModel.getCmnObjattsV(objName, lang);                    
          break;
      default:
          console.error("Pogresan naziv za view")
    }     
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getListaById = async (objName, stm, objId, lang) => {
  try { 
    switch (stm) {
      case "cmn_objatts_v":
          var result = await vModel.getCmnObjattsV(objName, objId, lang); 
          break;
      default:
          console.error("Pogresan naziv za view")
    }     
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default {
  getCmnLinkV,
  getLista,
  getListaById,
};
