const { submitPaperService, submissionsService } = require("../services/submission.service.js");

exports.submitPaper = async (req, res) => {
  try {
    const result = await submitPaperService(req.body);
    res.json({
      success: true,
      message: "Exam submitted successfully",
      result,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.submissions = async (req, res) => {
  try {
    const result = await submissionsService(req.params.id)
    res.json({
      success: true,
      result,
    })
  }
  catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}