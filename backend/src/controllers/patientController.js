const patientModel = require("../models/patients");
const confirmationMail = require("../services/confirmationMail");

const patientController = {
  getPatients: (_, res, next) => {
    patientModel
      .findAllPatients()
      .then((patients) => res.send(patients))
      .catch((err) => next(err));
  },
  getOnePatient: (req, res, next) => {
    const email = req.userEmail;
    patientModel
      .findPatientByEmail(email)
      .then((result) => res.send(result))
      .catch((err) => next(err));
  },
  getPatientById: (req, res, next) => {
    const { id } = req.params;
    patientModel
      .findPatientById(id)
      .then((result) => {
        if (result.length === 0) {
          res.sendStatus(404);
        } else {
          res.send(result);
        }
      })
      .catch((err) => next(err));
  },
  getPatientsByDoctor: (req, res, next) => {
    const { id } = req.params;
    patientModel
      .findPatientByDoctor(id)
      .then((result) => {
        if (result.length === 0) {
          res.sendStatus(404);
        } else {
          res.send(result);
        }
      })
      .catch((err) => next(err));
  },
  addPatient: (req, res) => {
    const patientData = req.body;
    patientModel
      .createPatient(patientData)
      .then((patient) => {
        if (patient.affectedRows !== 0) {
          confirmationMail(patientData.email, patientData.firstname);
          res.status(201).send({
            message: "Patient ajouté! 👍🏻 ",
            patientId: patient.insertId,
          });
        } else {
          res.status(401).send({ message: "Error adding patient 😞" });
        }
      })
      .catch(() => {
        res.status(500).send({ message: "Il manque des données! 😞 " });
      });
  },

  updatePatient: (req, res) => {
    const patientData = req.body;
    const { email } = req.params;
    patientModel
      .updatePatient(patientData, email)
      .then((patient) => {
        if (patient.affectedRows !== 0) {
          res
            .status(201)
            .send({ message: "Votre profil a été mis à jour! 😀" });
        } else {
          res.status(401).send({ message: "Error update patient 😞" });
        }
      })
      .catch(() => {
        res.status(500).send({ message: "Il manque des données! 😞" });
      });
  },
  findPatientBy: (req, res, next) => {
    const { query, findBy } = req.params;

    patientModel
      .findPatientBy(query, findBy)
      .then((patients) => {
        if (patients.length === 0) {
          res.sendStatus(404);
        } else {
          res.send(patients);
        }
      })
      .catch((err) => next(err));
  },
  updateImage: (req, res) => {
    const email = req.userEmail;
    const imgSrc = `uploads/${req.file.filename}`;
    patientModel
      .updateImage(imgSrc, email)
      .then((result) => {
        if (result.affectedRows !== 0) {
          return res.status(200).send("Image uploaded successfully.");
        }
        return res.status(404).send("Error renaming image.");
      })
      .catch((err) => console.error(err));
  },
  addRessourcesByPatient: (req, res) => {
    const ressources = req.ressource;
    ressources.map((el) => {
      const payload = {
        surgery_id: req.body.surgery_id,
        ressource_id: el.id,
        patient_id: req.body.patient_id,
        checked: 0,
      };
      patientModel.addRessourcesByPatient(payload).then((result) => {
        if (result.affectedRows !== 0) {
          return res.status(201);
        }
        return res.status(404);
      });
      return true;
    });
  },
  addDocumentsByPatient: (req, res) => {
    const documents = req.document;
    documents.map((el) => {
      const payload = {
        checked: 0,
        patient_id: req.body.patient_id,
        document_id: el.id,
      };
      patientModel.addDocumentsByPatient(payload).then((result) => {
        if (result.affectedRows !== 0) {
          return res.status(201);
        }
        return res.status(404);
      });
      return true;
    });
  },
};

module.exports = patientController;
