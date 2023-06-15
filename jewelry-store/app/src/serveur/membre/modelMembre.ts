import { pool } from "../config/dbconf";
let message = {msg:""};

export const Mdl_Membre_enregistrer = async (membre: any): Promise<object> => { 
  try {
    const requeteMembre = "INSERT INTO membres VALUES(0,?,?,?,?,?)";
    
      let reponse = await pool.query(requeteMembre, [
      membre.prenom,
      membre.nom,
      membre.courriel,
      membre.sexe,
      membre.datenaissance
    ]);
     
    const requeteConnexion = "INSERT INTO connexion VALUES(?,?,?,?,?)";
    await pool.query(requeteConnexion, [
      reponse[0].insertId,
      membre.courriel,
      membre.pass,
      "M",
      "A",
    ]);
      message.msg = "Membre bien enregistré";
  } catch (e:any) {
      message.msg = "Problème avec l'enregistrement du membre!";
  } finally {
    return message;
  }
};
