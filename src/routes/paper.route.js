const { createPaper, activatePaper, updatePaper, deactivatePaper, getActivePaper, startExam, getPapers } = require("../controllers/paper.controller.js");
const express = require("express")
const router = express.Router();

router.post("/create", createPaper);
router.put("/active/:id/", activatePaper);
router.put("/deactive/:id/", deactivatePaper); 
router.get("/active", getActivePaper);  
router.post("/start", startExam);
router.get("/getAllPapers", getPapers)
router.put("/update/:id", updatePaper)

module.exports = router
