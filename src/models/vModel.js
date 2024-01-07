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
        where ot.lang = '${lang || 'en'}'
        ) ot1,
        (
        select ot.id id2, ot.code code2, ot.text nobjtp2, ot.valid valid2, ot.lang lang2, ot.grammcase grammcase2
        from cmn_objtpx_v ot
        where ot.lang = '${lang || 'en'}'
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

const getLocV = async (objName, lang) => {
  const sqlRecenica =
    `select l.id, l.site, l.code, l.text , l.valid, l.longtext, l.lang, l.grammcase, l.text textx, l.color, l.icon, 
            l.tp, getValueById(l.tp, 'cmn_loctpx_v', 'code', '${lang || 'en'}') ctp, getValueById(l.tp, 'cmn_loctpx_v', 'text', '${lang || 'en'}') ntp
      from	cmn_locx_v l
      where l.lang = '${lang || 'en'}'`
  console.log(sqlRecenica, "****************************/////////")
  //const [rows] = await db.query(sqlRecenic);
  let result = await db.query(sqlRecenica);
  let rows = result.rows;
  if (Array.isArray(rows)) {
    return rows;
  } else {
    throw new Error(
      `Greška pri dohvatanju slogova iz baze - abs find: ${rows}`
    );
  }
};

const getLocLLV = async (objName, objId, lang) => {
  const sqlRecenica =
    `
    select l.id, l.site, l.code, l.text , l.valid, l.longtext, l.lang, l.grammcase, l.text textx, l.color, l.icon, 
            l.tp, getValueById(l.tp, 'cmn_loctpx_v', 'code', '${lang || 'en'}') ctp, getValueById(l.tp, 'cmn_loctpx_v', 'text', '${lang || 'en'}') ntp
      from	cmn_locx_v l, cmn_loctp t
      where l.lang = '${lang || 'en'}'
      and t.code = (CASE WHEN '${objId}' = '-1' then t.code else '${objId}' end)
      and l.tp = t.id 
      `
  console.log(sqlRecenica, "*****************getLocLLV***********/////////")
  //const [rows] = await db.query(sqlRecenic);
  let result = await db.query(sqlRecenica);
  let rows = result.rows;
  if (Array.isArray(rows)) {
    return rows;
  } else {
    throw new Error(
      `Greška pri dohvatanju slogova iz baze - abs find: ${rows}`
    );
  }
};

const getCmnLocByTxtV = async (objName, stm, item, objId, lang) => {
  const sqlRecenica =
    `select l.id, l.site, l.code, l.text , l.valid, l.longtext, l.lang, l.grammcase, l.text textx,
            l.tp, t.code ctp, t.text ntp
      from	cmn_locx_v l, cmn_loctpx_v t
      where l.lang = '${lang || 'en'}'
      and l.tp = t.id 
      and t.lang = '${lang || 'en'}'
      and   ${item} = '${objId}'`
  console.log(sqlRecenica, "****************************/////////")
  //const [rows] = await db.query(sqlRecenic);
  let result = await db.query(sqlRecenica);
  let rows = result.rows;
  if (Array.isArray(rows)) {
    return rows;
  } else {
    throw new Error(
      `Greška pri dohvatanju slogova iz baze - abs find: ${rows}`
    );
  }
};


const getLinkobjV = async (objName, objId, lang) => {
  const sqlRecenica =
    `select aa.id , aa.site , aa.obj, aa.loc, b.code cloc, b.text nloc, b.longtext, b.text textx 
  from	cmn_locobj aa, cmn_locx_v b
  where	aa.obj = ${objId}     
  and 	b.lang = '${lang || 'en'}'
  and 	aa.loc = b.id`
  console.log(sqlRecenica, "****************************/////////")
  let result = await db.query(sqlRecenica);
  let rows = result.rows;
  if (Array.isArray(rows)) {
    return rows;
  } else {
    throw new Error(
      `Greška pri dohvatanju slogova iz baze - abs find: ${rows}`
    );
  }
};


const getObjsettV = async (objName, objId, lang) => {
  const sqlRecenica =
    `
  select aa.*
  from	cmn_objx_v aa, cmn_objtp b
  where	b.code = '${objId}'     
  and 	aa.lang = '${lang || 'en'}'
  and 	aa.tp = b.id
  `
  console.log(sqlRecenica, "****************************/////////")
  let result = await db.query(sqlRecenica);
  let rows = result.rows;
  if (Array.isArray(rows)) {
    return rows;
  } else {
    throw new Error(
      `Greška pri dohvatanju slogova iz baze - abs find: ${rows}`
    );
  }
};

const getObjV = async (objName, lang) => {
  const sqlRecenica =
    `select l.id, l.site, l.code, l.text , l.valid, l.lang, l.grammcase, l.text textx, l.color, l.icon,
            l.tp, getValueById(l.tp, 'cmn_objtpx_v', 'code', '${lang || 'en'}') ctp, getValueById(l.tp, 'cmn_objtpx_v', 'text', '${lang || 'en'}') ntp
      from	cmn_objx_v l
      where l.lang = '${lang || 'en'}'`
  //const [rows] = await db.query(sqlRecenic);
  let result = await db.query(sqlRecenica);
  let rows = result.rows;
  if (Array.isArray(rows)) {
    return rows;
  } else {
    throw new Error(
      `Greška pri dohvatanju slogova iz baze - abs find: ${rows}`
    );
  }
};

const getObjLLV = async (objName, objId, lang) => {
  const sqlRecenica =
    `select l.id, l.site, l.code, l.text , l.valid, l.lang, l.grammcase, l.text textx, l.color, l.icon,
            l.tp, getValueById(l.tp, 'cmn_objtpx_v', 'code', '${lang || 'en'}') ctp, getValueById(l.tp, 'cmn_objtpx_v', 'text', '${lang || 'en'}') ntp
      from	cmn_objx_v l, cmn_objtp t
      where l.lang = '${lang || 'en'}'
      and t.code = (CASE WHEN '${objId}' = '-1' then t.code else '${objId}' end)
      and l.tp = t.id 
      `
  //const [rows] = await db.query(sqlRecenic);
  let result = await db.query(sqlRecenica);
  let rows = result.rows;
  if (Array.isArray(rows)) {
    return rows;
  } else {
    throw new Error(
      `Greška pri dohvatanju slogova iz baze - abs find: ${rows}`
    );
  }
};

const getCmnObjByTxtV = async (objName, stm, item, objId, lang) => {
  const sqlRecenica =
    `
      select l.id, l.site, l.code, l.text , l.valid, l.lang, l.grammcase, l.text textx,
            l.tp, getValueById(l.tp, 'cmn_objtpx_v', 'code', '${lang || 'en'}') ctp, getValueById(l.tp, 'cmn_objtpx_v', 'text', '${lang || 'en'}') ntp
      from	cmn_objx_v l, cmn_objtp t
      where ${item} = '${objId}'  
      and   t.id = l.tp
      and   l.lang = '${lang || 'en'}'
      `
  console.log(sqlRecenica, "*************sqlRecenica************")
  //const [rows] = await db.query(sqlRecenic);
  let result = await db.query(sqlRecenica);
  let rows = result.rows;
  if (Array.isArray(rows)) {
    return rows;
  } else {
    throw new Error(
      `Greška pri dohvatanju slogova iz baze - abs find: ${rows}`
    );
  }
};

const getCmnParByTxtV = async (objName, stm, item, objId, lang) => {
  const sqlRecenica =
    `
      select l.id, l.site, l.code, l.text , l.short, l.address, l.place, l.postcode, l.tel, l.activity, l.pib, l.idnum,
            l.pdvnum, l.begda, l.endda, l.lang, l.grammcase, l.text textx,
            l.tp, getValueById(l.tp, 'cmn_partpx_v', 'code', '${lang || 'en'}') ctp, getValueById(l.tp, 'cmn_partpx_v', 'text', '${lang || 'en'}') ntp
      from	cmn_parx_v l, cmn_partp t
      where ${item} = '${objId}'  
      and   t.id = l.tp
      and   l.lang = '${lang || 'en'}'
      `
  console.log(sqlRecenica, "*************sqlRecenica************")
  //const [rows] = await db.query(sqlRecenic);
  let result = await db.query(sqlRecenica);
  let rows = result.rows;
  if (Array.isArray(rows)) {
    return rows;
  } else {
    throw new Error(
      `Greška pri dohvatanju slogova iz baze - abs find: ${rows}`
    );
  }
};

const getParV = async (objName, lang) => {
  const sqlRecenica =
    `select l.id, l.site, l.code, l.text, l.short, l.address, l.place, l.postcode, l.tel, l.activity,
            l.pib, l.idnum, l.pdvnum, l.begda, l.endda,
            l.lang, l.grammcase, l.text textx,
            l.tp, getValueById(l.tp, 'cmn_partpx_v', 'code', '${lang || 'en'}') ctp, getValueById(l.tp, 'cmn_partpx_v', 'text', '${lang || 'en'}') ntp
      from	cmn_parx_v l
      where l.lang = '${lang || 'en'}'`
  //const [rows] = await db.query(sqlRecenic);
  let result = await db.query(sqlRecenica);
  let rows = result.rows;
  if (Array.isArray(rows)) {
    return rows;
  } else {
    throw new Error(
      `Greška pri dohvatanju slogova iz baze - abs find: ${rows}`
    );
  }
};

const getTerrV = async (objName, lang) => {
  const sqlRecenica =
    `select l.id, l.site, l.code, l.text, l.postcode, l.begda, l.endda,
            l.lang, l.grammcase, l.text textx,
            l.tp, getValueById(l.tp, 'cmn_terrtpx_v', 'code', '${lang || 'en'}') ctp, getValueById(l.tp, 'cmn_terrtpx_v', 'text', '${lang || 'en'}') ntp
      from	cmn_terrx_v l
      where l.lang = '${lang || 'en'}'`
  //const [rows] = await db.query(sqlRecenic);
  console.log(sqlRecenica, "****************************/////////")
  let result = await db.query(sqlRecenica);
  let rows = result.rows;
  if (Array.isArray(rows)) {
    return rows;
  } else {
    throw new Error(
      `Greška pri dohvatanju slogova iz baze - abs find: ${rows}`
    );
  }
};

const getParattsV = async (objName, objId, lang) => {
  const sqlRecenica =
    `select aa.id , aa.site , aa.par , aa.text, aa.begda, aa.endda, 
        aa.att, getValueById(aa.att, 'cmn_parattx_v', 'code', '${lang || 'en'}') ctp, getValueById(aa.att, 'cmn_parattx_v', 'text', '${lang || 'en'}') ntp
  from	cmn_paratts aa
  where aa.par = ${objId}`
  //const [rows] = await db.query(sqlRecenic);
  console.log(sqlRecenica, "****************************/////////")
  let result = await db.query(sqlRecenica);
  let rows = result.rows;
  if (Array.isArray(rows)) {
    return rows;
  } else {
    throw new Error(
      `Greška pri dohvatanju slogova iz baze - abs find: ${rows}`
    );
  }
};

const getTerrattsV = async (objName, objId, lang) => {
  const sqlRecenica =
    `select aa.id , aa.site , aa.loc , aa.text, aa.begda, aa.endda, 
        aa.att, getValueById(aa.att, 'cmn_terrattx_v', 'code', '${lang || 'en'}') ctp, getValueById(aa.att, 'cmn_terrattx_v', 'text', '${lang || 'en'}') ntp
  from	cmn_terratts aa
  where aa.loc = ${objId}`
  //const [rows] = await db.query(sqlRecenic);
  console.log(sqlRecenica, "****************************/////////****************")
  let result = await db.query(sqlRecenica);
  let rows = result.rows;
  if (Array.isArray(rows)) {
    return rows;
  } else {
    throw new Error(
      `Greška pri dohvatanju slogova iz baze - abs find: ${rows}`
    );
  }
};

const getTerrlinkV = async (objName, objId, lang) => {
  const sqlRecenica =
    `select aa.id , aa.site , aa.terr2 , aa.text, aa.begda, aa.endda, 
        aa.terr1, getValueById(aa.terr1, 'cmn_terrx_v', 'code', '${lang || 'en'}') cterr1, getValueById(aa.terr1, 'cmn_terrx_v', 'text', '${lang || 'en'}') nterr1
  from	cmn_terrlink aa
  where aa.terr2 = ${objId}`
  //const [rows] = await db.query(sqlRecenic);
  console.log(sqlRecenica, "****************************/////////")
  let result = await db.query(sqlRecenica);
  let rows = result.rows;
  if (Array.isArray(rows)) {
    return rows;
  } else {
    throw new Error(
      `Greška pri dohvatanju slogova iz baze - abs find: ${rows}`
    );
  }
};

const getLocterrV = async (objName, objId, lang) => {
  const sqlRecenica =
    `select aa.id , aa.loc, aa.begda, aa.endda, 
        aa.terr, getValueById(aa.terr, 'cmn_terrx_v', 'code', '${lang || 'en'}') cterr, getValueById(aa.terr, 'cmn_terrx_v', 'text', '${lang || 'en'}') nterr
  from	cmn_terrloc aa
  where aa.loc = ${objId}`
  //const [rows] = await db.query(sqlRecenic);
  console.log(sqlRecenica, "***************getLocterrV*************/////////")
  let result = await db.query(sqlRecenica);
  let rows = result.rows;
  if (Array.isArray(rows)) {
    return rows;
  } else {
    throw new Error(
      `Greška pri dohvatanju slogova iz baze - abs find: ${rows}`
    );
  }
};

const getParlinkV = async (objName, objId, lang) => {
  const sqlRecenica =
    `select aa.id , aa.site , aa.par2 , aa.text, aa.begda, aa.endda, 
        aa.par1, getValueById(aa.par1, 'cmn_parx_v', 'code', '${lang || 'en'}') cpar1, getValueById(aa.par1, 'cmn_parx_v', 'text', '${lang || 'en'}') npar1
  from	cmn_parlink aa
  where aa.par2 = ${objId}`
  //const [rows] = await db.query(sqlRecenic);
  console.log(sqlRecenica, "****************************/////////")
  let result = await db.query(sqlRecenica);
  let rows = result.rows;
  if (Array.isArray(rows)) {
    return rows;
  } else {
    throw new Error(
      `Greška pri dohvatanju slogova iz baze - abs find: ${rows}`
    );
  }
};

const getCurrV = async (objName, lang) => {
  const sqlRecenica =
    `select l.id, l.site, l.code, l.text, l.tp, l.begda, l.endda,
            l.lang, l.grammcase, l.text textx,
            l.country, getValueById(l.country, 'cmn_terrx_v', 'code', '${lang || 'en'}') ccountry, getValueById(l.country, 'cmn_terrx_v', 'text', '${lang || 'en'}') ncountry
      from	cmn_currx_v l
      where l.lang = '${lang || 'en'}'`
  //const [rows] = await db.query(sqlRecenic);
  let result = await db.query(sqlRecenica);
  let rows = result.rows;
  if (Array.isArray(rows)) {
    return rows;
  } else {
    throw new Error(
      `Greška pri dohvatanju slogova iz baze - abs find: ${rows}`
    );
  }
};

const getCurrrateV = async (objName, objId, lang) => {
  const sqlRecenica =
    `
  select aa.id , aa.site , aa.curr2 , aa.rate, aa.parity, aa.begda, aa.endda, 
        aa.curr1, getValueById(aa.curr1, 'cmn_currx_v', 'code', '${lang || 'en'}') ccurr1, getValueById(aa.curr1, 'cmn_currx_v', 'text', '${lang || 'en'}') ncurr1
  from	cmn_currrate aa
  where aa.curr2 = ${objId}
  `
  //const [rows] = await db.query(sqlRecenic);
  console.log(sqlRecenica, "****************************/////////****************")
  let result = await db.query(sqlRecenica);
  let rows = result.rows;
  if (Array.isArray(rows)) {
    return rows;
  } else {
    throw new Error(
      `Greška pri dohvatanju slogova iz baze - abs find: ${rows}`
    );
  }
};

const getTaxV = async (objName, lang) => {
  const sqlRecenica =
    `select l.id, l.site, l.code, l.text, l.valid,
            l.lang, l.grammcase, l.text textx,
            l.country, getValueById(l.country, 'cmn_terrx_v', 'code', '${lang || 'en'}') ccountry, getValueById(l.country, 'cmn_terrx_v', 'text', '${lang || 'en'}') ncountry
      from	cmn_taxx_v l
      where l.lang = '${lang || 'en'}'`
  //const [rows] = await db.query(sqlRecenic);
  let result = await db.query(sqlRecenica);
  let rows = result.rows;
  if (Array.isArray(rows)) {
    return rows;
  } else {
    throw new Error(
      `Greška pri dohvatanju slogova iz baze - cmn_taxx_v find: ${rows}`
    );
  }
};


const getTaxrateV = async (objName, objId, lang) => {
  const sqlRecenica =
    `select aa.id , aa.site , aa.tax , aa.rate, aa.begda, aa.endda
  from	cmn_taxrate aa
  where aa.tax = ${objId}`
  //const [rows] = await db.query(sqlRecenic);
  console.log(sqlRecenica, "****************************/////////****************")
  let result = await db.query(sqlRecenica);
  let rows = result.rows;
  if (Array.isArray(rows)) {
    return rows;
  } else {
    throw new Error(
      `Greška pri dohvatanju slogova iz baze - abs find: ${rows}`
    );
  }
};

const getTgpV = async (objName, lang) => {
  const sqlRecenica =
    `select l.id, l.site, l.code, l.text, l.valid,
            l.lang, l.grammcase, l.text textx,
            l.country, getValueById(l.country, 'cmn_terrx_v', 'code', '${lang || 'en'}') ccountry, getValueById(l.country, 'cmn_terrx_v', 'text', '${lang || 'en'}') ncountry
      from	cmn_tgpx_v l
      where l.lang = '${lang || 'en'}'`
  //const [rows] = await db.query(sqlRecenic);
  let result = await db.query(sqlRecenica);
  let rows = result.rows;
  if (Array.isArray(rows)) {
    return rows;
  } else {
    throw new Error(
      `Greška pri dohvatanju slogova iz baze - abs find: ${rows}`
    );
  }
};


const getTgptaxV = async (objName, objId, lang) => {
  const sqlRecenica =
    `select aa.id , aa.site , aa.tgp , aa.begda, aa.endda, 
        aa.tax, getValueById(aa.tax, 'cmn_taxx_v', 'code', '${lang || 'en'}') ctax, getValueById(aa.tax, 'cmn_taxx_v', 'text', '${lang || 'en'}') ntax
  from	cmn_tgptax aa
  where aa.tgp = ${objId}`
  //const [rows] = await db.query(sqlRecenic);
  console.log(sqlRecenica, "****************************/////////****************")
  let result = await db.query(sqlRecenica);
  let rows = result.rows;
  if (Array.isArray(rows)) {
    return rows;
  } else {
    throw new Error(
      `Greška pri dohvatanju slogova iz baze - abs find: ${rows}`
    );
  }
};


const getObjTree = async (objName, lang) => {
  const sqlRecenica =
    ` select tree
  from (
  WITH RECURSIVE d2 AS (
           SELECT b.id,
            b.parentid,
            b.site,
            b.code,
            b.text,
            b.tp,
            b.ctp,
            b.ntp,
            b.lang, 
            b.grammcase,
            b.valid,
              0 AS level
             FROM (
          SELECT co.id,
                  null::numeric AS parentid,
                  co.site,
                  co.code,
                  co.text,
                  co.tp,
                  getValueById(co.tp, 'cmn_objtpx_v', 'code', 'sr_cyr') ctp,
                  getValueById(co.tp, 'cmn_objtpx_v', 'text', 'sr_cyr') ntp,
                  co.lang,
                  co.grammcase,
                  co."valid" 
                 FROM cmn_objx_v co
                WHERE co.id = '1707106980956868608'::bigint::numeric             
             ) b
            WHERE b.parentid IS NULL
          UNION ALL
         SELECT b.id,
            b.parentid,
            b.site,
            b.code,
            b.text,
            b.tp,
            b.ctp,
            b.ntp,
            b.lang, 
            b.grammcase,
            b.valid,
            d2.level + 1
           FROM (
               SELECT co.obj1 AS id,
                  co.obj2 AS parentid,
                  o.site ,
                  o.code,
                  o.text,
                  o.tp,
                  getValueById(o.tp, 'cmn_objtpx_v', 'code', 'sr_cyr') ctp,
                  getValueById(o.tp, 'cmn_objtpx_v', 'text', 'sr_cyr') ntp,
                  o.lang,
                  o.grammcase,
                  o."valid" 
                 FROM cmn_objlink co,
                  cmn_objx_v o
                WHERE co.obj1 = o.id           
             ) b
               JOIN d2 ON d2.id = b.parentid
          ), d3 AS (
           SELECT d2.id::text,
            d2.parentid::text,
            d2.site,
            d2.code,
            d2.text,
            d2.tp::text,
            d2.ctp,
            d2.ntp,
            d2.lang, 
            d2.grammcase,
            d2.valid::text,
              d2.level,
              NULL::jsonb AS children
             FROM d2
            WHERE d2.level = (( SELECT max(d2_1.level) AS max
                     FROM d2 d2_1))
          UNION
           SELECT (branch.branch_parent).id::text AS id,
              (branch.branch_parent).parentid::text AS parentid,
              (branch.branch_parent).site AS site,
              (branch.branch_parent).code AS code,
              (branch.branch_parent).text AS text,
              (branch.branch_parent).tp::text AS tp,
              (branch.branch_parent).ctp AS ctp,
              (branch.branch_parent).ntp AS ntp,
              (branch.branch_parent).lang AS lang,
              (branch.branch_parent).grammcase AS grammcase,
              (branch.branch_parent).valid::text AS valid,
              (branch.branch_parent).level AS level,
              jsonb_strip_nulls(jsonb_agg(branch.branch_child  - 'level'::text ORDER BY (branch.branch_child ->> 'text'::text)) FILTER (WHERE (branch.branch_child ->> 'parentid'::text) = (branch.branch_parent).id::text)) AS jsonb_strip_nulls
             FROM ( SELECT branch_parent.*::record AS branch_parent,
                      to_jsonb(branch_child.*) AS branch_child
                     FROM d2 branch_parent
                       JOIN d3 branch_child ON branch_child.level = (branch_parent.level + 1)) branch
            GROUP BY branch.branch_parent
          )
   SELECT jsonb_pretty(jsonb_agg(to_jsonb(d3.*) - 'level'::text)) AS tree
     FROM d3
    WHERE d3.level = 0) x `;

  let result = await db.query(sqlRecenica);
  let rows = result.rows;

  if (Array.isArray(rows) && rows.length > 0) {
    // Pretpostavljamo da je 'tree' kolona u vašem view-u tipa JSONB
    // Ako je tip kolone JSON, možete koristiti rows[0].tree::json umesto rows[0].tree
    const jsonString = rows[0].tree;
    const formattedJson = JSON.parse(jsonString);
    //const formattedJson = JSON.parse(jsonString, (key, value) =>   typeof value === 'number' ? BigInt(value) : value);
    //const formattedJson = JSON.stringify(JSON.parse(jsonString), null, 2);
    return formattedJson;
  } else {
    throw new Error(
      `Greška pri dohvatanju hijerarhijskog JSON-a iz baze - abs find: ${rows}`
    );
  }
};

const getLocTreeOld = async (objName, lang) => {
  const sqlRecenica =
    ` select tree
  from (
  WITH RECURSIVE d2 AS (
           SELECT b.id,
            b.parentid,
            b.site,
            b.code,
            b.color,
            b.icon,
            b.text,
            b.tp,
            b.ctp,
            b.ntp,
            b.lang, 
            b.grammcase,
            b.valid,
              0 AS level
             FROM (
          SELECT co.id,
                  null::numeric AS parentid,
                  co.site,
                  co.code,
                  co.color,
                  co.icon,
                  co.text,
                  co.tp,
                  getValueById(co.tp, 'cmn_loctpx_v', 'code', 'sr_cyr') ctp,
                  getValueById(co.tp, 'cmn_loctpx_v', 'text', 'sr_cyr') ntp,
                  co.lang,
                  co.grammcase,
                  co."valid" 
                 FROM cmn_locx_v co
                WHERE co.id = '1707106091126886400'::bigint::numeric             
             ) b
            WHERE b.parentid IS NULL
          UNION ALL
         SELECT b.id,
            b.parentid,
            b.site,
            b.code,
            b.color,
            b.icon,
            b.text,
            b.tp,
            b.ctp,
            b.ntp,
            b.lang, 
            b.grammcase,
            b.valid,
            d2.level + 1
           FROM (
               SELECT co.loc1 AS id,
                  co.loc2 AS parentid,
                  o.site ,
                  o.code,
                  o.color,
                  o.icon,
                  o.text,
                  o.tp,
                  getValueById(o.tp, 'cmn_loctpx_v', 'code', 'sr_cyr') ctp,
                  getValueById(o.tp, 'cmn_loctpx_v', 'text', 'sr_cyr') ntp,
                  o.lang,
                  o.grammcase,
                  o."valid" 
                 FROM cmn_loclink co,
                  cmn_locx_v o
                WHERE co.loc1 = o.id           
             ) b
               JOIN d2 ON d2.id = b.parentid
          ), d3 AS (
           SELECT d2.id::text,
            d2.parentid::text,
            d2.site,
            d2.code,
            d2.color,
            d2.icon,
            d2.text,
            d2.tp::text,
            d2.ctp,
            d2.ntp,
            d2.lang, 
            d2.grammcase,
            d2.valid::text,
              d2.level,
              NULL::jsonb AS children
             FROM d2
            WHERE d2.level = (( SELECT max(d2_1.level) AS max
                     FROM d2 d2_1))
          UNION
           SELECT (branch.branch_parent).id::text AS id,
              (branch.branch_parent).parentid::text AS parentid,
              (branch.branch_parent).site AS site,
              (branch.branch_parent).code AS code,
              (branch.branch_parent).color AS color,
              (branch.branch_parent).icon AS icon,
              (branch.branch_parent).text AS text,
              (branch.branch_parent).tp::text AS tp,
              (branch.branch_parent).ctp AS ctp,
              (branch.branch_parent).ntp AS ntp,
              (branch.branch_parent).lang AS lang,
              (branch.branch_parent).grammcase AS grammcase,
              (branch.branch_parent).valid::text AS valid,
              (branch.branch_parent).level AS level,
              jsonb_strip_nulls(jsonb_agg(branch.branch_child  - 'level'::text ORDER BY (branch.branch_child ->> 'text'::text)) FILTER (WHERE (branch.branch_child ->> 'parentid'::text) = (branch.branch_parent).id::text)) AS jsonb_strip_nulls
             FROM ( SELECT branch_parent.*::record AS branch_parent,
                      to_jsonb(branch_child.*) AS branch_child
                     FROM d2 branch_parent
                       JOIN d3 branch_child ON branch_child.level = (branch_parent.level + 1)) branch
            GROUP BY branch.branch_parent
          )
   SELECT jsonb_pretty(jsonb_agg(to_jsonb(d3.*) - 'level'::text)) AS tree
     FROM d3
    WHERE d3.level = 0) x `;

  let result = await db.query(sqlRecenica);
  console.log(result.rows, "//////////////////*************************///////////////////////////**************/////////////////")
  let rows = result.rows;

  if (Array.isArray(rows) && rows.length > 0) {
    // Pretpostavljamo da je 'tree' kolona u vašem view-u tipa JSONB
    // Ako je tip kolone JSON, možete koristiti rows[0].tree::json umesto rows[0].tree
    const jsonString = rows[0].tree;
    const formattedJson = JSON.parse(jsonString);
    //const formattedJson = JSON.parse(jsonString, (key, value) =>   typeof value === 'number' ? BigInt(value) : value);
    //const formattedJson = JSON.stringify(JSON.parse(jsonString), null, 2);
    return formattedJson;
  } else {
    throw new Error(
      `Greška pri dohvatanju hijerarhijskog JSON-a iz baze - abs find: ${rows}`
    );
  }
};

const getLocTree = async (objName, lang) => {
  const sqlRecenica = `
  select tree
  from (
  WITH RECURSIVE d2 AS (
           SELECT b.id,
			      b.parent_id,    
			      b.loclink,
			      b.site,
			      b.tp,
			      b.loctp1,
			      b.loctp2,
			      b.val,
			      b.begda,
			      b.endda,
			      b.hijerarhija,
			      b.onoff,
			      b.color,
			      b.icon,
			      b."text",
			      b.ctp,
			      b.ntp,
			      0 AS level
             FROM (    
			    SELECT 
				  ll.loc1::numeric AS id,
			      NULL::numeric AS parent_id,    
			      ll.id::numeric AS loclink,
			      ll.site,
			      ll.tp,
			      ll.loctp1::text as loctp1,
			      ll.loctp2::text as loctp2,
			      ll.val,
			      ll.begda,
			      ll.endda,
			      ll.hijerarhija,
			      ll.onoff,
			      coalesce (ll.color, coalesce (l.color, '#ffffff')) color,
			      coalesce (ll.icon, '-') icon,
			      l."text",
			      getValueById(l.tp, 'cmn_loctpx_v', 'code', 'sr_cyr') ctp,
			      getValueById(l.tp, 'cmn_loctpx_v', 'text', 'sr_cyr') ntp,
			      0 AS level
			    FROM cmn_loclink ll, cmn_locx_v l 
			    where ll.loc1 = l.id
			   and l.id = '1707106091126886400'::bigint::numeric           
                ) b
          UNION ALL
         SELECT b.id,
			  b.parent_id,    
			  b.loclink,
			  b.site,
			  b.tp,
			  b.loctp1::text as loctp1,
			  b.loctp2::text as loctp2,
			  b.val,
			  b.begda,
			  b.endda,
			  b.hijerarhija,
			  b.onoff,
			  b.color,
			  b.icon,
			  b."text",
			  b.ctp,
			  b.ntp,
			  d2.level + 1
           FROM (              
			    SELECT 
				  ll.loc1::numeric AS id,
			      ll.loc2::numeric AS parent_id,    
			      ll.id::numeric AS loclink,
			      ll.site,
			      ll.tp,
			      ll.loctp1::text as loctp1,
			      ll.loctp2::text as loctp2,
			      ll.val,
			      ll.begda,
			      ll.endda,
			      ll.hijerarhija,
			      ll.onoff,
			      coalesce (ll.color, coalesce (l.color, '#ffffff')) color,
			      coalesce (ll.icon, '-') icon,
			      l."text",
			      getValueById(l.tp, 'cmn_loctpx_v', 'code', 'sr_cyr') ctp,
			      getValueById(l.tp, 'cmn_loctpx_v', 'text', 'sr_cyr') ntp,
			      0 AS level
                 FROM cmn_loclink ll,
                  cmn_locx_v l
                WHERE ll.loc1 = l.id   
                and ll.loc1 != ll.loc2             
             ) b
               JOIN d2 ON d2.id = b.parent_id                           
          )          
          , d3 AS (
           select d2.id::text AS id,
			  d2.parent_id::text AS parent_id,    
			  d2.loclink::text AS loclink,
			  d2.site,
			  d2.tp,
			  d2.loctp1::text as loctp1,
			  d2.loctp2::text as loctp2,
			  d2.val,
			  d2.begda,
			  d2.endda,
			  d2.hijerarhija,
			  d2.onoff,
			  d2.color,
			  d2.icon,
			  d2."text",
			  d2.ctp,
			  d2.ntp, 
              d2.level,
              NULL::jsonb AS children
             FROM d2
            WHERE d2.level = (( SELECT max(d2_1.level) AS max
                     FROM d2 d2_1))
          UNION
           SELECT (branch.branch_parent).id::text AS id,
              (branch.branch_parent).parent_id::text AS parent_id,
              (branch.branch_parent).loclink::text AS loclink,
              (branch.branch_parent).site AS site,
              (branch.branch_parent).tp AS tp,
              (branch.branch_parent).loctp1::text AS loctp1,
              (branch.branch_parent).loctp2::text AS loctp2,
              (branch.branch_parent).val AS val,
              (branch.branch_parent).begda as begda,
              (branch.branch_parent).endda AS endda,
              (branch.branch_parent).hijerarhija AS hijerarhija,
              (branch.branch_parent).onoff AS onoff,
              (branch.branch_parent).color AS color,
              (branch.branch_parent).icon AS icon,
              (branch.branch_parent).text AS text,
              (branch.branch_parent).ctp AS ctp,
              (branch.branch_parent).ntp::text AS ntp,              
              (branch.branch_parent).level AS level,
              jsonb_strip_nulls(jsonb_agg(branch.branch_child  - 'level'::text ORDER BY (branch.branch_child ->> 'text'::text)) FILTER (WHERE (branch.branch_child ->> 'parent_id'::text) = (branch.branch_parent).id::text)) AS jsonb_strip_nulls
             FROM ( SELECT branch_parent.*::record AS branch_parent,
                      to_jsonb(branch_child.*) AS branch_child
                     FROM d2 branch_parent
                       JOIN d3 branch_child ON branch_child.level = (branch_parent.level + 1)) branch
            GROUP BY branch.branch_parent
          )
   SELECT jsonb_pretty(jsonb_agg(to_jsonb(d3.*) - 'level'::text)) AS tree
     FROM d3
    WHERE d3.level = 0    
    ) x 
  `
  let result = await db.query(sqlRecenica);
  console.log(result.rows, "//////////////////*************************///////////////////////////**************/////////////////")
  let rows = result.rows;

  if (Array.isArray(rows) && rows.length > 0) {
    // Pretpostavljamo da je 'tree' kolona u vašem view-u tipa JSONB
    // Ako je tip kolone JSON, možete koristiti rows[0].tree::json umesto rows[0].tree
    const jsonString = rows[0].tree;
    const formattedJson = JSON.parse(jsonString);
    //const formattedJson = JSON.parse(jsonString, (key, value) =>   typeof value === 'number' ? BigInt(value) : value);
    //const formattedJson = JSON.stringify(JSON.parse(jsonString), null, 2);
    return formattedJson;
  } else {
    throw new Error(
      `Greška pri dohvatanju hijerarhijskog JSON-a iz baze - abs find: ${rows}`
    );
  }
};

const getLoclinkTree = async (objName, lang) => {
  const sqlRecenica =
    `
      WITH RECURSIVE d2 AS (
        SELECT
            b.id,
            b.parentid,
            b.site,
            b.code,
            coalesce (b.color,'ffffff') as color,
            b.icon,
            b.text,
            b.tp,
            b.ctp,
            b.ntp,
            b.lang,
            b.grammcase,
            b.valid,
            0 AS level
        FROM (
                SELECT
                    co.id,
                    null::numeric AS parentid,
                    co.site,
                    co.code,
                    coalesce(co.color,'ffffff') color,
                    co.icon,
                    co.text,
                    co.tp,
                    getValueById(co.tp, 'cmn_loctpx_v', 'code', 'sr_cyr') ctp,
                    getValueById(co.tp, 'cmn_loctpx_v', 'text', 'sr_cyr') ntp,
                    co.lang,
                    co.grammcase,
                    co."valid"
                FROM cmn_locx_v co, 
                WHERE co.id = '1707106091126886400'::bigint::numeric
            ) b
        WHERE b.parentid IS NULL
        UNION ALL
        SELECT
            b.id,
            b.parentid,
            b.site,
            b.code,
          b.color,
          b.icon,
            b.text,
            b.tp,
            b.ctp,
            b.ntp,
            b.lang,
            b.grammcase,
            b.valid,
            d2.level + 1
        FROM (
                SELECT
                    co.loc1 AS id,
                    co.loc2 AS parentid,
                    o.site,
                    o.code,
                    coalesce(o.color,'ffffff') color,
                    o.icon,
                    o.text,
                    o.tp,
                    getValueById(o.tp, 'cmn_loctpx_v', 'code', 'sr_cyr') ctp,
                    getValueById(o.tp, 'cmn_loctpx_v', 'text', 'sr_cyr') ntp,
                    o.lang,
                    o.grammcase,
                    o."valid"
                FROM cmn_loclink co
                          JOIN cmn_locx_v o ON co.loc1 = o.id
            ) b
            JOIN d2 ON d2.id = b.parentid
      ), d3 AS (
          SELECT
              d2.id::text,
              d2.parentid::text,
              d2.site,
              d2.code,
              d2.color::text,
              d2.icon::text,
              d2.text,
              d2.tp::text,
              d2.ctp,
              d2.ntp,
              d2.lang,
              d2.grammcase,
              d2.valid::text,
              d2.level,
              NULL::jsonb AS children
          FROM d2
          WHERE d2.level = (SELECT max(d2_1.level) FROM d2 d2_1)
          UNION
          SELECT
              (branch.branch_parent).id::text AS id,
              (branch.branch_parent).parentid::text AS parentid,
              (branch.branch_parent).site AS site,
              (branch.branch_parent).code AS code,
              (branch.branch_parent).color AS color,
              (branch.branch_parent).icon AS icon,
              (branch.branch_parent).text AS text,
              (branch.branch_parent).tp::text AS tp,
              (branch.branch_parent).ctp AS ctp,
              (branch.branch_parent).ntp AS ntp,
              (branch.branch_parent).lang AS lang,
              (branch.branch_parent).grammcase AS grammcase,
              (branch.branch_parent).valid::text AS valid,
              (branch.branch_parent).level AS level,
              jsonb_strip_nulls(
                  jsonb_agg(
                      jsonb_build_object(
                          'id', (branch.branch_child ->> 'id')::text,
                          'parentid', (branch.branch_child ->> 'parentid')::text,
                          'site', (branch.branch_child ->> 'site')::text,
                          'code', (branch.branch_child ->> 'code')::text,
                          'color', (branch.branch_child ->> 'color')::text,
                          'icon', (branch.branch_child ->> 'icon')::text,
                          'text', (branch.branch_child ->> 'text')::text,
                          'tp', (branch.branch_child ->> 'tp')::text,
                          'ctp', (branch.branch_child ->> 'ctp')::text,
                          'ntp', (branch.branch_child ->> 'ntp')::text,
                          'lang', (branch.branch_child ->> 'lang')::text,
                          'grammcase', (branch.branch_child ->> 'grammcase')::text,
                          'valid', (branch.branch_child ->> 'valid')::text,
                          'level', (branch.branch_child ->> 'level')::text,
                          'children', (branch.branch_child -> 'children')::jsonb
                      )
                  ) FILTER (WHERE (branch.branch_child ->> 'parentid')::text = (branch.branch_parent).id::text)
              )
          FROM (
                  SELECT
                      branch_parent.*::record AS branch_parent,
                      to_jsonb(branch_child.*) AS branch_child
                  FROM d2 branch_parent
                            JOIN d3 branch_child ON branch_child.level = (branch_parent.level + 1)
              ) branch
          GROUP BY branch.branch_parent
    )
    SELECT jsonb_pretty(jsonb_agg(to_jsonb(d3.*) - 'level'::text)) AS tree
    FROM d3
    WHERE d3.level = 0
  `;
  let result = await db.query(sqlRecenica);
  console.log(result.rows, "//////////////////*************************///////////////////////////**************/////////////////")
  let rows = result.rows;

  if (Array.isArray(rows) && rows.length > 0) {
    // Pretpostavljamo da je 'tree' kolona u vašem view-u tipa JSONB
    // Ako je tip kolone JSON, možete koristiti rows[0].tree::json umesto rows[0].tree
    const jsonString = rows[0].tree;
    const formattedJson = JSON.parse(jsonString);
    //const formattedJson = JSON.parse(jsonString, (key, value) =>   typeof value === 'number' ? BigInt(value) : value);
    //const formattedJson = JSON.stringify(JSON.parse(jsonString), null, 2);
    return formattedJson;
  } else {
    throw new Error(
      `Greška pri dohvatanju hijerarhijskog JSON-a iz baze - abs find: ${rows}`
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
      where ot.lang = '${lang || 'en'}'
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

//# find Item by id function
const getCmnObjparV = async (objName, objId, lang) => {
  const sqlRecenica = `
  select  l.id, l.site, l.obj,  l.begda, l.endda,
          l.par, p.cpar, p.npar,  p.lang, p.grammcase
    from      cmn_objpar l,
      (
      select ot.id id, ot.code cpar, ot.text npar, ot.lang, ot.grammcase
      from cmn_parx_v ot
      where ot.lang = '${lang || 'en'}'
      ) p
    where l.par  = p.id
    and l.obj = ${objId}
    `
console.log(sqlRecenica, "###########################################getCmnObjparV#########################################")
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

const getCmnObjlinkV = async (objName, objId, lang) => {
  const sqlRecenica =
    `select  l.id, l.site, l.objtp2, l.obj2, 
            l.objtp1, getValueById(l.objtp1, 'cmn_objtpx_v', 'code', '${lang || 'en'}') cobjtp1, getValueById(l.objtp1, 'cmn_objtpx_v', 'text', '${lang || 'en'}') nobjtp1,
            l.obj1, getValueById(l.obj1, 'cmn_objx_v', 'code', '${lang || 'en'}') cobj1, getValueById(l.obj1, 'cmn_objx_v', 'text', '${lang || 'en'}') nobj1,
            l.direction, l.code, l.text,
            l.cmn_link , l.direction, l.code, l.text,      		 
            l.um, getValueById(l.um, 'cmn_umx_v', 'code', '${lang || 'en'}') cum, getValueById(l.um, 'cmn_umx_v', 'text', '${lang || 'en'}') num,
            l.begda, l.endda, l.hijerarhija, l.onoff
    from    cmn_objlink l
    where 	l.obj2  = ${objId}`

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

const getCmnLoclinkV = async (objName, objId, lang) => {
  const sqlRecenica =
    `select  l.id, l.site, l.loctp2, l.loc2, l.tp,
            l.loctp1, getValueById(l.loctp1, 'cmn_loctpx_v', 'code', '${lang || 'en'}') cloctp1, getValueById(l.loctp1, 'cmn_loctpx_v', 'text', '${lang || 'en'}') nloctp1,
            l.loc1, getValueById(l.loc1, 'cmn_locx_v', 'code', '${lang || 'en'}') cloc1, getValueById(l.loc1, 'cmn_locx_v', 'text', '${lang || 'en'}') nloc1,   		 
            l.begda, l.endda, l.val, l.hijerarhija, l.onoff
    from    cmn_loclink l
    where 	l.loc2  = ${objId}`
  console.log(sqlRecenica, "***********************getCmnLoclinkV***********************")
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

const getCmnLoclinkLLV = async (objName, objId, item, lang) => {
  const sqlRecenica =
    `select  l.id, l.site, l.loctp2, l.loc2, l.tp,
            l.loctp1, t.code cloctp1, t.text nloctp1, coalesce(l.color, lx.color) color,
            l.loc1, lx.code cloc1, lx.text nloc1,   		 
            l.begda, l.endda, l.val, l.hijerarhija, l.onoff
    from    cmn_loclink l, cmn_loctpx_v t, cmn_locx_v lx
    where 	l.loc2  = ${objId}
    and l.loc1 = lx.id
    and t.code = (CASE WHEN '${item}' = '-1' then t.code else '${item}' end)
    and t.lang = '${lang || 'en'}'
    and lx.lang = '${lang || 'en'}'
    and l.loctp1 = t.id
    `
  console.log(sqlRecenica, "***********************getCmnLoclinkLLV***********************")
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

const getXscV = async (objName, lang) => {
  const sqlRecenica =
    `
      select l.id, l.site, l.code, l.text , l.valid, l.grammcase, l.text textx,
            l.tp, getValueById(l.tp, 'cmn_loctpx_v', 'code', '${lang || 'en'}') ctp, getValueById(l.tp, 'cmn_loctpx_v', 'text', '${lang || 'en'}') ntp
      from  cmn_locx_v l, cmn_loctp t, adm_dbparameter d
      where l.lang = '${lang || 'en'}'
      and d.code = 'XSC'
      and d.code = t.code
      and t.id = l.tp
      `
  console.log(sqlRecenica, "****************************/////////")
  //const [rows] = await db.query(sqlRecenic);
  let result = await db.query(sqlRecenica);
  let rows = result.rows;
  if (Array.isArray(rows)) {
    return rows;
  } else {
    throw new Error(
      `Greška pri dohvatanju slogova iz baze - abs find: ${rows}`
    );
  }
};

const getXscDDV = async (objName, objId, lang) => {
  const sqlRecenica =
    `
      select l.id, l.site, l.code, l.text , l.valid, l.graftp, l.latlongs, l.radius, l.color, l.fillcolor, l.originfillcolor, l.rownum, l.grammcase, l.text textx,
            l.tp, getValueById(l.tp, 'cmn_loctpx_v', 'code', '${lang || 'en'}') ctp, getValueById(l.tp, 'cmn_loctpx_v', 'text', '${lang || 'en'}') ntp
      from  cmn_locx_v l, cmn_loctp t, tic_event e, cmn_loclink ll
      where l.lang = '${lang || 'en'}'
      and t.code = 'XSCH'
      and t.id = l.tp
      and e.id = ${objId}
      and ll.loc2 = e.loc 
      and ll.loc1 = l.id
      `
  console.log(sqlRecenica, "****************************/////////")
  //const [rows] = await db.query(sqlRecenic);
  let result = await db.query(sqlRecenica);
  let rows = result.rows;
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
  getLocV,
  getLocLLV,
  getLinkobjV,
  getLocterrV,
  getObjV,
  getObjLLV,
  getObjsettV,
  getCmnObjByTxtV,
  getCmnParByTxtV,
  getParV,
  getParattsV,
  getParlinkV,
  getTerrV,
  getTerrattsV,
  getTerrlinkV,
  getCurrV,
  getCurrrateV,
  getTaxV,
  getTaxrateV,
  getTgpV,
  getTgptaxV,
  getObjTree,
  getLocTree,
  getCmnObjattsV,
  getCmnObjlinkV,
  getCmnLoclinkV,
  getCmnLoclinkLLV,
  getCmnObjparV,
  getCmnLocByTxtV,
  getXscV,
  getXscDDV,
};
