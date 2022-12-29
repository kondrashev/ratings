// @ts-nocheck
const Router = require("express");
const router = new Router();
const disciplineController = require("../controllers/disciplineController");
router.post("/add", disciplineController.addDiscipline);
router.get("/get", disciplineController.getDisciplines);
router.post("/delete", disciplineController.deleteDisciplines);
router.post("/update", disciplineController.updateDiscipline);
router.post("/upload", disciplineController.uploadInformation);
module.exports = router;
