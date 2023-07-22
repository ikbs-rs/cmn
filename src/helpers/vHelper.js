import vModel from "../models/vModel.js";

const saltRounds = 10;

const getCmnLinkV = async (objName, lang) => {
  try {
    const result = await vModel.getCmnLinkV(objName, lang);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getLista = async (objName, stm, objId, lang) => {
  try {
    console.log("********************* Lista ***********")
    let result = {};
    switch (stm) {
      case "cmn_objatts_v":
        result = await vModel.getCmnObjattsV(objName, lang);
        break;
      case "cmn_obj_v":
        result = await vModel.getObjV(objName, lang);
        break;
      case "cmn_par_v":
        result = await vModel.getParV(objName, lang);
        break;
      case "cmn_paratts_v":
        result = await vModel.getParattsV(objName, objId, lang);
        break;
        case "cmn_parlink_v":
          result = await vModel.getParlinkV(objName, objId, lang);
          break;        
      case "cmn_objtree_json_v":
        result = await vModel.getObjTree(objName, lang);
        break;
        case "cmn_terr_v":
          result = await vModel.getTerrV(objName, lang);
          break; 
          case "cmn_terratts_v":
            result = await vModel.getTerrattsV(objName, objId, lang);
            break;                 
      default:
        console.error("Pogresan naziv za view");
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
      case "cmn_objlink_v":
        var result = await vModel.getCmnObjlinkV(objName, objId, lang);
        break;
      default:
        console.error("Pogresan naziv za view");
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
