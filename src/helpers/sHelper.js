import sModel from "../models/sModel.js";

const saltRounds = 10;

const getLista2 = async (objName, stm, objId, objId1, lang) => {
  try {
    console.log("*******HelperGetLista2*********", stm);
    let result = {};
    switch (stm) {
      case "tic_eventartcena_v":
        result = await sModel.getEventartCena(objName, objId, objId1, lang);
        break;
      default:
        console.error("vHelper: Pogresan naziv za view-a");
    }
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getLista = async (objName, stm, objId, lang) => {
  try {
    console.log("*******Helper*********", stm);
    let result = {};
    switch (stm) {
      case "tic_art_v":
        result = await sModel.getAgendaL(objName, lang);
        break;
      case "tic_eventlink_v":
        result = await sModel.getArtL(objName, objId, lang);
        break;
      case "tic_eventcena_v":
        result = await sModel.getEventCena(objName, objId, lang);
        break;
      default:
        console.error("vHelper: Pogresan naziv za view-a");
    }
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const postFunction = async (
  att,
  objName1,
  objName2,
  objId1,
  objId2,
  stm,
  begda,
  endda,
  lang,
  par1,
  par2,
  par3,
  requestBody
) => {
  try {
    console.log(par1, "* par1 ******Helper*********", stm);
    let result = {};
    switch (stm) {
      case "tic_grpeventloc_s":
        result = await sModel.copyGrpEventloc(objId1, par1, par2, par3, begda, endda, requestBody);
        break;
      case "tic_venue_s":
        result = await sModel.handleTicVenue(objId1, par1, requestBody);
        break;
      case "cmn_grploclink_s":
        result = await sModel.copyGrpLoclocl(objId1, objId2, par1, par2, begda, endda, requestBody);
        break;
      default:
        console.error("sHelper: Pogresan naziv za view-a - " + stm);
    }

    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default {
  getLista,
  postFunction,
  getLista2,
};
