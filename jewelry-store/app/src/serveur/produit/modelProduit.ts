import { Request } from "express";
import fs from "fs-extra";
import sha1 from "sha1";
import { pool } from "../config/dbconf";

let reponse = {OK:true,msg:"",listeProduits:{}};

export const Mdl_Produit_ajouter = async (req: any): Promise<object> => {

  try {
      let dossierPochettes = "app/src/serveur/pochettes/";
      
    let nomarticle = req.body.nomarticle;
    let description = req.body.description;
    let imageart = "avatar.jpg"; 
   // let imageart = req.body.imageart;
    let categorie = req.body.categorie;
    let qteinventaire = req.body.qteinventaire;
    let seuil = req.body.seuil;
    let prix = req.body.prix;
   console.log(req.files)
    let requeteProduit = "INSERT INTO articles VALUES(0,?,?,?,?,?,?,?)";

    if (req.files.length > 0) {
      let extension = req.files[0].originalname.split(".").pop();
      imageart = sha1(nomarticle + process.hrtime()) + "." + extension;
      await fs.move(req.files[0].path, dossierPochettes + imageart);
    }
      const reponseReq = await pool.query(requeteProduit, [nomarticle, description, imageart, categorie, qteinventaire, seuil, prix]); // Est synchrone
      reponse.msg = "Produit bien enregistré";
      reponse.listeProduits = {'id': reponseReq[0].insertId,'nomarticle':nomarticle, 'description':description, 'imageart':imageart, 'categorie':categorie, 'qteinventaire':qteinventaire, 'seuil':seuil, 'prix':prix}
    } catch (e:any) {
      reponse.OK=false;
      reponse.msg = "Problème avec l'enregistrement du Produit!";
  } finally {
    return reponse;
  }
}

export const Mdl_Produit_lister = async (): Promise<object> => {

  let requete = "SELECT * FROM articles";
  try {
    let resultat:any = await pool.query(requete,[]);
    if(resultat.length > 0){
      let resultatJSON = resultat[0];
      reponse.listeProduits = resultatJSON;
    } else {
      reponse.listeProduits = [];
    }
  } catch (e:any) {
    reponse.OK=false;
    reponse.msg = "Probléme pour lister les Produits!";
  }finally {
    return reponse;
  }
}

export const Mdl_Produit_supprimer = async (req: any): Promise<object> => {
   let dossierPochettes = "app/src/serveur/pochettes/";
    let idProduit = req.body.idProduit;
    try{
        let requete="SELECT * FROM articles WHERE id=?";
        let resultat:any = await pool.query(requete,[idProduit]);
        let resultatJSON = resultat[0];
        if(resultatJSON.length > 0){
            requete="DELETE FROM articles WHERE id=?";
            await pool.query(requete,[idProduit]);
            if(resultatJSON.pochette != "avatar.jpg"){
                await fs.remove(dossierPochettes+resultatJSON.pochette);
            }
            reponse.msg="Produit enlevé"; 
        }else {
            reponse.msg="Produit introuvable";
        };
    }catch(err){
        reponse.OK=false;
        reponse.msg = "Problème avec la suppression du Produit!";
    } finally {
      return reponse;
    }
}

export const Mdl_Produit_modifier = async(req:any):Promise<object> => {
    let dossierPochettes = "app/src/serveur/pochettes/";
    let ida = req.body.ida;
    let nomarticle = req.body.nomarticle;
    let description = req.body.description;

    let categorie = req.body.categorie;
    let qteinventaire = req.body.qteinventaire;
    let seuil = req.body.seuil;
    let prix = req.body.prix;
    let anciennePochette = req.body.anciennePochette;

    let imageart=anciennePochette;
    try{     
        if (req.files.length > 0) {
          let extension = req.files[0].originalname.split(".").pop();
          imageart = sha1(nomarticle + process.hrtime()) + "." + extension;
          await fs.move(req.files[0].path, dossierPochettes + imageart);
          if(anciennePochette != "avatar.jpg"){
              await fs.remove(dossierPochettes+anciennePochette);
          }
        }
        let requeteProduit = "UPDATE articles SET nomarticle = ?, description = ?, imageart = ?, categorie = ?, qteinventaire = ?, seuil = ?, prix = ? WHERE id = ?";
        await pool.query(requeteProduit, [nomarticle, description, imageart, categorie, qteinventaire, seuil, prix, ida]);
        reponse.listeProduits={};
        reponse.msg="Produit modifié";
      } catch(err){
          reponse.OK=false;
          reponse.msg = "Probléme pour modifier le Produit!";
      } finally {
          return reponse;
      }
}
