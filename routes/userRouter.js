// @ts-nocheck
const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");
router.post("/authorisation", userController.authorisation);
module.exports = router;
