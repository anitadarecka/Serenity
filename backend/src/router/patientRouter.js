const express = require("express");
const { getDocuments } = require("../controllers/documentController");

const patientRouter = express.Router();

const {
  getPatients,
  findPatientBy,
  getOnePatient,
  getPatientById,
  getPatientsByDoctor,
  addPatient,
  updatePatient,
  updateImage,
  addRessourcesByPatient,
  addDocumentsByPatient,
} = require("../controllers/patientController");
const { getRessourcesbySurgery } = require("../controllers/surgeryController");

const authorization = require("../helpers/authentication");
const upload = require("../helpers/multer");

patientRouter.get("/", getPatients);
patientRouter.get("/search/:query/by/:findBy", findPatientBy);
patientRouter.get("/email", authorization, getOnePatient);
patientRouter.get("/:id", authorization, getPatientById);
patientRouter.get("/byDoctor/:id", authorization, getPatientsByDoctor);
patientRouter.post("/", addPatient);
patientRouter.put(
  "/imageUpload",
  authorization,
  upload.single("image"),
  updateImage
);
patientRouter.post(
  "/addRessourcesBySurgery/:id",
  getRessourcesbySurgery,
  addRessourcesByPatient
);
patientRouter.post(
  "/addDocumentsByPatient",
  getDocuments,
  addDocumentsByPatient
);
patientRouter.put("/:email", updatePatient);

module.exports = patientRouter;
