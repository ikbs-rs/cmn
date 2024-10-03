import db from "../db/db.js";
import entities from "./entitis/entitis.js";
import { uniqueId } from "../middleware/utility.js";

const saltRounds = 10;



/***************************************************************************************************** */
const copyGrpEventloc = async (eventId, par1, loc, tploc, begda, endda, requestBody) => {

  try {
    console.log(par1, "***************************copyGrpEvent*******************************")
    let ok = false;
    let uId = '11111111111111111111'
    await db.query("BEGIN");

    if (par1 == 'true') {
      console.log(par1, "***************************copyGrpEvent - delete *******************************")
      await db.query(
        `
      delete from tic_eventloc
      where event = $1
    `, [eventId]);
    }

    // Iteriramo kroz objekte u requestBody
    // Pretvorite string u niz objekata
    const parsedBody = JSON.parse(requestBody.jsonObj);
    console.log(par1, "***************************copyGrpEvent 00 *******************************")
    // Provera da li parsedBody ima svojstvo koje sadrži niz objekata
    if (parsedBody && Array.isArray(parsedBody)) {
      // Iteriramo kroz objekte u parsedBody
      for (const obj of parsedBody) {
        console.log(obj, "***************************copyGrpEvent 01 *******************************")
        uId = await uniqueId();

        console.log(
          eventId, "@@@@@@@@@@@@@@@ BMV @@@@@@@@@@@@@@@")

        await db.query(`
            INSERT INTO tic_eventloc (id, site, event, loc, begda, endda, color, icon)
            VALUES ($1, NULL, $2, $3, $4, $5, $6, $7)
        `, [uId, eventId, obj.id, begda, endda, obj.color, obj.icon]);
      }
    }
    console.log(
      eventId, "@@@@@@@@@@@@@ BMV @@@@@@@@@@@@@@@@@")

    await db.query("COMMIT"); // Confirm the transaction
    ok = true;

    return ok;
  } catch (error) {
    if (db) {
      await db.query("ROLLBACK"); // Rollback the transaction in case of an error
    }
    throw error;
  }
};


const copyGrpLoclocl = async (objId1, objId2, par1, par2, begda, endda, requestBody) => {

  try {
    let ok = false;
    let uId = '11111111111111111111'
    await db.query("BEGIN");
    if (par1 == 'true') {
      if (par2 == 'null') {
        await db.query(
          `
          delete from cmn_loclink
          where loc2 = $1
          and loc1 in (
            select t.id
            from  cmn_loc t
          )
        `, [objId1]);
      } else {
        await db.query(
          `
          delete from cmn_loclink
          where loc2 = $1
          and loc1 in (
            select t.id
            from  cmn_loc t
            where t.tp = $2
          )
        `, [objId1, par2]);
      }
    }

    const parsedBody = JSON.parse(requestBody.jsonObj);

    if (parsedBody && Array.isArray(parsedBody)) {
      for (const obj of parsedBody) {
        console.log(obj, "***************************copyGrpEventlocl - FOR *******************************")
        uId = await uniqueId();
        await db.query(
          `
          INSERT INTO cmn_loclink (
            id, site, tp, loctp1, loc1, loctp2, loc2, val, begda, endda, hijerarhija, onoff, color, icon)
          VALUES 
            ($1, NULL, 1, $2, $3, $4, $5, '', $6, $7, 1, 0, $8, $9)
          `,
          [uId, obj.tp, obj.id, objId2, objId1, begda, endda, obj.color, obj.icon]
        );
      }
    }

    await db.query("COMMIT"); // Confirm the transaction
    ok = true;

    return ok;
  } catch (error) {
    if (db) {
      await db.query("ROLLBACK"); // Rollback the transaction in case of an error
    }
    throw error;
  }
};
/****************************************************************************** */
const handleTicVenue = async (objId1, par1, requestBody) => {

  try {
    let ok = false;
    let sqlQuery = ''
    const parsedBody = JSON.parse(requestBody.jsonObj);


    await db.query("BEGIN");
    if (par1 === 'CREATE') {
      parsedBody.venue_id = await uniqueId();
      sqlQuery = `
      insert into tic_venue (venue_id,  venue_name, code, venue_type, map_min_zoom, map_max_zoom, map_max_resolution) 
      values (${parsedBody.venue_id},  '${parsedBody.venue_name}', '${parsedBody.code}', '${parsedBody.venue_type}', 1, 5, 5)
      `
    } else if (par1 === 'UPDATE') {
      sqlQuery = `
      UPDATE tic_venue set 
            venue_name = '${parsedBody.venue_name}',  
            code = '${parsedBody.code}',  
            venue_type = '${parsedBody.venue_type}'
      WHERE venue_id = ${parsedBody.venue_id}
      `
    } else if (par1 === 'DELETE') {
      sqlQuery = `
      delete from tic_venue
      where venue_id = ${parsedBody.venue_id}
      `
    }
    console.log(requestBody, "H-00-HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH", sqlQuery)
    const result = await db.query(sqlQuery);
    await db.query("COMMIT");
    ok = true;

    return parsedBody;
  } catch (error) {
    if (db) {
      await db.query("ROLLBACK"); // Rollback the transaction in case of an error
    }
    throw error;
  }
};
/****************************************************************************** */


export default {
  copyGrpEventloc,
  copyGrpLoclocl,
  handleTicVenue,
};
