const { submitPaper, submissions } = require("../controllers/submission.controller.js");
const express = require("express")

const router = express.Router();

router.post("/submit", submitPaper);
router.get("/getSubmissions/:id", submissions)
module.exports = router
