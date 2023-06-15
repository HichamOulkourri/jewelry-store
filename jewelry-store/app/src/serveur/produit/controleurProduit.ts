import { Request } from "express";

import { Mdl_Produit_ajouter , Mdl_Produit_lister, Mdl_Produit_supprimer, Mdl_Produit_modifier } from "./modelProduit";

export const Ctl_Produit_gestionActions = async (req: Request): Promise<object> => {
  let action: string = req.body.action;
  //console.log(action);
  switch (action) {
    case "ajouter":
      return await Mdl_Produit_ajouter (req);
    case "lister":
      return await Mdl_Produit_lister();
    case "supprimer":
      return await Mdl_Produit_supprimer(req);
    case "modifier":
      return await Mdl_Produit_modifier(req);
    default:
      return {};
  }
};
