import db from "../db/db.js";
import { uniqueId } from "../middleware/utility.js";
import entities from "./entitis/entitis.js";

const saltRounds = 10;


//# find function
const getCmnLinkV = async (objName, lang) => {
  const sqlRecenica =  
      `select 	l.id, l.site, l.code, l."text", l."text" textx, l.objtp1, l.objtp2, l."valid", l.lang, l.grammcase, 
        ot1.id1, ot1.code1, ot1.nobjtp1, ot1.valid1, ot1.lang1, ot1.grammcase1,
        ot2.id2, ot2.code2, ot2.nobjtp2, ot2.valid2, ot2.lang2, ot2.grammcase2
      from	cmn_linkx_v l,
        (
        select ot.id id1, ot.code code1, ot.text nobjtp1, ot.valid valid1, ot.lang lang1, ot.grammcase grammcase1
        from cmn_objtpx_v ot
        where ot.lang = '${lang||'en'}'
        ) ot1,
        (
        select ot.id id2, ot.code code2, ot.text nobjtp2, ot.valid valid2, ot.lang lang2, ot.grammcase grammcase2
        from cmn_objtpx_v ot
        where ot.lang = '${lang||'en'}'
        ) ot2
      where l.objtp1  = ot1.id1
      and 	l.objtp2 = ot2.id2 `
  //const [rows] = await db.query(sqlRecenic);

  const result = await db.query(sqlRecenica);
  const rows = result.rows;
  if (Array.isArray(rows)) {
    return rows;
  } else {
    throw new Error(
      `Greška pri dohvatanju slogova iz baze - abs find: ${rows}`
    );
  }
};

//# find Item by id function
const getCmnObjattsV = async (objName, objId, lang) => {
  const sqlRecenica =  
      `select  l.id, l.site, l.obj, l.cmn_objatt , l.begda, l.endda,
      ot1.id1, ot1.code1, ot1.nobjatt1, ot1.valid1, ot1.lang1, ot1.grammcase1
    from      cmn_objatts l,
      (
      select ot.id id1, ot.code code1, ot.text nobjatt1, ot.cmn_objatttp cmn_objatttp1,  ot.valid valid1, ot.lang lang1, ot.grammcase grammcase1
      from cmn_objattx_v ot
      where ot.lang = '${lang||'en'}'
      ) ot1
    where l.cmn_objatt  = ot1.id1
    and l.obj = ${objId}`

  const result = await db.query(sqlRecenica);
  const rows = result.rows;
  if (Array.isArray(rows)) {
    return rows;
  } else {
    throw new Error(
      `Greška pri dohvatanju slogova iz baze - abs find: ${rows}`
    );
  }
};


export default {
  getCmnLinkV,
  getCmnObjattsV,

};
