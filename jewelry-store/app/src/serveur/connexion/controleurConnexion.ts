import express from "express";
import { Mdl_Connexion } from "./modelConnexion";

export const Ctl_Connexion_gestionActions = async ( req: express.Request): Promise<object> => {
  let action: string = req.body.action;
  switch (action) {
    case "connexion":
      return await Mdl_Connexion(req.body);
    default:
      return {};
  }
};
