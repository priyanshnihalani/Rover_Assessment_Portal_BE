const {deleteQuestion, createPaperService, updatePaperService, startExam, deactivatePaperService, activatePaperService, getActivePaperService, getAllPapers, deletePaper } = require("../services/paper.service.js");

exports.createPaper = async (req, res) => {
    try {
        const paper = await createPaperService(req.body);
        res.status(201).json({
            message: "Paper created successfully",
            code: paper.code,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getPapers = async (req, res) => {
    try {
        const papers = await getAllPapers()
        res.status(201).json({
            message: "Paper Got Successfully",
            papers
        })
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.deletePaper = async (req, res) => {
    try {
        const { paperId } = req.params;

        const result = await deletePaper(paperId);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

exports.deleteQuestion = async (req, res) => {
    try {
        const {questionId } = req.params;

        const result = await deleteQuestion(questionId);

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

exports.activatePaper = async (req, res) => {
    try {
        await activatePaperService(req.params.id);
        res.json({ message: "Paper activated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updatePaper = async (req, res) => {
    try {
        await updatePaperService({ id: req.params.id, ...req.body })
        res.json({ message: "Paper updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.deactivatePaper = async (req, res) => {
    try {
        await deactivatePaperService(req.params.id);
        res.json({ message: "Paper activated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.startExam = async (req, res) => {
    try {
        const { name, email, code } = req.body;

        if (!name || !code || !email) {
            return res.status(400).json({
                success: false,
                message: "Email and paper code are required",
            });
        }

        const data = await startExam(name, email, code);

        res.json({
            success: true,
            data,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};


exports.getActivePaper = async (req, res) => {
    try {
        const paper = await getActivePaperService();
        if (!paper) {
            return res.status(404).json({ message: "No active paper" });
        }
        res.json(paper);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};