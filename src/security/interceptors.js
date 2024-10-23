import axios from "axios";
import jwt from "jsonwebtoken";
import jwtConfig from "../config/jwtConfig.js";
import roll from "./guards/roll.js";
//import https from 'https';

export const checkJwt = async (req, res, next) => {
  try {
    const jwtServer = process.env.JWT_URL;
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!jwtServer) {
      throw new Error(
        "Adresa udaljenog servera nije definisana u .env datoteci."
      );
    } else {
      if (jwtServer === "LOCAL"||1==1) {
        // console.log(`Headeri:`, {
        //     Authorization: `Bearer ${token}`
        //   });
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", new Date().toLocaleTimeString('sr-RS', { hour12: false, timeZone: 'UTC' }) + `:${new Date().getMilliseconds()} milisekunde`);
        jwt.verify(token, jwtConfig.secret, (err, decoded) => {
          if (err) {
            console.log("JWT lokalna verifikacija nije uspela: ", err.message);
            return res.status(401).json({ error: "Token invalid" });
          }
          console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC", new Date().toLocaleTimeString('sr-RS', { hour12: false, timeZone: 'UTC' }) + `:${new Date().getMilliseconds()} milisekunde`);
          // console.log("JWT lokalno verifikovan, decoded: ", decoded);
          req.userId = decoded.userId;
          next();
        });
      } else {
        // console.log("CMN inteceptors 27!!");
        const checkJwtUrl = `${jwtServer}/checkJwt`;

        // Log pre nego što se zahtev pošalje
        // console.log(`Šalje se zahtev ka JWT serveru: ${checkJwtUrl}`);
        // console.log(`Headeri:`, {
        //   Authorization: `Bearer ${token}`
        // });
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", new Date().toLocaleTimeString('sr-RS', { hour12: false, timeZone: 'UTC' }) + `:${new Date().getMilliseconds()} milisekunde`);
        const response = await axios.post(
          `${checkJwtUrl}`,
          {}, 
          {
            headers: { Authorization: `Bearer ${token}` },
            timeout: 10000, 
            family: 4,
          }
        );
        console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB", new Date().toLocaleTimeString('sr-RS', { hour12: false, timeZone: 'UTC' }) + `:${new Date().getMilliseconds()} milisekunde`);

        // Log nakon što se zahtev pošalje
        console.log("Odgovor primljen od JWT servera: ", response.data);

        if (response.status === 200 && response.data.success) {
          console.log("JWT token uspešno verifikovan na udaljenom serveru.");
          req.userId = response.data.userId;
          req.username = response.data.username;
          next();
        } else {
          console.log("JWT verifikacija nije uspela na udaljenom serveru.");
          return res
            .status(401)
            .json({ message: "Niste autorizovani za pristup ovom resursu." });
        }
      }
    }
  } catch (error) {
    // Dodat log za slučaj greške
    console.log("Greška prilikom slanja zahteva ka JWT serveru:", error.message);
    console.log("Detalji greške:", error.response?.data || {});

    return res.status(error.response?.status || 500).json({
      message: error.message || "Internal Server Error",
      data: error.response?.data || {},
    });
  }
};


// Middleware funkcija za proveru prava, sa default parametrima
export const checkPermissions = (par1 = "1", par2 = "1") => {
  return async (req, res, next) => {
    try {
      // Dohvatam objekat i korisnika i prosledjujem dalje
      //const agent = new https.Agent({ rejectUnauthorized: false });
      const objName = req.objName;
      const userId = req.userId;
      const jwtServer = process.env.JWT_URL
      if (jwtServer === "LOCAL") {
        // Proveru prava korisnika dalje obavlja obicna funkcija
        if (await roll.proveraDozvola(userId, objName, par1, par2)) {
          next();
        } else {
          return res
            .status(401)
            .json({ message: "Nemate pravo pristupa ovom resursu - roll." });
        }
      } else {
        // Prosleđujem zahtev udaljenom serveru
        const token = req.headers.authorization?.replace("Bearer ", "");
        const checkPermissionsUrl = `${jwtServer}/checkPermissions`;
        const response = await axios.post(checkPermissionsUrl, 
          {
            userId: req.userId,
            objName: objName,
            par1: par1,
            par2: par2
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );   
    
        if (response.status === 200 && response.data.allowed) {
          next();
        } else {
          return res
            .status(401)
            .json({ message: "Nemate pravo pristupa ovom resursu - roll." });
        }
      }
    } catch (error) {
      // u slučaju greške, vraćamo objekat sa informacijama o grešci
      return res.status(error.response?.status || 500).json({
        message: error.message || "Internal  Server Error - roll",
        data: error.response?.data || {},
      });
    }
  };
};

export const checkPermissionsEx = async (req, res, next) => {
  try {
    // Dohvatam objekat i korisnika i prosledjujem dalje
    const userId = req.body.userId;
    const objName = req.body.objName;
    const par1 = req.body.par1 || 1;
    const par2 = req.body.par2 || 1;
    // Proveru prava korisnika dalje obavlja obicna funkcija
    if (await roll.proveraDozvola(userId, objName, par1, par2)) {
      return res
        .status(200)
        .json({ message: `Imate prava na resurs ${objName}` });
    } else {
      return res
        .status(401)
        .json({ message: "Nemate pravo pristupa ovom resursu - roll." });
    }
  } catch (error) {
    // u slučaju greške, vraćamo objekat sa informacijama o grešci
    return res.status(error.response?.status || 500).json({
      message: error.message || "Internal  Server Error - roll",
      data: error.response?.data || {},
    });
  }
};
