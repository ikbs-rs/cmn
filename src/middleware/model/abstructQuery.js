 import entities from "../../models/entitis/entitis.js";
 
 const getInsertQuery = async (objName, objData) => {
  const insertFields = [];
  const insertValues = [];

  for (const [key, value] of Object.entries(objData)) {
    if (value !== null && value !== '' && value !== undefined) {
      //console.log(`Tip podatka ${key}`, entities.entitiesInfo[objName].attributes[key])
      const attributeType = entities.entitiesInfo[objName].attributes[key];
      insertFields.push(key);
      insertValues.push(attributeType === 'string' ? `'${value}'` : value);
    }
  }

  const fieldsStr = insertFields.join(', ');
  const valuesStr = insertValues.join(', ');

  const insertQuery = `INSERT INTO ${objName} (${fieldsStr}) VALUES (${valuesStr})`;
  
  return insertQuery;
};


const getUpdateQuery = async (objName, objData) => {
    let updateQuery = `UPDATE ${objName} SET `
    for (const key in objData) {
      if (objData[key] !== null && key!=="id") {
        const attributeType = entities.entitiesInfo[objName].attributes[key];
        const value = attributeType === 'string' ? `'${objData[key]}'` : objData[key];
        updateQuery += `${key}=${value},`
      } else {
        if (key!=="id") updateQuery += `${key}=NULL,`
      }
    }
    updateQuery = updateQuery.slice(0, -1) + ` WHERE id = ${objData.id}`
    //console.log('abstructQuery', updateQuery)
    return updateQuery
  }
  
export default {
  getInsertQuery,
  getUpdateQuery
}
