const express = require("express");

const ressourceRouter = express.Router();

const {
  getRessources,
  getOneRessource,
  addRessource,
  updateRessource,
  deleteRessource,
  deleteRessourceByRelation,
} = require("../controllers/ressourceController");
const authorization = require("../helpers/authentication");

ressourceRouter.get("/", getRessources);
ressourceRouter.get("/:id", getOneRessource);
ressourceRouter.post("/", addRessource);
ressourceRouter.put("/:id", updateRessource);
ressourceRouter.delete("/:id", deleteRessource);
ressourceRouter.delete(
  "/byRelation/:id",
  authorization,
  deleteRessourceByRelation
);

module.exports = ressourceRouter;
