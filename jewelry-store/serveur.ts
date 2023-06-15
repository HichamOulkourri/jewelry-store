// Importation des modules nécessaires au fichier serveur.ts
import express from "express";
import { NextFunction } from "express";
import { Request } from "express";
import { Response } from "express";
import bodyParser = require("body-parser");
import http from "http";
import path from "path";

import { Ctl_Membre_gestionActions } from "./app/src/serveur/membre/controleurMembre";
import { Ctl_Connexion_gestionActions } from "./app/src/serveur/connexion/controleurConnexion";
import { Ctl_Produit_gestionActions } from "./app/src/serveur/produit/controleurProduit";
import multer = require("multer");

const upload = multer({ dest: "app/src/serveur/uploads/" });
// Création d'un serveur Node dont les requêtes entrantes
// et sortantes sont gérées par express.

const exp = express();
const serveur = http.createServer(exp);
const porte = 8888;
serveur.listen(porte); // Famille des 8080-8888
console.log(`\nServeur démarré sur le port ${porte}`);

// Pour obtenir les ressources statiques css, js, images, ...
// qui partiront avec vos pages web via les balises link, script, <img src=
exp.use(express.static(__dirname + "/app/src"));
// Support json encoded bodies
exp.use(bodyParser.json());
// Support text encoded bodies
exp.use(bodyParser.text());
// Support text encoded bodies
exp.use(express.urlencoded({ extended: true }));

//Traiter les requêtes provenant du client et les réponses à retourner au client
exp.get("/", async (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(__dirname + "/app/src/index.html"));
});

// Partie 1 du projet : membres
// get, post, put (patch), delete
exp.all("/membre", async (req: express.Request, res: express.Response) => {
  let reponse = await Ctl_Membre_gestionActions(req);
  res.send(reponse); 
});

exp.all("/connexion", async (req: express.Request, res: Response) => {
  let reponse = await Ctl_Connexion_gestionActions(req);
  res.send(reponse);
});
// Partie 2 projet : admin

exp.all("/produit", upload.array("imageart[]",5), async (req: Request, res: Response) => {
  let reponse = await Ctl_Produit_gestionActions(req);
  res.header("Content-type", "application/json"); 
  res.header("Charset", "utf8"); // pour les accents
  res.send(JSON.stringify(reponse));  // envoi de la réponse, JSON.stringify pour convertir en chaine de caractères
  console.log(reponse);
});



