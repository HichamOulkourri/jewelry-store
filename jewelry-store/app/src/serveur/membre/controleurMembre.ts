import express from "express";
import { Mdl_Membre_enregistrer} from "./modelMembre";


export const Ctl_Membre_gestionActions = async (req: express.Request): Promise<object> => {
  let action: string = req.body.action;
  switch (action) {
    case "enregistrer":
      // Appel au modèle
      return await Mdl_Membre_enregistrer(req.body);
    default:
      return {};
  }
};
