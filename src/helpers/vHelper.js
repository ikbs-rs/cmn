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
    let result = {};
    switch (stm) {
      case "cmn_objatts_v":
        result = await vModel.getCmnObjattsV(objName, lang);
        break;
      case "cmn_loc_v":
        result = await vModel.getLocV(objName, lang);
        break;
      case "cmn_locll_v":
        result = await vModel.getLocLLV(objName, objId, lang);
        break;
      case "cmn_locobj_v":
        result = await vModel.getLinkobjV(objName, objId, lang);
        break;
      case "cmn_locterr_v":
        result = await vModel.getLocterrV(objName, objId, lang);
        break;
      case "cmn_obj_v":
        result = await vModel.getObjV(objName, lang);
        break;
        case "cmn_objll_v":
          result = await vModel.getObjLLV(objName, objId, lang);
          break;        
      case "cmn_objsett_v":
        result = await vModel.getObjsettV(objName, objId, lang);
        break;
      case "cmn_obj_tp_v":
        result = await vModel.getObjTpV(objName, objId, lang);
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
      case "cmn_loctree_json_v":
        result = await vModel.getLocTree(objName, lang);
        break;
      case "cmn_terr_v":
        result = await vModel.getTerrV(objName, lang);
        break;
      case "cmn_terratts_v":
        result = await vModel.getTerrattsV(objName, objId, lang);
        break;
      case "cmn_terrlink_v":
        result = await vModel.getTerrlinkV(objName, objId, lang);
        break;
      case "cmn_curr_v":
        result = await vModel.getCurrV(objName, lang);
        break;
      case "cmn_currrate_v":
        result = await vModel.getCurrrateV(objName, objId, lang);
        break;
      case "cmn_tax_v":
        result = await vModel.getTaxV(objName, lang);
        break;
      case "cmn_tgp_v":
        result = await vModel.getTgpV(objName, lang);
        break;
      case "cmn_tgptax_v":
        result = await vModel.getTgptaxV(objName, objId, lang);
        break;
      case "cmn_taxrate_v":
        result = await vModel.getTaxrateV(objName, objId, lang);
        break;
      case "cmn_xsc_v":
        result = await vModel.getXscV(objName, lang);
        break;
      case "cmn_xscdd_v":
        result = await vModel.getXscDDV(objName, objId, lang);
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

const getListaById = async (objName, stm, item, objId, lang) => {
  try {
    switch (stm) {
      case "cmn_objatts_v":
        var result = await vModel.getCmnObjattsV(objName, objId, lang);
        break;
      case "cmn_objlink_v":
        var result = await vModel.getCmnObjlinkV(objName, objId, lang);
        break;
      case "cmn_loclink_v":
        var result = await vModel.getCmnLoclinkV(objName, objId, lang);
        break;
      case "cmn_loclinkll_v":
        var result = await vModel.getCmnLoclinkLLV(objName, objId, item, lang);
        break;
        case "cmn_objpar_v":
          var result = await vModel.getCmnObjparV(objName, objId, lang);
          break;        
      default:
        console.error(`Pogresan naziv za view ${stm}`);
    }
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getListaByText = async (objName, stm, item, objId, lang) => {
  try {
    switch (stm) {
      case "cmn_locbytxt_v":
        var result = await vModel.getCmnLocByTxtV(
          objName,
          stm,
          item,
          objId,
          lang
        );
        break;
      case "cmn_obj_tp_v":
        var result = await vModel.getCmnObjByTxtV(
          objName,
          stm,
          item,
          objId,
          lang
        );
        break;
      case "cmn_par_tp_v":
        var result = await vModel.getCmnParByTxtV(
          objName,
          stm,
          item,
          objId,
          lang
        );
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

const getListaByNum = async (objName, stm, item, objId, lang) => {
  try {
    switch (stm) {
      case "tic_docbynum_v":
        var result = await vModel.getCmnLocByTxtV(
          objName,
          stm,
          item,
          objId,
          lang
        );
        break;
      default:
        console.error("Pogresan naziv za view, getListaByNum");
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
  getListaByText,
};
