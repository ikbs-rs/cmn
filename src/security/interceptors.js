import axios from "axios";
import jwt from "jsonwebtoken";
import jwtConfig from "../config/jwtConfig.js";
import roll from "./guards/roll.js"

// funkcija za proveru ispravnosti JWT tokena za postojeci modul ADM.
export const checkJwt = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    // izvlačenje identifikatora korisnika iz JWT tokena
    const decodedToken = jwt.decode(token);

    if (decodedToken && decodedToken.sub) {
      req.userId = { userId: decodedToken.userId };
    }

    const remoteUrl = process.env.JWT_URL;

    if (!remoteUrl) {
      throw new Error(
        "Adresa udaljenog servera nije definisana u .env datoteci."
      );
    } else {
      if (remoteUrl === "local") {
        jwt.verify(token, jwtConfig.secret, (err, decoded) => {
          if (err) return res.status(401).json({ error: "Token invalid" });
          req.userId = decoded.userId;
          next();
        });
      } else {
        const response = await axios.get(`${remoteUrl}`, {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 5000, // vreme za koje se očekuje odgovor od udaljenog servera (u milisekundama)
        });
        // provera statusa odgovora
        if (response.status === 200 && response.data.success) {
          // ako je JWT token ispravan, prelazimo na sledeći middleware
          next();
        } else {
          // ako nije ispravan, vraćamo poruku o grešci
          return res
            .status(401)
            .json({ message: "Niste autorizovani za pristup ovom resursu." });
        }
      }
    }
  } catch (error) {
    // u slučaju greške, vraćamo objekat sa informacijama o grešci
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
      const objName = req.objName; 
      const userId = req.userId; 
      // Proveru prava korisnika dalje obavlja obicna funkcija
      if (await roll.proveraDozvola(userId, objName, par1, par2)) {
        next();
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
};

export const checkPermissionsEx = async (req, res, next) => {
    try {
      // Dohvatam objekat i korisnika i prosledjujem dalje
      const userId = req.body.userId; 
      const objName = req.body.objName;       
      const par1  = req.body.par1 || 1; 
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
